# StudyBuddy 🎓 — Modern Student Education & Productivity Suite

![StudyBuddy Banner](https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80)

**StudyBuddy** is a complete, modern, responsive student education and academic productivity web application built with **HTML5, CSS3, and Vanilla JavaScript**. Designed for high school, college, and university students, it delivers an all-in-one workspace to manage subjects, track weekly lecture timetables, organize assignments and exam deadlines, write structured revision notes, maintain study streaks, stay focused with a Pomodoro timer and ambient sound generator, and visualize academic habits with progress analytics charts.

Everything runs **100% client-side** using browser `LocalStorage` and the `Web Audio API`—requiring zero backends, zero external audio assets, and zero API keys. It is fully compatible with GitHub Pages, Vercel, Netlify, or any static web host.

---

## 🌟 Key Features

### 1. 📊 Central Academic Dashboard
- **Dynamic Greetings & Motivational Quotes**: Context-aware greetings based on the time of day with rotating student quotes.
- **Real-Time Stat Counters**: Active courses, pending tasks, 48-hour due warnings, today's recorded focus time, and current study streak.
- **Today's Class Schedule Snapshot**: Chronologically lists today's classes with room numbers and session tags.
- **Priority Deadlines Widget**: Immediate visibility on upcoming assignments with one-click completion checkboxes.
- **Mini Pomodoro Station**: Start, pause, or reset a focus timer directly from the dashboard.
- **Today's Daily Goals Progress**: Visual progress bar updating in real time as goals are completed.

### 2. 📚 Subject & Syllabus Management
- Add, edit, and delete enrolled subjects with custom color tags, course codes (e.g., `CS201`), instructors, study hours targets, and classroom locations.
- Subject cards display linked pending assignment counts and weekly study goals.
- Dynamically synchronizes subject dropdowns across timetables, assignments, notes, and Pomodoro timers.

### 3. 📅 Weekly Study Timetable & Planner
- Day-by-day and full-week schedule views (Monday through Sunday).
- Organize lectures, lab practicals, tutorials, exam revisions, and self-study blocks.
- One-click **Print / Save as PDF** styling for offline schedules and physical planners.

### 4. ✅ Assignments & Deadlines Tracker
- Add and edit assignments with title, subject tag, due date/time, priority level (High, Medium, Low), and status.
- Real-time search filter and multi-criteria filters (by subject, priority, and status).
- Relative deadline indicators (`Due Today`, `Due Tomorrow`, `Overdue`, or calendar date).
- Interactive checkbox toggle instantly updates dashboard statistics and completion rate charts.

### 5. 📝 Study Notes & Knowledge Base
- Add and organize lecture summaries, formula cheatsheets, and exam prep notes.
- Tagging system with subject filtering and keyword search.
- One-click **Copy to Clipboard** button for notes and code snippets.

### 6. ⏱️ Focus & Pomodoro Station
- Classic Pomodoro interval modes: **Study Focus (25m)**, **Short Break (5m)**, and **Long Break (15m)**.
- Animated circular SVG progress ring and browser tab title timer (`(24:15) StudyBuddy`).
- Subject selection to attribute study hours to specific courses.
- **Synthesized Audio Chime**: Melodic completion alert generated via the browser's native **Web Audio API** (no broken audio files or cross-origin blocks).
- **Built-in Ambient Sound Generator**: Pure mathematical synthesized noise generators for:
  - 🌧️ Gentle Rain (Pink Noise with droplet frequency filter)
  - 💨 Deep Focus White Noise
  - 🌊 Ocean Waves (LFO-modulated sine wave swells)
  - ☕ Cozy Cafe Hum
  - Real-time volume slider control and instant mute toggle.
- Customizable interval durations saved to your settings.

### 7. 🎯 Daily Goals & Study Streak Tracker
- Checklist for daily tasks (e.g., "Complete 2 Pomodoro sessions", "Solve 5 practice problems").
- Real-time percentage progress bar.
- Study streak counter tracking consecutive days of academic activity.

### 8. 📈 Visual Progress Analytics (Chart.js)
- **Weekly Study Minutes**: Interactive bar chart displaying study time across Monday–Sunday.
- **Subject Focus Distribution**: Doughnut chart illustrating study time split among enrolled courses.
- **Assignment Completion Rate**: Visual distribution of completed, in-progress, and to-do assignments.
- Key study efficiency metrics (Total study time, completion ratio, best streak).

### 9. 🔍 Global Instant Search (`Ctrl + K`)
- Search modal querying across all subjects, timetable sessions, assignments, and notes simultaneously.
- One-click navigation directly to the matched item.

### 10. 🌙 Dark / Light Mode & LocalStorage Persistence
- Seamless theme switching with high-contrast, eye-friendly dark mode and soft modern light mode.
- Persistent state saved to `localStorage`.
- **Data Export & Import**: Backup your academic workspace as a clean `.json` file or restore it anytime.
- **Reset to Demo Data**: Reset button to quickly test with pre-populated sample courses, tasks, and notes.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic tags (`<aside>`, `<main>`, `<header>`, `<section>`, `<nav>`, `<form>`).
- **CSS3**: Custom properties (CSS variables), Flexbox, CSS Grid, smooth transitions, glassmorphism, responsive breakpoints, and print stylesheets.
- **JavaScript (ES6+)**: Object-Oriented architecture, asynchronous event handling, and DOM manipulation.
- **Web Audio API**: Client-side audio synthesizer for ambient noise and completion chimes.
- **Chart.js** *(via CDN)*: Interactive data visualization charts for study analytics.
- **Font Awesome 6** *(via CDN)*: Clean iconography.
- **Google Fonts**: *Plus Jakarta Sans* (headings & UI) and *JetBrains Mono* (timers & codes).

---

## 📁 Project Structure

```
Study buddy/
├── index.html        # Semantic HTML structure, tab views, modals, and templates
├── style.css         # Modern design system, theme variables, layout, animations & responsive rules
├── script.js         # Complete application logic, LocalStorage state, Pomodoro, Web Audio & charts
└── README.md         # Comprehensive documentation and deployment guide
```

---

## 🚀 Getting Started

Since StudyBuddy is built with standard web technologies and requires no build step, you can run it immediately on any machine!

### Option 1: Direct File Open
1. Download or clone this repository.
2. Double-click `index.html` to open it in your preferred browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local Development Server (Recommended)
Using Python:
```bash
# Python 3
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Using Node.js (npx serve):
```bash
npx serve .
```

Using VS Code:
- Install the **Live Server** extension.
- Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Free Deployment Guides

### Deploying to GitHub Pages
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of StudyBuddy"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/studybuddy.git
   git push -u origin main
   ```
2. Navigate to your repository on GitHub.
3. Go to **Settings** > **Pages** (under "Code and automation").
4. Under **Branch**, select `main` and root folder `/ (root)`, then click **Save**.
5. Your website will be live at `https://YOUR_USERNAME.github.io/studybuddy/` in a few minutes!

### Deploying to Vercel
1. Install the Vercel CLI (`npm i -g vercel`) or go to [vercel.com](https://vercel.com).
2. Connect your GitHub repository or run the following command inside your project folder:
   ```bash
   vercel
   ```
3. Follow the prompts (accept default settings). Since there is no build configuration required, Vercel will instantly deploy your static site.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + K` / `Cmd + K` | Open Global Instant Search |
| `Escape` | Close any active modal dialog |

---

## 📄 License

This project is open-source and free to use for educational and personal productivity purposes under the [MIT License](LICENSE).
