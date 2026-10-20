#!/usr/bin/env bash
# ==============================================================================
# Linux System Resource Monitoring & Health Audit Script
# Author: Mohammed Afnan K A (Red Hat Certified System Administrator - RHCSA)
# Repository: https://github.com/Afnan3311
# Environment: AWS EC2 / Ubuntu Linux / RHEL
# Target: Daily midnight cron automation (0 0 * * *)
# ==============================================================================

set -o errexit
set -o pipefail
set -o nounset

# ------------------------------------------------------------------------------
# Configuration & Defaults
# ------------------------------------------------------------------------------
SCRIPT_VERSION="1.2.0"
HOSTNAME="$(hostname -f 2>/dev/null || hostname)"
DEFAULT_LOG_DIR="/var/log/system_monitor"
LOG_DIR="${MONITOR_LOG_DIR:-$DEFAULT_LOG_DIR}"
DATE_STAMP="$(date '+%Y-%m-%d')"
TIME_STAMP="$(date '+%Y-%m-%d %H:%M:%S %Z')"
LOG_FILE="${LOG_DIR}/system_monitor_${DATE_STAMP}.log"

# Thresholds for alerting
CPU_WARN_THRESHOLD=80
MEM_WARN_THRESHOLD=85
DISK_WARN_THRESHOLD=80

# Critical services to inspect
SERVICES=("ssh" "cron" "systemd-journald" "systemd-resolved")

# Terminal color tokens (disabled when outputting to file or piped)
if [[ -t 1 ]]; then
    COLOR_RESET="\033[0m"
    COLOR_CYAN="\033[1;36m"
    COLOR_GREEN="\033[1;32m"
    COLOR_YELLOW="\033[1;33m"
    COLOR_RED="\033[1;31m"
    COLOR_BOLD="\033[1m"
else
    COLOR_RESET=""
    COLOR_CYAN=""
    COLOR_GREEN=""
    COLOR_YELLOW=""
    COLOR_RED=""
    COLOR_BOLD=""
fi

# ------------------------------------------------------------------------------
# Helper Functions
# ------------------------------------------------------------------------------
log_msg() {
    local level="$1"
    local message="$2"
    local formatted="[${TIME_STAMP}] [${level}] ${message}"
    echo -e "${formatted}"
    if [[ -d "${LOG_DIR}" && -w "${LOG_DIR}" ]]; then
        echo -e "${formatted}" | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" >> "${LOG_FILE}"
    fi
}

print_header() {
    echo -e "${COLOR_CYAN}================================================================================${COLOR_RESET}"
    echo -e "${COLOR_CYAN}  LINUX SYSTEM MONITORING & TELEMETRY REPORT — AWS EC2 / UBUNTU${COLOR_RESET}"
    echo -e "${COLOR_CYAN}  Timestamp: ${TIME_STAMP}${COLOR_RESET}"
    echo -e "${COLOR_CYAN}  Host: ${HOSTNAME} | Script v${SCRIPT_VERSION}${COLOR_RESET}"
    echo -e "${COLOR_CYAN}================================================================================${COLOR_RESET}"
}

ensure_log_directory() {
    if [[ ! -d "${LOG_DIR}" ]]; then
        if mkdir -p "${LOG_DIR}" 2>/dev/null; then
            chmod 750 "${LOG_DIR}"
            log_msg "INFO" "Created log directory: ${LOG_DIR}"
        else
            # Fallback to /tmp if run without root privileges
            LOG_DIR="/tmp/system_monitor"
            mkdir -p "${LOG_DIR}"
            LOG_FILE="${LOG_DIR}/system_monitor_${DATE_STAMP}.log"
            log_msg "WARN" "Permission denied on /var/log. Using fallback: ${LOG_FILE}"
        fi
    fi
}

