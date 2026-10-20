# Mohammed Afnan K A — Cinematic DevOps Engineer Portfolio

A premium, cinematic, responsive personal portfolio website for **Mohammed Afnan K A**, Computer Science graduate, Red Hat Certified System Administrator (RHCSA), and aspiring Linux System Administrator / DevOps Engineer.

Designed with an editorial midnight-navy interface, electric-teal lighting accents, subtle technical grids, and a 60fps scroll-driven cinematic portrait reveal featuring Afnan in a minimalist dark hoodie with ambient rim lighting.

---

## 🎨 Visual Identity & Color System

- **Primary Background**: Midnight Navy `#0B1020`
- **Secondary Background**: Deep Blue `#111B30`
- **Card Surface**: Elevated Slate `#15203B`
- **Accent**: Electric Teal `#38E0C5` (with `#5DF8DF` bright highlights)
- **Primary Text**: Warm Ivory `#F4F1E8`
- **Secondary Text**: Cool Slate `#A5B1C5`
- **Borders**: Subtle blue-grey with low opacity `rgba(165, 177, 197, 0.12)`
- **Typography**: Plus Jakarta Sans (Editorial Titles), Inter (Body copy), JetBrains Mono (DevOps Telemetry)

---

## 🎬 Cinematic Hero Animation Storyboard

1. **Scene 1 — Dark Opening**: Full-screen midnight-navy background with subtle atmospheric lighting, faint technical grid, and `SYSTEMS / AUTOMATION / CLOUD` telemetry label with scroll indicator.
2. **Scene 2 — Full-body Portrait Reveal**: Wide silhouette portrait emerges with controlled scaling and electric-teal rim light.
3. **Scene 3 — Camera Movement & Transition**: Smooth camera push-in seamlessly crossfading into the close-up hoodie reference, avoiding jumps.
4. **Scene 4 — Cinematic Close-up**: Hoodie-wearing portrait in sharp focus with staged editorial typography reveal:
   - `MOHAMMED AFNAN`
   - `ENGINEERING THE INVISIBLE.`
   - `RHCSA CERTIFIED | ASPIRING DEVOPS ENGINEER`
5. **Scene 5 — Final Hero Composition**: Portrait smoothly docks to the side with calls to action (`Explore My Work`, `Let's Connect`, `Resume`) and accessible social links.
6. **Scene 6 — Seamless Continuity**: Fluid transition into the About section without scroll hijacking.
7. **Accessibility**: Full `prefers-reduced-motion` support gracefully provides a clean, elegant layout.

---

## 🛠️ Key Sections & Features

- **About Me**: Verbatim resume profile, systemd service status card, and target roles (Junior DevOps Engineer, Linux System Administrator, Cloud Support Engineer).
- **Technical Skills**: Clear categorizations with interactive filter tabs (Linux Administration, Networking, Scripting & Tools, and DevOps Roadmap learning focus).
- **Featured Projects**:
  1. *Shell Scripting with AWS EC2, Bash & Git*: `monitoring.sh` script, CPU/memory/disk/service telemetry, and midnight cron automation with downloadable ZIP archive.
  2. *Linux Administration Lab — RHEL 9*: Storage management, partitions, LVM, NFS/AutoFS, and service troubleshooting.
  3. *EyeQ — AI-Powered Eye Disease Detection System*: Flutter mobile app, Python Django REST backend, EfficientNet-B3 model.
  4. *HeartPredict AI — Heart Disease Prediction System*: Flask web application, Random Forest classifier, SMOTE balancing, GridSearchCV.
- **Certifications**: Highlighting Red Hat Certified System Administrator (RHCSA, August 2026) alongside Infosys Java, IIT Bombay Python, and Oracle SQL credentials.
- **Education & Internship**: Academic history at Vidya Academy (B.Tech CSE, CGPA 7.34) and AI/ML internship at ICT Academy of Kerala.
- **Interactive DevOps Terminal**: Press backtick (`` ` ``) or click **Terminal** in navbar to launch an interactive bash emulator with commands:
  - `projects`: Lists all 4 projects with precise numbering, script features, and technologies.
  - `download monitoring`: Downloads the real `monitoring.zip` archive containing `monitoring.sh`, `README.md`, cron setup, and sample logs.
  - `download resume`: Downloads Mohammed Afnan's official resume PDF.
  - `whoami`, `cat resume`, `skills`, `rhcsa`, `contact`, `uname -a`, `clear`, `exit`.
- **Contact & Instant Copy**: Direct email (`mohdafnan9617@gmail.com`) with 1-click clipboard copy, LinkedIn, and client-validated message transmission.

---

## 📁 Project Directory Structure

```text
portfolio/
├── index.html                   # Main semantic HTML5 document
├── style.css                    # Design system, CSS variables & scroll animations
├── script.js                    # 60fps scroll engine, terminal emulator & interactions
├── README.md                    # Documentation & deployment guide
│
├── css/
│   └── style.css                # Mirrored stylesheet copy
├── js/
│   └── script.js                # Mirrored script copy
│
├── public/
│   ├── assets/                  # Public asset mirrors
│   └── downloads/
│       ├── monitoring.zip       # Real downloadable monitoring script ZIP archive
│       ├── monitoring.sh        # Standalone Bash monitoring script
│       └── Afnan_System_Engineer.pdf # Official Resume PDF
│
└── assets/
    ├── public/
    │   ├── afnan-fullbody.jpg
    │   ├── afnan-portrait.jpg
    │   └── afnan-hoodie.png
    ├── images/
    │   ├── linux-monitoring.png # Linux monitoring terminal mockup
    │   └── eyeq-project.png     # EyeQ retinal platform mockup
    ├── downloads/
    │   ├── monitoring.zip       # Production-ready ZIP archive
    │   ├── monitoring.sh        # Real executable Bash monitoring script
    │   ├── Afnan_System_Engineer.pdf # Official resume PDF
    │   └── linux-monitoring/    # Unpacked source files (script, README, cron, sample log)
    └── Afnan_System_Engineer.pdf# Verified resume PDF
```

---

## 💻 How to View & Run Locally

### Option 1: Direct File
Double-click `index.html` to open in Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Option 2: Live Server (VS Code)
Right-click `index.html` and choose **"Open with Live Server"**.

### Option 3: Python HTTP Server (if Python is installed)
```bash
python -m http.server 8000
```
Visit `http://localhost:8000`.

---

## 🌐 Deploying to GitHub Pages (Free Hosting)

1. Commit and push the repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete cinematic DevOps engineer portfolio"
   git push origin main
   ```
2. Navigate to your repository on GitHub: `https://github.com/Afnan3311/portfolio`
3. Click **Settings** &rarr; **Pages**.
4. Under **Build and deployment > Source**, select **Deploy from a branch**.
5. Set branch to `main` and directory to `/ (root)`, then click **Save**.
6. Your live website will be accessible at:
   ```text
   https://afnan3311.github.io/portfolio/
   ```

---

## 📄 License & Attribution

Designed and created for **Mohammed Afnan K A**.  
All rights reserved.
