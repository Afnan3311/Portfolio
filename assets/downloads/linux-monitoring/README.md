# Shell Scripting with AWS EC2, Bash & Git

**Project:** Linux System Resource Monitoring & Automated Logging  
**Author:** Mohammed Afnan K A (Red Hat Certified System Administrator - RHCSA)  
**Profile:** [GitHub: Afnan3311](https://github.com/Afnan3311) | [LinkedIn](https://www.linkedin.com/in/mohammed-afnan04/)  
**Target Environments:** AWS EC2 (Ubuntu / Amazon Linux / RHEL 9), On-Premises Linux Servers

---

## 📌 Project Overview

This project provides a production-grade Bash script (`monitoring.sh`) engineered for automated Linux server telemetry, resource utilization monitoring, and preventive maintenance on cloud-hosted AWS EC2 instances.

Designed for unattended execution via daily cron scheduling, the script audits:
- **AWS EC2 Metadata:** Queries IMDSv2 (Instance Metadata Service v2) for Instance ID, Instance Type, Availability Zone, and Public IP.
- **CPU & Process Telemetry:** Evaluates load averages (1/5/15 min), core saturation, percentage utilization, and top resource-consuming processes.
- **Memory & Swap Utilization:** Calculates actual RAM allocation vs free buffers, plus swap consumption, alerting if usage exceeds 85%.
- **Disk & Storage Thresholds:** Scans mounted physical filesystems, raising alerts if root `/` partition utilization breaches 80%.
- **Critical Services Status:** Checks `systemctl` health for `ssh`/`sshd`, `cron`, `systemd-journald`, and network resolvers.
- **Timestamped Audit Logs:** Appends clean, standardized records to `/var/log/system_monitor/system_monitor_YYYY-MM-DD.log`.

---

## 🚀 Quick Start Guide

### 1. Clone or Extract the Archive
```bash
# Ensure script has executable permissions
chmod +x monitoring.sh
```

### 2. Interactive Execution (CLI Report)
Run the script directly to see formatted terminal output:
```bash
./monitoring.sh
```

### 3. Automated Midnight Cron Setup
To schedule automated execution every night at midnight (`00:00`), configure crontab:
```bash
# Open crontab in editor
crontab -e
```

Append the following entry:
```crontab
# Linux System Monitoring — Daily Midnight Snapshot (Mohammed Afnan)
0 0 * * * /usr/local/bin/monitoring.sh --cron
```

Or deploy system-wide:
```bash
sudo cp monitoring.sh /usr/local/bin/monitoring.sh
sudo chmod 755 /usr/local/bin/monitoring.sh
sudo mkdir -p /var/log/system_monitor
sudo chmod 750 /var/log/system_monitor
```

---

## 📂 Project Archive Contents

| File | Description |
|---|---|
| `monitoring.sh` | Main executable Bash monitoring engine |
| `README.md` | Complete architectural documentation and setup instructions |
| `cron_job.example` | Sample cron schedule entry and logrotate profile |
| `system_monitor.sample.log` | Example output from an AWS EC2 Ubuntu production node |

---

## 🛠️ Technologies & Skills Demonstrated

- **Cloud Platform:** AWS EC2, IMDSv2, Security Groups, SSH Key Authentication
- **Operating Systems:** Ubuntu Linux, Red Hat Enterprise Linux (RHEL 9)
- **Scripting & Automation:** Bash, POSIX shell standards, Regex, Awk, Sed
- **System Administration:** systemd, crond, LVM / storage management, procfs
- **Version Control:** Git, GitHub branching, atomic commits

---

&copy; Mohammed Afnan K A — RHCSA Certified System Administrator