# ------------------------------------------------------------------------------
# 1. AWS EC2 Instance Metadata Inspection
# ------------------------------------------------------------------------------
check_aws_metadata() {
    echo -e "\n${COLOR_BOLD}1. CLOUD INFRASTRUCTURE (AWS EC2 METADATA)${COLOR_RESET}"
    echo "------------------------------------------------------------"
    
    # Try fetching AWS EC2 IMDSv2 token (TTL: 60s)
    local token
    token=$(curl -s -m 1 -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 60" 2>/dev/null || true)
    
    if [[ -n "${token}" ]]; then
        local instance_id instance_type az public_ip
        instance_id=$(curl -s -m 1 -H "X-aws-ec2-metadata-token: $token" "http://169.254.169.254/latest/meta-data/instance-id" 2>/dev/null || echo "N/A")
        instance_type=$(curl -s -m 1 -H "X-aws-ec2-metadata-token: $token" "http://169.254.169.254/latest/meta-data/instance-type" 2>/dev/null || echo "N/A")
        az=$(curl -s -m 1 -H "X-aws-ec2-metadata-token: $token" "http://169.254.169.254/latest/meta-data/placement/availability-zone" 2>/dev/null || echo "N/A")
        public_ip=$(curl -s -m 1 -H "X-aws-ec2-metadata-token: $token" "http://169.254.169.254/latest/meta-data/public-ipv4" 2>/dev/null || echo "Private only")
        
        echo -e "  [+] EC2 Instance ID   : ${COLOR_GREEN}${instance_id}${COLOR_RESET}"
        echo -e "  [+] Instance Type     : ${COLOR_GREEN}${instance_type}${COLOR_RESET}"
        echo -e "  [+] Availability Zone : ${COLOR_GREEN}${az}${COLOR_RESET}"
        echo -e "  [+] Public IPv4       : ${COLOR_GREEN}${public_ip}${COLOR_RESET}"
        log_msg "METADATA" "EC2 Instance: ${instance_id} (${instance_type}) in ${az}"
    else
        echo -e "  [*] Running on Non-EC2 / Local Virtual Environment (IMDS unreachable)"
        echo -e "  [*] Kernel Release    : $(uname -r)"
        echo -e "  [*] Architecture      : $(uname -m)"
        log_msg "METADATA" "Node $(hostname): $(uname -r) $(uname -m)"
    fi
}

# ------------------------------------------------------------------------------
# 2. CPU Utilization & Active Processes
# ------------------------------------------------------------------------------
check_cpu_activity() {
    echo -e "\n${COLOR_BOLD}2. CPU & PROCESS ACTIVITY${COLOR_RESET}"
    echo "------------------------------------------------------------"
    
    # Load averages (1, 5, 15 minutes)
    local load_avg
    load_avg=$(uptime | awk -F'load average:' '{ print $2 }' | sed 's/^ //')
    local cpu_cores
    cpu_cores=$(nproc 2>/dev/null || echo "1")
    
    # Calculate CPU usage percentage
    local cpu_idle cpu_usage
    if command -v mpstat &>/dev/null; then
        cpu_idle=$(mpstat 1 1 | awk '/Average:/ {print $NF}')
        cpu_usage=$(awk "BEGIN {print 100 - ${cpu_idle}}")
    elif [[ -f /proc/stat ]]; then
        cpu_usage=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
    else
        cpu_usage="N/A"
    fi

    echo -e "  [+] CPU Cores Available : ${cpu_cores}"
    echo -e "  [+] Load Averages (1/5/15m): ${load_avg}"
    
    if [[ "${cpu_usage}" != "N/A" ]]; then
        local int_cpu
        int_cpu=$(printf "%.0f" "${cpu_usage}" 2>/dev/null || echo "0")
        if (( int_cpu >= CPU_WARN_THRESHOLD )); then
            echo -e "  [!] Current CPU Usage  : ${COLOR_RED}${cpu_usage}% (EXCEEDS ${CPU_WARN_THRESHOLD}% THRESHOLD)${COLOR_RESET}"
            log_msg "WARN" "High CPU usage detected: ${cpu_usage}%"
        else
            echo -e "  [+] Current CPU Usage  : ${COLOR_GREEN}${cpu_usage}%${COLOR_RESET} (Optimal)"
            log_msg "INFO" "CPU Usage: ${cpu_usage}%, Load: ${load_avg}"
        fi
    fi

    echo -e "\n  Top 5 Resource-Consuming Processes (by %CPU):"
    echo "  PID    USER      %CPU  %MEM  COMMAND"
    ps -eo pid,user,%cpu,%mem,comm --sort=-%cpu | head -n 6 | tail -n 5 | awk '{printf "  %-6s %-9s %-5s %-5s %s\n", $1, $2, $3, $4, $5}'
}

# ------------------------------------------------------------------------------
# 3. Memory & Swap Utilization
# ------------------------------------------------------------------------------
check_memory_usage() {
    echo -e "\n${COLOR_BOLD}3. MEMORY & SWAP CONSUMPTION${COLOR_RESET}"
    echo "------------------------------------------------------------"
    
    # Total, used, free memory in MB
    local mem_total mem_used mem_free mem_percent
    mem_total=$(free -m | awk '/Mem:/ {print $2}')
    mem_used=$(free -m | awk '/Mem:/ {print $3}')
    mem_free=$(free -m | awk '/Mem:/ {print $4}')
    mem_percent=$(( mem_used * 100 / (mem_total > 0 ? mem_total : 1) ))

    # Swap
    local swap_total swap_used swap_free
    swap_total=$(free -m | awk '/Swap:/ {print $2}')
    swap_used=$(free -m | awk '/Swap:/ {print $3}')
    swap_free=$(free -m | awk '/Swap:/ {print $4}')

    echo -e "  [+] Total RAM Installed : ${mem_total} MB"
    echo -e "  [+] RAM Used / Free     : ${mem_used} MB / ${mem_free} MB"
    
    if (( mem_percent >= MEM_WARN_THRESHOLD )); then
        echo -e "  [!] RAM Utilization     : ${COLOR_RED}${mem_percent}% (CRITICAL: >= ${MEM_WARN_THRESHOLD}%)${COLOR_RESET}"
        log_msg "WARN" "High Memory utilization: ${mem_percent}% (${mem_used}M/${mem_total}M)"
    else
        echo -e "  [+] RAM Utilization     : ${COLOR_GREEN}${mem_percent}%${COLOR_RESET} (Normal)"
        log_msg "INFO" "Memory Utilization: ${mem_percent}% (${mem_used}M/${mem_total}M)"
    fi

    if (( swap_total > 0 )); then
        local swap_percent=$(( swap_used * 100 / swap_total ))
        echo -e "  [+] Swap Allocation     : ${swap_used} MB used of ${swap_total} MB (${swap_percent}%)"
    else
        echo -e "  [*] Swap Allocation     : None configured (Standard cloud-init profile)"
    fi
}

# ------------------------------------------------------------------------------
# 4. Storage & Disk Partition Thresholds
# ------------------------------------------------------------------------------
check_disk_usage() {
    echo -e "\n${COLOR_BOLD}4. DISK FILESYSTEM & MOUNT UTILIZATION${COLOR_RESET}"
    echo "------------------------------------------------------------"
    
    # Analyze mounted physical / persistent filesystems
    echo "  Filesystem      Size  Used Avail Use% Mounted on"
    df -h -x tmpfs -x devtmpfs -x squashfs | awk 'NR>1 {printf "  %-15s %-5s %-5s %-5s %-4s %s\n", $1, $2, $3, $4, $5, $6}'

    # Check root '/' usage specifically
    local root_pct
    root_pct=$(df / --output=pcent | tail -n 1 | tr -d ' %')
    if (( root_pct >= DISK_WARN_THRESHOLD )); then
        echo -e "\n  ${COLOR_RED}[!] ALERT: Root partition usage is ${root_pct}% (Threshold: ${DISK_WARN_THRESHOLD}%)${COLOR_RESET}"
        log_msg "CRITICAL" "Root filesystem / capacity warning: ${root_pct}% used!"
    else
        echo -e "\n  ${COLOR_GREEN}[+] Root filesystem healthy: ${root_pct}% used (Threshold: ${DISK_WARN_THRESHOLD}%)${COLOR_RESET}"
        log_msg "INFO" "Root filesystem usage: ${root_pct}%"
    fi
}

# ------------------------------------------------------------------------------
# 5. Critical System Services Status
# ------------------------------------------------------------------------------
check_services() {
    echo -e "\n${COLOR_BOLD}5. ESSENTIAL SERVICES HEALTH${COLOR_RESET}"
    echo "------------------------------------------------------------"
    
    for svc in "${SERVICES[@]}"; do
        if systemctl is-active --quiet "${svc}" 2>/dev/null; then
            echo -e "  [+] Service: ${COLOR_GREEN}${svc}${COLOR_RESET} -> ${COLOR_GREEN}RUNNING (active)${COLOR_RESET}"
            log_msg "SERVICE" "${svc} is ACTIVE"
        elif systemctl is-enabled --quiet "${svc}" 2>/dev/null; then
            echo -e "  [!] Service: ${COLOR_YELLOW}${svc}${COLOR_RESET} -> ${COLOR_YELLOW}INACTIVE (enabled)${COLOR_RESET}"
            log_msg "WARN" "${svc} is enabled but INACTIVE"
        else
            # Try service command fallback
            if service "${svc}" status &>/dev/null; then
                echo -e "  [+] Service: ${COLOR_GREEN}${svc}${COLOR_RESET} -> ${COLOR_GREEN}RUNNING (service)${COLOR_RESET}"
                log_msg "SERVICE" "${svc} is ACTIVE"
            else
                echo -e "  [*] Service: ${svc} -> Not installed or stopped"
            fi
        fi
    done
}

# ------------------------------------------------------------------------------
# 6. Execution Summary & Cron Automation Guide
# ------------------------------------------------------------------------------
print_summary() {
    echo -e "\n${COLOR_CYAN}================================================================================${COLOR_RESET}"
    echo -e "${COLOR_GREEN}[SUCCESS] System monitoring audit completed.${COLOR_RESET}"
    echo -e "Log file: ${COLOR_BOLD}${LOG_FILE}${COLOR_RESET}"
    echo -e "Cron configuration: ${COLOR_CYAN}0 0 * * * /usr/local/bin/monitoring.sh >> ${LOG_FILE} 2>&1${COLOR_RESET}"
    echo -e "${COLOR_CYAN}================================================================================${COLOR_RESET}\n"
    log_msg "INFO" "System monitoring audit completed successfully."
}

# ------------------------------------------------------------------------------
# Main Entry Point
# ------------------------------------------------------------------------------
main() {
    case "${1:-run}" in
        --help|-h)
            echo "Usage: $0 [options]"
            echo "Options:"
            echo "  --run, run      Execute full system monitoring report (default)"
            echo "  --cron          Quiet mode optimized for automated crontab execution"
            echo "  --version, -v   Display script version information"
            echo "  --help, -h      Display this help documentation"
            exit 0
            ;;
        --version|-v)
            echo "monitoring.sh v${SCRIPT_VERSION} by Mohammed Afnan K A"
            exit 0
            ;;
        --cron)
            ensure_log_directory
            check_aws_metadata >> "${LOG_FILE}" 2>&1
            check_cpu_activity >> "${LOG_FILE}" 2>&1
            check_memory_usage >> "${LOG_FILE}" 2>&1
            check_disk_usage >> "${LOG_FILE}" 2>&1
            check_services >> "${LOG_FILE}" 2>&1
            log_msg "CRON" "Automated midnight execution finished."
            exit 0
            ;;
        *)
            ensure_log_directory
            print_header
            check_aws_metadata
            check_cpu_activity
            check_memory_usage
            check_disk_usage
            check_services
            print_summary
            ;;
    esac
}

main "$@"
