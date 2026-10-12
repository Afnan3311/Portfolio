# DevOps Engineer Portfolio - Mohammed Afnan K.A.

> **"Automating workflows. Building reliable systems. Learning continuously."**

A modern, responsive, dark-themed personal portfolio website built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** (no external framework or build dependencies required). Designed specifically for an aspiring DevOps Engineer showcasing Linux administration, version control, cloud computing (AWS), and automation projects.

---

## 🚀 Live Demo & How to Run

### Method 1: Direct File Launch (No Setup Required)
You can view the portfolio immediately in any web browser without installing Node.js, packages, or build tools:
1. Navigate to the project root directory (`portfolio/`).
2. Double-click **`index.html`** or right-click and choose **Open with > Chrome / Edge / Firefox / Safari**.
3. All styling, animations, terminal simulations, and responsive scripts will run directly from the local file system.

### Method 2: Local HTTP Server (Optional)
If you prefer running through a lightweight local web server:
- **Using Python 3:**
  ```bash
  python -m http.server 8000
  ```
  Then visit `http://localhost:8000` in your browser.
- **Using VS Code / IDE:**
  Right-click `index.html` and click **"Open with Live Server"**.

---

## 📁 Project Structure

```text
portfolio/
├── index.html          # Semantic HTML5 markup, SEO meta tags, and structured sections
├── css/
│   └── style.css       # Design tokens (CSS variables), dark obsidian theme, responsive grid
├── js/
│   └── script.js       # Dynamic roadmap rendering, scroll spy, filtering, and terminal typing
├── assets/
│   ├── images/         # Directory for architectural diagrams, icons, and media
│   └── resume.pdf      # (Optional) Drop your personal resume PDF here
└── README.md           # Documentation, customization guide, and file overview
```

---

## ✨ Features & Highlights

1. **Terminal-Inspired Aesthetics & Hero Section:**
   - Dark obsidian background (`#080c14`) with cyan (`#06b6d4`) and blue (`#3b82f6`) accents.
   - Interactive visual terminal card executing `whoami`, `pwd`, and `git status`.
   - Replay animation button and graceful fallback for accessibility (`prefers-reduced-motion`).

2. **Honest Skill Representation:**
   - Skills categorized under:
     - Linux and System Administration
     - Version Control (Git & GitHub)
     - Cloud Infrastructure (AWS)
     - Web and Networking (Nginx, HTTP, DNS)
     - Automation & CI/CD (Python, Docker, GitHub Actions)
   - Labeled transparently as **Practicing**, **Learning**, or **Familiar** without arbitrary skill percentages.
   - Interactive category filtering.

3. **Hands-On Projects Showcase:**
   - Projects labeled with real statuses (`In Progress`, `Practicing`, `Planned`).
   - Detailed breakdown of current implementation and future roadmap items.
   - Interactive filtering by discipline (Linux, Web, Git, Cloud).
   - Clearly labeled GitHub placeholder links.

4. **Dynamic Learning Journey Roadmap:**
   - Configurable directly via JavaScript (`js/script.js` in `roadmapData`).
   - Displays milestones with color-coded status badges and topics.
   - You can add or modify stages without touching HTML structure.

5. **Direct & Authentic Contact Section:**
   - Direct `mailto:` link, GitHub link, LinkedIn link, and resume download.
   - One-click **Copy Email** button with feedback toast alert.
   - Zero misleading contact forms that claim to send messages without a backend.

6. **Accessibility & Performance:**
   - Respects user's `prefers-reduced-motion` settings.
   - Accessible ARIA attributes (`aria-expanded`, `aria-label`, keyboard ESC support).
   - Mobile navigation drawer with smooth transitions.
   - Smooth ScrollSpy highlighting active sections on scroll.

---

## 🛠️ Customization Guide

### 1. Update Personal Links and Details
Open `index.html`:
- **College & Graduation Year:** Search for `[Your College Name]` and `[Your Graduation Year]` under the `#education` section.
- **Email Address:** Search for `your.email@example.com` under `#contact` and replace with your actual email.
- **GitHub & LinkedIn URLs:** Search for `github.com/yourusername` and `linkedin.com/in/yourusername` to replace with your profiles.
- **Resume File:** Place your resume file inside `assets/resume.pdf`.

### 2. Update the Learning Journey Roadmap
Open `js/script.js` and locate the `roadmapData` array at the top of the file:
```javascript
const roadmapData = [
  {
    step: 1,
    title: 'Linux Fundamentals',
    status: 'Practicing',
    statusType: 'completed', // 'completed', 'in-progress', 'learning', or 'planned'
    description: 'Mastering the Linux CLI, file permissions...',
    topics: ['Ubuntu', 'Bash Scripting', 'Process & Systemctl', 'Cron Jobs']
  },
  // Add new stages or edit existing ones here
];
```
Saving the file immediately updates the rendered timeline on the website.

---

## 📄 License & Attribution

Designed and created for **Mohammed Afnan K.A.**  
Feel free to customize, adapt, and deploy on GitHub Pages, AWS S3 / CloudFront, or any static web host.
