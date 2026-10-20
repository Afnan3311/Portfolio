/**
 * ============================================================================
 * MOHAMMED AFNAN K A — CINEMATIC DEVOPS ENGINEER PORTFOLIO
 * High-Performance Scroll Engine, Interactive CLI & Client Functionality
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. CONFIGURATION & CONSTANTS
  const CONFIG = {
    name: 'Mohammed Afnan K A',
    email: 'mohdafnan9617@gmail.com',
    github: 'https://github.com/Afnan3311',
    linkedin: 'https://www.linkedin.com/in/mohammed-afnan04/',
    resumePath: 'assets/Afnan_System_Engineer.pdf',
    monitoringZipPath: 'assets/downloads/monitoring.zip',
    monitoringScriptPath: 'assets/downloads/monitoring.sh'
  };

  // 2. DOM ELEMENTS
  const siteHeader = document.getElementById('site-header');
  const heroTrack = document.getElementById('hero-track');
  const heroStage = document.getElementById('hero-stage');
  const charFrame = document.getElementById('char-frame');
  const charImg = document.getElementById('char-img');
  const charGlow = document.getElementById('char-glow');
  const giantWord1 = document.getElementById('giant-word-1');
  const giantWord2 = document.getElementById('giant-word-2');
  const heroFgContent = document.getElementById('hero-fg-content');
  const heroHud = document.getElementById('hero-hud');
  const heroScrollCue = document.getElementById('hero-scroll-cue');

  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-group-card');

  const btnCopyEmail = document.getElementById('btn-copy-email');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const toastContainer = document.getElementById('toast-container');
  const currentYearSpan = document.getElementById('current-year');

  // Terminal elements
  const btnTerminalToggle = document.getElementById('btn-terminal-toggle');
  const terminalOverlay = document.getElementById('terminal-overlay');
  const terminalDrawer = document.getElementById('terminal-drawer');
  const btnCloseTerminal = document.getElementById('btn-close-terminal');
  const termCloseDot = document.getElementById('term-close-dot');
  const termInput = document.getElementById('term-input');
  const termHistory = document.getElementById('term-history');

  // Dynamic Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 3. CINEMATIC SCROLL-LINKED HERO ANIMATION ENGINE (60 FPS)
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isTicking = false;

  function updateHeroScroll() {
    if (prefersReducedMotion || !heroTrack || !heroStage) return;

    const trackRect = heroTrack.getBoundingClientRect();
    const trackHeight = heroTrack.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollDistance = trackHeight - windowHeight;

    // Progress p from 0.00 to 1.00
    let p = -trackRect.top / scrollDistance;
    p = Math.max(0, Math.min(1, p));

    const isMobile = window.innerWidth <= 768;

    // 1. Camera Zoom / Push-in on Character (Single Bust-Sized Hoodie Portrait)
    // Scales up from 1.0 to 1.34 as user scrolls down
    const charScale = 1 + p * (isMobile ? 0.22 : 0.35);
    const charY = -p * (isMobile ? 25 : 45); // Subtle vertical camera drift

    if (charFrame) {
      charFrame.style.transform = `translate3d(0, ${charY}px, 0) scale(${charScale})`;
    }

    // 2. 3D Giant Background Typography Parallax
    // Top line 'ENGINEERING' drifts upward & left
    // Bottom line 'THE INVISIBLE' drifts downward & right
    if (giantWord1 && giantWord2) {
      const xOffset = p * (isMobile ? 35 : 90);
      const yOffset1 = -8 - p * (isMobile ? 8 : 14);
      const yOffset2 = 8 + p * (isMobile ? 8 : 14);
      const textOpacity = 1 - p * 0.35; // Stays clearly visible while character takes depth

      giantWord1.style.transform = `translate3d(-${xOffset}px, ${yOffset1}vh, 0)`;
      giantWord2.style.transform = `translate3d(${xOffset}px, ${yOffset2}vh, 0)`;
      giantWord1.style.opacity = textOpacity.toString();
      giantWord2.style.opacity = textOpacity.toString();
    }

    // 3. Electric-Teal Atmospheric Aura Expansion
    if (charGlow) {
      const glowScale = 1 + p * 0.45;
      const glowOpacity = 0.45 + p * 0.4;
      charGlow.style.transform = `scale(${glowScale})`;
      charGlow.style.opacity = glowOpacity.toString();
    }

    // 4. Scroll Cue Fadeout
    if (heroScrollCue) {
      if (p > 0.04) {
        heroScrollCue.style.opacity = '0';
      } else {
        heroScrollCue.style.opacity = '1';
      }
    }

    // 5. Foreground Content Subtle Parallax
    if (heroFgContent) {
      if (p > 0.70) {
        // Smoothly fade out as user transitions to About section
        const fadeOut = Math.max(0, 1 - (p - 0.70) / 0.25);
        heroFgContent.style.opacity = fadeOut.toString();
        heroFgContent.style.transform = `translate3d(0, ${p * 20}px, 0)`;
      } else {
        heroFgContent.style.opacity = '1';
        heroFgContent.style.transform = `translate3d(0, 0, 0)`;
      }
    }

    // 6. Header Scrolled Blur Trigger
    if (siteHeader) {
      if (window.scrollY > 80) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    isTicking = false;
  }

  function onScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(updateHeroScroll);
      isTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  // Initial calculation
  updateHeroScroll();

  // --------------------------------------------------------------------------
  // 4. ACTIVE NAVIGATION SCROLLSPY
  // --------------------------------------------------------------------------
  const trackedSections = document.querySelectorAll('section[id], .hero-scroll-track');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const navTarget = link.getAttribute('data-nav');
            if (navTarget === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-25% 0px -55% 0px' });

    trackedSections.forEach((sec) => observer.observe(sec));
  }

  // --------------------------------------------------------------------------
  // 5. RESPONSIVE MOBILE NAVIGATION
  // --------------------------------------------------------------------------
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('is-open');
      setMenuOpen(!isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setMenuOpen(false);
        mobileToggle.focus();
      }
    });
  }

  function setMenuOpen(open) {
    if (!mobileToggle || !navMenu) return;
    if (open) {
      navMenu.classList.add('is-open');
      mobileToggle.classList.add('is-active');
      mobileToggle.setAttribute('aria-expanded', 'true');
    } else {
      navMenu.classList.remove('is-open');
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // --------------------------------------------------------------------------
  // 6. TECHNICAL SKILL FILTER TABS
  // --------------------------------------------------------------------------
  if (filterTabs.length > 0 && skillCards.length > 0) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const filterValue = tab.getAttribute('data-filter');

        skillCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  function showToast(message, duration = 3000) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-teal)"><path d="M20 6L9 17l-5-5"/></svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 8. COPY EMAIL TO CLIPBOARD WITH FEEDBACK
  // --------------------------------------------------------------------------
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.email);
        showToast(`Copied ${CONFIG.email} to clipboard!`);
        btnCopyEmail.querySelector('.copy-label').textContent = 'Copied!';
        setTimeout(() => {
          btnCopyEmail.querySelector('.copy-label').textContent = 'Copy';
        }, 2000);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = CONFIG.email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied ${CONFIG.email} to clipboard!`);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. CONTACT FORM VALIDATION & MAILTO CLIENT TRANSMISSION
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.classList.add('visible');
        isValid = false;
      } else {
        nameError.classList.remove('visible');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailError.classList.remove('visible');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.classList.add('visible');
        isValid = false;
      } else {
        messageError.classList.remove('visible');
      }

      if (!isValid) return;

      const subject = encodeURIComponent(
        subjectInput.value.trim() || `DevOps Portfolio Inquiry from ${nameInput.value.trim()}`
      );
      const body = encodeURIComponent(
        `Hello Afnan,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}\n`
      );

      // Launch email client with pre-filled message
      window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Transmitting message to default email client... Thank you!';
        setTimeout(() => {
          formStatus.style.display = 'none';
          contactForm.reset();
        }, 5000);
      }
    });
  }

  // Terminal download helper functions
  function triggerBrowserDownload(url, filename) {
    if (!url) return false;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || url.split('/').pop() || 'download';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (a.parentNode) {
          a.parentNode.removeChild(a);
        }
      }, 300);
      return true;
    } catch (err) {
      console.error('Download error:', err);
      return false;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  }

  function handleDownloadCommand(targetArg) {
    const target = (targetArg || '').trim().toLowerCase();

    if (!target) {
      return `
<span class="term-project-title">DevOps File Download Center</span>
Usage: <span class="cmd-highlight">download &lt;target&gt;</span>

Available download targets:
  <span class="cmd-highlight">download monitoring</span>   Download Linux System Monitoring Project (ZIP archive)
                          (Contains: <span class="term-code">monitoring.sh</span>, <span class="term-code">README.md</span>, cron schedule &amp; sample logs)
  <span class="cmd-highlight">download resume</span>       Download official verified Resume (PDF)
                          (Mohammed Afnan — RHCSA &bull; Aspiring DevOps Engineer)

Direct links:
  - <a href="${CONFIG.monitoringZipPath}" download="monitoring.zip" class="cmd-highlight" style="text-decoration:underline;">Click to download monitoring.zip directly</a>
  - <a href="${CONFIG.resumePath}" download="Afnan_System_Engineer.pdf" class="cmd-highlight" style="text-decoration:underline;">Click to download Afnan_System_Engineer.pdf directly</a>
`;
    }

    if (['monitoring', 'monitoring.zip', 'monitoring.sh', 'project', 'project-1', 'project1', '1', 'shell', 'script', 'bash'].includes(target)) {
      const success = triggerBrowserDownload(CONFIG.monitoringZipPath, 'monitoring.zip');
      if (success) {
        showToast('Initiating download: monitoring.zip');
        return `
<span class="term-success">[SUCCESS] Initiating download of Linux Monitoring Project archive (monitoring.zip)...</span>
File: <span class="term-code">${CONFIG.monitoringZipPath}</span>

Archive Manifest:
  &#9656; <span class="term-code">monitoring.sh</span>             (Production Bash telemetry &amp; health audit script)
  &#9656; <span class="term-code">README.md</span>                 (Architecture documentation, CLI &amp; cron setup)
  &#9656; <span class="term-code">cron_job.example</span>          (Daily midnight crontab syntax &amp; logrotate profile)
  &#9656; <span class="term-code">system_monitor.sample.log</span> (Real AWS EC2 Ubuntu telemetry output log)

Status: Sent download payload to browser.
If download does not begin automatically, <a href="${CONFIG.monitoringZipPath}" download="monitoring.zip" class="cmd-highlight" style="text-decoration:underline;">click here</a>.
`;
      } else {
        return `<span class="term-err">[ERROR] Failed to initiate download of ${CONFIG.monitoringZipPath}.</span>`;
      }
    }

    if (['resume', 'resume.pdf', 'pdf', 'cv'].includes(target)) {
      const success = triggerBrowserDownload(CONFIG.resumePath, 'Afnan_System_Engineer.pdf');
      if (success) {
        showToast('Initiating download: Afnan_System_Engineer.pdf');
        return `
<span class="term-success">[SUCCESS] Initiating download of official resume (Afnan_System_Engineer.pdf)...</span>
File: <span class="term-code">${CONFIG.resumePath}</span>

Candidate: Mohammed Afnan K A
Credential: Red Hat Certified System Administrator (RHCSA)
Target Role: Junior DevOps Engineer / Linux System Administrator

Status: Sent download payload to browser.
If download does not begin automatically, <a href="${CONFIG.resumePath}" download="Afnan_System_Engineer.pdf" class="cmd-highlight" style="text-decoration:underline;">click here</a>.
`;
      } else {
        return `<span class="term-err">[ERROR] Failed to initiate download of ${CONFIG.resumePath}.</span>`;
      }
    }

    return `
<span class="term-err">[ERROR] Unknown download target: '${escapeHtml(targetArg)}'</span>
Available targets:
  - <span class="cmd-highlight">download monitoring</span> (Linux System Monitoring project ZIP)
  - <span class="cmd-highlight">download resume</span>     (Official verified Resume PDF)
`;
  }

  const TERMINAL_COMMANDS = {
    help: () => `
Available system commands:
  <span class="cmd-highlight">whoami</span>              Display personal identification &amp; professional title
  <span class="cmd-highlight">cat resume</span>          Inspect career summary &amp; credentials
  <span class="cmd-highlight">download &lt;item&gt;</span>     Download project ZIP (<span class="cmd-highlight">monitoring</span>) or resume (<span class="cmd-highlight">resume</span>)
  <span class="cmd-highlight">rhcsa</span>               Display Red Hat Certified System Administrator details
  <span class="cmd-highlight">skills</span>              List verified Linux administration &amp; DevOps skills
  <span class="cmd-highlight">projects</span>            Show hands-on featured projects &amp; architecture
  <span class="cmd-highlight">contact</span>             Print contact email, LinkedIn, and GitHub links
  <span class="cmd-highlight">uname -a</span>            Show system kernel architecture
  <span class="cmd-highlight">clear</span>               Clear terminal screen buffer
  <span class="cmd-highlight">exit</span>                Close terminal shell session
`,
    whoami: () => `
Mohammed Afnan K A
Role: RHCSA Certified | Aspiring DevOps Engineer
Location: Thrissur, Kerala, India
Focus: Linux System Administration, Infrastructure Automation, Cloud Architecture
Status: Open to Junior DevOps Engineer &amp; System Administrator roles
`,
    'cat resume': () => `
================================================================================
MOHAMMED AFNAN K A — RESUME SUMMARY
================================================================================
Primary Credential: Red Hat Certified System Administrator (RHCSA) — Aug 2026
Degree: B.Tech Computer Science &amp; Engineering, Vidya Academy (2022-2026) | CGPA: 7.34
Email: ${CONFIG.email} | GitHub: ${CONFIG.github}

Core Expertise:
- Linux CLI, RHEL 9, Storage (LVM, XFS, EXT4), systemd, SSH, Network Config
- Scripting: Bash, Python, SQL, Java basics
- Cloud &amp; DevOps Learning: AWS EC2, Git workflows, Cron automation, CI/CD

Type <span class="cmd-highlight">download resume</span> or click Resume in navbar to get the full PDF.
`,
    resume: () => `Type <span class="cmd-highlight">cat resume</span> or <span class="cmd-highlight">download resume</span>.`,
    download: (arg) => handleDownloadCommand(arg),
    'download resume': () => handleDownloadCommand('resume'),
    'download monitoring': () => handleDownloadCommand('monitoring'),
    rhcsa: () => `
[RED HAT CERTIFICATION RECORD]
Credential: Red Hat Certified System Administrator (RHCSA)
Issued: Red Hat Inc.
Expiration / Validity: August 2026
Verified Competencies:
  [OK] Operate running systems, boot targets, and systemd units
  [OK] Configure local storage: partitions, LVM physical/volume/logical groups
  [OK] Create and configure file systems: XFS &amp; EXT4, NFS mounts, AutoFS
  [OK] Deploy, configure, and maintain systems (networking, SSH, dnf)
  [OK] Manage users and groups, password aging, sudo privileges
  [OK] Manage security: file permissions, ownership, SUID/SGID, basic firewalls
`,
    skills: () => `
OPERATING SYSTEMS:
  - Red Hat Enterprise Linux (RHEL 9), Linux CLI
LINUX SYSTEM ADMINISTRATION:
  - LVM, Storage Partitions, XFS/EXT4, systemd, Process/Package Management, SSH
NETWORKING:
  - TCP/IP, IPv4, DNS, DHCP, nmcli, Subnetting, NFS, AutoFS
SCRIPTING &amp; PROGRAMMING:
  - Bash automation, Python, SQL, Java fundamentals
DEVOPS ROADMAP (LEARNING):
  - Linux system automation, Cron scheduling, Git workflows, AWS EC2, CI/CD
`,
    projects: () => `
<span class="term-project-title">1. Shell Scripting with AWS EC2, Bash &amp; Git</span>
   - Script: <span class="term-code">monitoring.sh</span>
   - Features: CPU/process activity, memory/swap, disk usage, running services, log output, and daily midnight cron automation.
   - Technologies: AWS EC2, Ubuntu, Bash, Cron, Git, GitHub, SSH.

<span class="term-project-title">2. Linux Administration Lab — RHEL 9</span>
   - Features: Storage management, partitions, LVM, NFS/AutoFS, and service troubleshooting.

<span class="term-project-title">3. EyeQ — AI-Powered Eye Disease Detection System</span>
   - Features: Flutter mobile app, Django REST backend, EfficientNet-B3.

<span class="term-project-title">4. HeartPredict AI — Heart Disease Prediction System</span>
   - Features: Flask, Random Forest, SMOTE, GridSearchCV.

<span class="term-divider">--------------------------------------------------------------------------------</span>
Type <span class="cmd-highlight">download monitoring</span> to download the monitoring.sh project ZIP.
Type <span class="cmd-highlight">download resume</span> to download Afnan's verified Resume (PDF).
`,
    contact: () => `
Email:    ${CONFIG.email}
LinkedIn: ${CONFIG.linkedin}
GitHub:   ${CONFIG.github}
Location: Thrissur, Kerala, India
`,
    'uname -a': () => `Linux rhel-afnan-node01 5.14.0-427.el9.x86_64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`
  };

  function openTerminal() {
    if (!terminalOverlay) return;
    terminalOverlay.classList.add('is-open');
    terminalOverlay.setAttribute('aria-hidden', 'false');
    if (termInput) {
      setTimeout(() => termInput.focus(), 100);
    }
  }

  function closeTerminal() {
    if (!terminalOverlay) return;
    terminalOverlay.classList.remove('is-open');
    terminalOverlay.setAttribute('aria-hidden', 'true');
  }

  if (btnTerminalToggle) {
    btnTerminalToggle.addEventListener('click', openTerminal);
  }

  if (btnCloseTerminal) {
    btnCloseTerminal.addEventListener('click', closeTerminal);
  }

  if (termCloseDot) {
    termCloseDot.addEventListener('click', closeTerminal);
  }

  if (terminalOverlay) {
    terminalOverlay.addEventListener('click', (e) => {
      if (e.target === terminalOverlay) closeTerminal();
    });
  }

  // Keyboard shortcut: Backtick ` or ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      if (terminalOverlay && terminalOverlay.classList.contains('is-open')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && terminalOverlay && terminalOverlay.classList.contains('is-open')) {
      closeTerminal();
    }
  });

  // Terminal input execution
  if (termInput && termHistory) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = termInput.value.trim();
        termInput.value = '';

        if (!rawCmd) return;

        // Command echo
        const echoLine = document.createElement('div');
        echoLine.className = 'term-row';
        echoLine.innerHTML = `<span class="term-ps1"><span class="ps1-user">afnan</span>@<span class="ps1-host">devops-node</span>:<span class="ps1-path">~</span>$</span> <span class="t-cmd">${escapeHtml(rawCmd)}</span>`;
        termHistory.appendChild(echoLine);

        // Command processing
        const cmd = rawCmd.toLowerCase();
        const tokens = rawCmd.trim().split(/\s+/);
        const baseCmd = tokens[0].toLowerCase();
        const argStr = tokens.slice(1).join(' ');

        if (cmd === 'clear') {
          termHistory.innerHTML = '';
          return;
        }

        if (cmd === 'exit') {
          closeTerminal();
          return;
        }

        const outputBlock = document.createElement('div');
        outputBlock.className = 'term-output-block';

        if (baseCmd === 'download') {
          outputBlock.innerHTML = handleDownloadCommand(argStr);
        } else if (cmd === 'cat resume' || (baseCmd === 'cat' && tokens[1] && tokens[1].toLowerCase() === 'resume')) {
          outputBlock.innerHTML = TERMINAL_COMMANDS['cat resume']();
        } else if (baseCmd === 'cat') {
          outputBlock.innerHTML = `<span class="term-err">bash: cat: missing or unsupported file operand. Try <span class="cmd-highlight">cat resume</span>.</span>`;
        } else if (cmd === 'uname -a' || baseCmd === 'uname') {
          outputBlock.innerHTML = TERMINAL_COMMANDS['uname -a']();
        } else if (TERMINAL_COMMANDS[cmd]) {
          outputBlock.innerHTML = TERMINAL_COMMANDS[cmd]();
        } else if (TERMINAL_COMMANDS[baseCmd]) {
          outputBlock.innerHTML = TERMINAL_COMMANDS[baseCmd](argStr);
        } else {
          outputBlock.innerHTML = `<span class="term-err">bash: ${escapeHtml(rawCmd)}: command not found. Type <span class="cmd-highlight">help</span> for a list of commands.</span>`;
        }

        termHistory.appendChild(outputBlock);
        if (terminalDrawer) {
          const drawerBody = terminalDrawer.querySelector('.drawer-body');
          if (drawerBody) {
            drawerBody.scrollTop = drawerBody.scrollHeight;
          }
        }
      }
    });
  }

  console.log('%c Mohammed Afnan K A — DevOps Portfolio Loaded ', 'background: #0B1020; color: #38E0C5; font-weight: bold; padding: 4px 8px; border-radius: 4px; border: 1px solid #38E0C5;');
})();
