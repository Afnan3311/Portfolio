/**
 * ==========================================================================
 * Mohammed Afnan K.A. - DevOps Portfolio Website
 * Vanilla JavaScript Functionality
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========================================================================
     1. ROADMAP DATA & DYNAMIC RENDERING (Editable in JavaScript)
     ======================================================================== */
  /**
   * You can edit, add, or change any of the roadmap stages below.
   * Status can be: 'Completed', 'In Progress', 'Learning', or 'Planned'
   */
  const roadmapData = [
    {
      step: 1,
      title: 'Linux Fundamentals',
      status: 'Practicing',
      statusType: 'completed', // styling key: completed, in-progress, learning, planned
      description: 'Mastering the Linux CLI, file permissions (chmod, chown), process management (ps, top, systemctl), bash environment, and package managers on Ubuntu.',
      topics: ['Ubuntu', 'Bash Scripting', 'File Hierarchy', 'Permissions & Ownership', 'Process & Systemctl', 'Cron Jobs']
    },
    {
      step: 2,
      title: 'Git and GitHub',
      status: 'Practicing',
      statusType: 'completed',
      description: 'Standard version control practices, repository management, multi-branching strategies, resolving merge conflicts, and writing clean commit histories.',
      topics: ['Git CLI', 'GitHub Repositories', 'Branching & Merging', 'Pull Requests', 'Version Tagging']
    },
    {
      step: 3,
      title: 'Networking and Nginx',
      status: 'In Progress',
      statusType: 'in-progress',
      description: 'Understanding web architectures, OSI/TCP-IP models, DNS lookups, HTTP/HTTPS headers, and deploying/configuring Nginx web servers with custom server blocks.',
      topics: ['Nginx Virtual Hosts', 'Reverse Proxy', 'DNS Records', 'HTTP Status Codes', 'Access & Error Logs']
    },
    {
      step: 4,
      title: 'AWS Fundamentals',
      status: 'Learning',
      statusType: 'learning',
      description: 'Exploring core cloud architecture principles on Amazon Web Services, creating secure EC2 compute instances, S3 object storage, and basic CloudFormation templates.',
      topics: ['AWS IAM & Roles', 'Amazon EC2', 'Amazon S3', 'Security Groups', 'CloudFormation Basics']
    },
    {
      step: 5,
      title: 'Docker and Containers',
      status: 'Learning',
      statusType: 'learning',
      description: 'Containerizing applications, writing Dockerfiles, understanding container networking, volumes, multi-stage builds, and running containerized services.',
      topics: ['Docker Engine', 'Dockerfile Syntax', 'Container Lifecycle', 'Docker Volumes', 'Port Forwarding']
    },
    {
      step: 6,
      title: 'CI/CD Pipelines',
      status: 'Planned',
      statusType: 'planned',
      description: 'Designing automated build, test, and deployment workflows using GitHub Actions to achieve continuous integration and streamlined deployments.',
      topics: ['GitHub Actions', 'YAML Workflows', 'Automated Testing', 'Artifact Management', 'Deployment Automation']
    },
    {
      step: 7,
      title: 'Infrastructure as Code (IaC)',
      status: 'Planned',
      statusType: 'planned',
      description: 'Managing and provisioning cloud infrastructure using declarative configuration files instead of manual console adjustments.',
      topics: ['AWS CloudFormation', 'Terraform Fundamentals', 'State Management', 'Modular Configurations']
    },
    {
      step: 8,
      title: 'Monitoring and Observability',
      status: 'Planned',
      statusType: 'planned',
      description: 'Collecting metrics, monitoring system uptime, parsing application logs, and building dashboards for proactive infrastructure health awareness.',
      topics: ['Linux System Metrics', 'Log Rotation & Analysis', 'Prometheus & Grafana Concepts', 'Health Checks']
    }
  ];

  /**
   * Render Roadmap Items dynamically
   */
  function renderRoadmap() {
    const timelineContainer = document.getElementById('journey-timeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = '';

    roadmapData.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.className = `roadmap-item reveal-item ${item.statusType}`;

      const topicsHtml = item.topics
        .map(topic => `<span class="roadmap-topic-tag">${escapeHtml(topic)}</span>`)
        .join('');

      itemEl.innerHTML = `
        <div class="roadmap-marker" aria-label="Stage ${item.step}">
          <span>0${item.step}</span>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-card-header">
            <h3 class="roadmap-stage-title">${escapeHtml(item.title)}</h3>
            <span class="roadmap-status-pill ${item.statusType}">${escapeHtml(item.status)}</span>
          </div>
          <p class="roadmap-desc">${escapeHtml(item.description)}</p>
          <div class="roadmap-topics">
            ${topicsHtml}
          </div>
        </div>
      `;

      timelineContainer.appendChild(itemEl);
    });
  }

  // Safe string escaper for XSS prevention
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  renderRoadmap();

  /* ========================================================================
     2. DYNAMIC YEAR
     ======================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ========================================================================
     3. STICKY HEADER & NAVBAR SCROLL BEHAVIOR
     ======================================================================== */
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header shadow on scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll to top button visibility
    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial call

  // Scroll to top button click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ========================================================================
     4. MOBILE NAVIGATION TOGGLE & ACCESSIBILITY
     ======================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    function toggleMenu(open) {
      const isExpanded = open !== undefined ? open : menuToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      menuToggle.setAttribute('aria-expanded', String(newState));
      if (newState) {
        navMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent scrolling behind menu
      } else {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      toggleMenu(!isExpanded);
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });
  }

  /* ========================================================================
     5. ACTIVE NAVIGATION LINK (SCROLL SPY)
     ======================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* ========================================================================
     6. PROJECT FILTERING BY CATEGORY
     ======================================================================== */
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (projectFilterBtns.length > 0 && projectCards.length > 0) {
    projectFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Active button style
        projectFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const cardCategories = card.getAttribute('data-category') || '';
          const categoryList = cardCategories.split(' ');

          if (filterValue === 'all' || categoryList.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  /* ========================================================================
     7. SKILL CATEGORY FILTERING
     ======================================================================== */
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');

  if (skillTabBtns.length > 0 && skillCategoryCards.length > 0) {
    skillTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        skillTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterCategory = btn.getAttribute('data-skill-filter');

        skillCategoryCards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (filterCategory === 'all' || cardCat === filterCategory) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  /* ========================================================================
     8. TERMINAL TYPING ANIMATION (Visual Demo with Replay)
     ======================================================================== */
  const terminalContentEl = document.getElementById('terminal-content');
  const replayTermBtn = document.getElementById('btn-replay-terminal');

  const terminalScript = [
    { type: 'command', text: 'whoami' },
    { type: 'output', text: 'Mohammed Afnan', class: 'highlight' },
    { type: 'command', text: 'pwd' },
    { type: 'output', text: '/home/afnan/devops-journey', class: 'dim' },
    { type: 'command', text: 'git status' },
    { type: 'output', text: 'Learning. Building. Improving.', class: 'success' }
  ];

  let typingTimeoutId = null;

  function runTerminalAnimation() {
    if (!terminalContentEl) return;

    // Clear previous timeout and content
    if (typingTimeoutId) clearTimeout(typingTimeoutId);
    terminalContentEl.innerHTML = '';

    if (prefersReducedMotion) {
      // Instant render without typing delays if user prefers reduced motion
      terminalScript.forEach(entry => {
        if (entry.type === 'command') {
          const cmdLine = document.createElement('div');
          cmdLine.className = 'terminal-entry';
          cmdLine.innerHTML = `
            <div class="term-prompt">
              <span>$</span>
              <span class="term-cmd">${escapeHtml(entry.text)}</span>
            </div>
          `;
          terminalContentEl.appendChild(cmdLine);
        } else {
          const outLine = document.createElement('div');
          outLine.className = `term-output ${entry.class || ''}`;
          outLine.textContent = entry.text;
          terminalContentEl.lastElementChild.appendChild(outLine);
        }
      });
      return;
    }

    let scriptIndex = 0;

    function processNextStep() {
      if (scriptIndex >= terminalScript.length) {
        // Animation finished: append blinking cursor prompt at the end
        const activePrompt = document.createElement('div');
        activePrompt.className = 'terminal-entry';
        activePrompt.innerHTML = `
          <div class="term-prompt">
            <span>$</span>
            <span class="term-cursor" aria-hidden="true"></span>
          </div>
        `;
        terminalContentEl.appendChild(activePrompt);
        return;
      }

      const item = terminalScript[scriptIndex];

      if (item.type === 'command') {
        const cmdEntry = document.createElement('div');
        cmdEntry.className = 'terminal-entry';
        const promptDiv = document.createElement('div');
        promptDiv.className = 'term-prompt';
        promptDiv.innerHTML = `<span>$</span> <span class="term-cmd"></span><span class="term-cursor" aria-hidden="true"></span>`;
        cmdEntry.appendChild(promptDiv);
        terminalContentEl.appendChild(cmdEntry);

        const cmdSpan = promptDiv.querySelector('.term-cmd');
        const cursor = promptDiv.querySelector('.term-cursor');
        let charIndex = 0;

        function typeChar() {
          if (charIndex < item.text.length) {
            cmdSpan.textContent += item.text.charAt(charIndex);
            charIndex++;
            typingTimeoutId = setTimeout(typeChar, 45 + Math.random() * 35);
          } else {
            // Remove cursor from this line before going to output
            cursor.remove();
            scriptIndex++;
            typingTimeoutId = setTimeout(processNextStep, 200);
          }
        }

        typeChar();
      } else if (item.type === 'output') {
        const outDiv = document.createElement('div');
        outDiv.className = `term-output ${item.class || ''}`;
        outDiv.textContent = item.text;
        terminalContentEl.lastElementChild.appendChild(outDiv);
        scriptIndex++;
        typingTimeoutId = setTimeout(processNextStep, 350);
      }
    }

    processNextStep();
  }

  // Trigger terminal typing
  runTerminalAnimation();

  if (replayTermBtn) {
    replayTermBtn.addEventListener('click', () => {
      runTerminalAnimation();
    });
  }

  /* ========================================================================
     9. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ======================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // If reduced motion is preferred or observer not supported, reveal all immediately
    revealElements.forEach(el => el.classList.add('revealed'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ========================================================================
     10. COPY EMAIL UTILITY & TOAST NOTIFICATION
     ======================================================================== */
  const copyEmailBtn = document.getElementById('btn-copy-email');
  const toastNotice = document.getElementById('toast-notice');
  let toastTimeoutId = null;

  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.querySelector('.toast-text').textContent = message;
    toastNotice.classList.add('show');

    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const emailToCopy = copyEmailBtn.getAttribute('data-email') || 'your.email@example.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailToCopy).then(() => {
          showToast(`Copied email placeholder to clipboard!`);
        }).catch(() => {
          showToast(`Email: ${emailToCopy}`);
        });
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = emailToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied email placeholder to clipboard!`);
      }
    });
  }

  // Placeholder Link Click Alerts
  const placeholderLinks = document.querySelectorAll('.placeholder-link');
  placeholderLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const info = link.getAttribute('data-info') || 'placeholder link';
      showToast(`Notice: Configure your actual ${info} in index.html`);
    });
  });

});
