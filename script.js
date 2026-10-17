/**
 * StudyBuddy - Complete Modern Student Education & Productivity Dashboard
 * Pure Vanilla JavaScript (ES6+) with LocalStorage, Web Audio API, and Chart.js
 */

// =============================================================================
// 1. DEFAULT DATA & STORAGE SYSTEM
// =============================================================================

const STORAGE_KEYS = {
  SUBJECTS: 'studybuddy_subjects',
  TIMETABLE: 'studybuddy_timetable',
  ASSIGNMENTS: 'studybuddy_assignments',
  NOTES: 'studybuddy_notes',
  GOALS: 'studybuddy_goals',
  POMO_STATS: 'studybuddy_pomo_stats',
  POMO_SETTINGS: 'studybuddy_pomo_settings',
  THEME: 'studybuddy_theme',
  STREAK: 'studybuddy_streak'
};

const MOTIVATIONAL_QUOTES = [
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Small disciplines repeated with consistency every day lead to great achievements.", author: "John C. Maxwell" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" }
];

const DEFAULT_SUBJECTS = [
  {
    id: "sub-1",
    name: "Data Structures & Algorithms",
    code: "CS201",
    color: "#4f46e5",
    teacher: "Dr. Alan Turing",
    targetHours: 6,
    room: "Lab 3B / Virtual"
  },
  {
    id: "sub-2",
    name: "Linear Algebra & Calculus",
    code: "MATH220",
    color: "#059669",
    teacher: "Prof. Katherine Johnson",
    targetHours: 5,
    room: "Science Hall 204"
  },
  {
    id: "sub-3",
    name: "Computer Systems & Architecture",
    code: "CS240",
    color: "#0284c7",
    teacher: "Dr. Grace Hopper",
    targetHours: 4,
    room: "Tech Center 101"
  },
  {
    id: "sub-4",
    name: "Physics: Mechanics & Waves",
    code: "PHYS101",
    color: "#d97706",
    teacher: "Dr. Richard Feynman",
    targetHours: 4,
    room: "Physics Lab A"
  },
  {
    id: "sub-5",
    name: "Technical Writing & Ethics",
    code: "ENG105",
    color: "#8b5cf6",
    teacher: "Prof. Mary Shelley",
    targetHours: 2,
    room: "Humanities 112"
  }
];

const DEFAULT_TIMETABLE = [
  { id: "sch-1", subjectId: "sub-1", day: "Monday", startTime: "09:00", endTime: "10:30", type: "Lecture", room: "Hall B" },
  { id: "sch-2", subjectId: "sub-2", day: "Monday", startTime: "11:00", endTime: "12:30", type: "Tutorial", room: "Hall 204" },
  { id: "sch-3", subjectId: "sub-3", day: "Tuesday", startTime: "10:00", endTime: "12:00", type: "Lab", room: "Tech Lab 1" },
  { id: "sch-4", subjectId: "sub-4", day: "Wednesday", startTime: "09:30", endTime: "11:00", type: "Lecture", room: "Hall A" },
  { id: "sch-5", subjectId: "sub-1", day: "Wednesday", startTime: "14:00", endTime: "16:00", type: "Lab", room: "Lab 3B" },
  { id: "sch-6", subjectId: "sub-5", day: "Thursday", startTime: "13:00", endTime: "14:30", type: "Lecture", room: "Room 112" },
  { id: "sch-7", subjectId: "sub-2", day: "Friday", startTime: "10:00", endTime: "11:30", type: "Revision", room: "Study Hall" },
  { id: "sch-8", subjectId: "sub-4", day: "Friday", startTime: "14:00", endTime: "15:30", type: "Self Study", room: "Library" }
];

const getFutureDate = (daysAhead, hours = 18, minutes = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hours, minutes, 0, 0);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const DEFAULT_ASSIGNMENTS = [
  {
    id: "asg-1",
    title: "Implement AVL Balanced Binary Search Tree in C++",
    subjectId: "sub-1",
    dueDate: getFutureDate(1, 23, 59),
    priority: "High",
    status: "in-progress",
    description: "Write tree rotation methods (LL, RR, LR, RL) and complete test suite with 10,000 randomized insertions."
  },
  {
    id: "asg-2",
    title: "Eigenvalues & Matrix Diagonalization Problem Set",
    subjectId: "sub-2",
    dueDate: getFutureDate(3, 17, 0),
    priority: "High",
    status: "pending",
    description: "Solve problems 4.1 to 4.15 in textbook. Show all intermediate row-reduction steps."
  },
  {
    id: "asg-3",
    title: "MIPS Pipeline Hazard Analysis Report",
    subjectId: "sub-3",
    dueDate: getFutureDate(5, 23, 59),
    priority: "Medium",
    status: "pending",
    description: "Explain data forwarding techniques to resolve RAW hazards in a 5-stage classic pipeline."
  },
  {
    id: "asg-4",
    title: "Simple Harmonic Motion Lab Experiment Calculations",
    subjectId: "sub-4",
    dueDate: getFutureDate(-1, 14, 0),
    priority: "Medium",
    status: "completed",
    description: "Calculated pendulum damping coefficients and plotted phase space diagrams."
  },
  {
    id: "asg-5",
    title: "Draft Research Ethics Case Study on AI Bias",
    subjectId: "sub-5",
    dueDate: getFutureDate(7, 20, 0),
    priority: "Low",
    status: "pending",
    description: "Compose a 1,200-word essay discussing algorithmic fairness in educational admissions."
  }
];

const DEFAULT_NOTES = [
  {
    id: "note-1",
    title: "Big-O Cheatsheet & Common Complexities",
    subjectId: "sub-1",
    category: "Formulas",
    tags: ["algorithms", "midterm", "complexity"],
    content: "• O(1) - Constant: Array index, Hash Map lookup\n• O(log n) - Logarithmic: Binary search, balanced BST operations\n• O(n) - Linear: Single pass search, array traversal\n• O(n log n) - Linearithmic: MergeSort, HeapSort, QuickSort (avg)\n• O(n^2) - Quadratic: Nested loops, BubbleSort, InsertionSort\n• O(2^n) - Exponential: Recursive Fibonacci, exhaustive subsets",
    updatedAt: new Date().toISOString()
  },
  {
    id: "note-2",
    title: "Linear Transformations & Determinant Properties",
    subjectId: "sub-2",
    category: "Exam Prep",
    tags: ["matrix", "determinants", "vectors"],
    content: "1. det(AB) = det(A) * det(B)\n2. det(A^T) = det(A)\n3. If det(A) ≠ 0, then matrix A is invertible and columns are linearly independent.\n4. Cramer's Rule: x_i = det(A_i(b)) / det(A)\n5. Eigenvector equation: (A - λI)v = 0",
    updatedAt: new Date().toISOString()
  },
  {
    id: "note-3",
    title: "CPU Memory Hierarchy & Caching Fundamentals",
    subjectId: "sub-3",
    category: "Lecture Notes",
    tags: ["hardware", "cache", "latency"],
    content: "Registers (1 cycle) < L1 Cache (~4 cycles) < L2 Cache (~10 cycles) < L3 Cache (~40 cycles) < RAM (100+ cycles) < SSD Storage.\n\nKey Principles:\n- Temporal Locality: If an address is accessed, it will likely be accessed again soon.\n- Spatial Locality: If an address is accessed, nearby addresses will likely be accessed soon.",
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_GOALS = [
  { id: "goal-1", title: "Complete 2 Pomodoro focus sessions for CS201", category: "Study", completed: true },
  { id: "goal-2", title: "Review Linear Algebra Chapter 4 practice problems", category: "Revision", completed: false },
  { id: "goal-3", title: "Organize lecture notes & formulas for Physics", category: "Reading", completed: false },
  { id: "goal-4", title: "Take a 20-minute restorative walk without screens", category: "Health", completed: true }
];

const DEFAULT_POMO_SETTINGS = {
  work: 25,
  shortBreak: 5,
  longBreak: 15
};

const DEFAULT_POMO_STATS = {
  todayMinutes: 75,
  todaySessions: 3,
  totalMinutes: 620,
  lastStudyDate: new Date().toISOString().split('T')[0],
  weeklyMinutes: {
    Mon: 60,
    Tue: 80,
    Wed: 50,
    Thu: 110,
    Fri: 90,
    Sat: 75,
    Sun: 0
  },
  subjectMinutes: {
    "Data Structures & Algorithms": 240,
    "Linear Algebra & Calculus": 150,
    "Computer Systems & Architecture": 90,
    "Physics: Mechanics & Waves": 100,
    "General Study": 40
  }
};

const DEFAULT_STREAK = {
  current: 5,
  best: 14,
  lastActiveDate: new Date().toISOString().split('T')[0]
};

// =============================================================================
// 2. MAIN APPLICATION STATE & CONTROLLER
// =============================================================================

class StudyBuddyApp {
  constructor() {
    this.subjects = [];
    this.timetable = [];
    this.assignments = [];
    this.notes = [];
    this.goals = [];
    this.pomoStats = {};
    this.pomoSettings = {};
    this.streak = {};

    // Pomodoro runtime state
    this.pomo = {
      mode: 'work', // 'work', 'shortBreak', 'longBreak'
      timeLeft: 25 * 60,
      totalTime: 25 * 60,
      isRunning: false,
      timerId: null,
      selectedSubject: "General Study",
      completedToday: 0
    };

    // Ambient Audio Synthesizer runtime state
    this.audioContext = null;
    this.ambientSource = null;
    this.ambientGain = null;
    this.currentAmbientSound = null;

    // Charts references
    this.charts = {
      weekly: null,
      subject: null,
      assignment: null
    };

    this.activeView = 'dashboard';
  }

  init() {
    this.loadState();
    this.initTheme();
    this.initNavigation();
    this.initHeader();
    this.initQuickAdd();
    this.initModals();
    this.initSubjects();
    this.initTimetable();
    this.initAssignments();
    this.initNotes();
    this.initPomodoro();
    this.initDailyGoals();
    this.initAnalytics();
    this.initGlobalSearch();
    this.initDataBackup();

    // Render initial UI
    this.renderAll();
    this.updateLiveDate();
    this.renderRandomQuote();

    // Real-time minute tick for live dates
    setInterval(() => this.updateLiveDate(), 60000);
  }

  // ---------------------------------------------------------------------------
  // STATE MANAGEMENT & LOCAL STORAGE
  // ---------------------------------------------------------------------------
  loadState() {
    this.subjects = this.getStored(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
    this.timetable = this.getStored(STORAGE_KEYS.TIMETABLE, DEFAULT_TIMETABLE);
    this.assignments = this.getStored(STORAGE_KEYS.ASSIGNMENTS, DEFAULT_ASSIGNMENTS);
    this.notes = this.getStored(STORAGE_KEYS.NOTES, DEFAULT_NOTES);
    this.goals = this.getStored(STORAGE_KEYS.GOALS, DEFAULT_GOALS);
    this.pomoStats = this.getStored(STORAGE_KEYS.POMO_STATS, DEFAULT_POMO_STATS);
    this.pomoSettings = this.getStored(STORAGE_KEYS.POMO_SETTINGS, DEFAULT_POMO_SETTINGS);
    this.streak = this.getStored(STORAGE_KEYS.STREAK, DEFAULT_STREAK);

    // Check & update streak logic
    this.checkStreakDay();
  }

  getStored(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : JSON.parse(JSON.stringify(fallback));
    } catch (e) {
      console.warn(`Error reading localStorage for key "${key}":`, e);
      return JSON.parse(JSON.stringify(fallback));
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving to localStorage for key "${key}":`, e);
    }
  }

  saveAll() {
    this.save(STORAGE_KEYS.SUBJECTS, this.subjects);
    this.save(STORAGE_KEYS.TIMETABLE, this.timetable);
    this.save(STORAGE_KEYS.ASSIGNMENTS, this.assignments);
    this.save(STORAGE_KEYS.NOTES, this.notes);
    this.save(STORAGE_KEYS.GOALS, this.goals);
    this.save(STORAGE_KEYS.POMO_STATS, this.pomoStats);
    this.save(STORAGE_KEYS.POMO_SETTINGS, this.pomoSettings);
    this.save(STORAGE_KEYS.STREAK, this.streak);
  }

  resetToDefault() {
    if (confirm("Reset StudyBuddy to sample demo data? Your custom items will be replaced.")) {
      localStorage.clear();
      this.loadState();
      this.initTheme();
      this.renderAll();
      this.showToast("App data successfully reset to demo defaults!", "success");
    }
  }

  checkStreakDay() {
    const todayStr = new Date().toISOString().split('T')[0];
    if (this.streak.lastActiveDate !== todayStr) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (this.streak.lastActiveDate === yesterdayStr) {
        // Continuous streak maintained!
      } else {
        // Missed a day or gap; keep current streak if not broken or set baseline
        if (!this.streak.current) this.streak.current = 1;
      }
      this.streak.lastActiveDate = todayStr;
      this.save(STORAGE_KEYS.STREAK, this.streak);
    }
  }

  // ---------------------------------------------------------------------------
  // THEME MANAGEMENT (LIGHT / DARK)
  // ---------------------------------------------------------------------------
  initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    this.setTheme(savedTheme);

    const themeToggle = document.getElementById('themeToggle');
    const headerThemeBtn = document.getElementById('headerThemeBtn');

    if (themeToggle) {
      themeToggle.checked = (savedTheme === 'dark');
      themeToggle.addEventListener('change', (e) => {
        this.setTheme(e.target.checked ? 'dark' : 'light');
      });
    }

    if (headerThemeBtn) {
      headerThemeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        this.setTheme(next);
        if (themeToggle) themeToggle.checked = (next === 'dark');
      });
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);

    const headerThemeBtn = document.getElementById('headerThemeBtn');
    if (headerThemeBtn) {
      headerThemeBtn.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    }

    // Refresh charts if rendered
    if (this.activeView === 'analytics' || this.charts.weekly) {
      this.renderCharts();
    }
  }

  // ---------------------------------------------------------------------------
  // NAVIGATION & TAB SWITCHING
  // ---------------------------------------------------------------------------
  initNavigation() {
    // Handle Sidebar Links
    document.querySelectorAll('.sidebar-nav .nav-item[data-view]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        this.navigateTo(view);
      });
    });

    // Handle Mobile Bottom Nav
    document.querySelectorAll('.mobile-bottom-nav .mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        this.navigateTo(view);
      });
    });

    // Handle Mobile Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    const toggleSidebar = (show) => {
      if (sidebar) sidebar.classList.toggle('open', show);
      if (sidebarBackdrop) sidebarBackdrop.classList.toggle('show', show);
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleSidebar(true));
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', () => toggleSidebar(false));
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', () => toggleSidebar(false));

    // Handle URL Hash navigation
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(`view-${hash}`)) {
        this.navigateTo(hash, false);
      }
    });

    // Initial view from Hash if present
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(`view-${initialHash}`)) {
      this.navigateTo(initialHash, false);
    }
  }

  navigateTo(viewName, updateHash = true) {
    const targetView = document.getElementById(`view-${viewName}`);
    if (!targetView) return;

    this.activeView = viewName;

    // Switch active view container
    document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
    targetView.classList.add('active');

    // Update Sidebar active state
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-view') === viewName);
    });

    // Update Mobile Nav active state
    document.querySelectorAll('.mobile-bottom-nav .mobile-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
    });

    // Update Header title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
      const titles = {
        dashboard: "Dashboard",
        subjects: "Subjects & Syllabus",
        timetable: "Weekly Timetable",
        assignments: "Assignments & Deadlines",
        notes: "Study Notes & Docs",
        pomodoro: "Focus & Pomodoro Station",
        goals: "Daily Goals & Streaks",
        analytics: "Progress Analytics"
      };
      pageTitle.textContent = titles[viewName] || "Dashboard";
    }

    if (updateHash) {
      window.location.hash = viewName;
    }

    // Close mobile drawer if open
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('show');

    // Special view triggers
    if (viewName === 'analytics') {
      setTimeout(() => this.renderCharts(), 50);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------------------------------------------------------------------------
  // HEADER, GREETINGS & QUOTES
  // ---------------------------------------------------------------------------
  initHeader() {
    const headerPomoBtn = document.getElementById('headerPomoBtn');
    if (headerPomoBtn) {
      headerPomoBtn.addEventListener('click', () => this.navigateTo('pomodoro'));
    }
  }

  updateLiveDate() {
    const dateEl = document.getElementById('currentDateDisplay');
    if (!dateEl) return;
    const now = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    dateEl.textContent = `Today is ${now.toLocaleDateString('en-US', options)}`;

    // Update Greeting by hour
    const greetingEl = document.getElementById('motivationalGreeting');
    if (greetingEl) {
      const hour = now.getHours();
      let greeting = "Keep pushing toward your goals today.";
      if (hour < 12) greeting = "Good morning! Ready for a productive study day? ☀️";
      else if (hour < 17) greeting = "Good afternoon! Keep up the great study momentum. 💡";
      else greeting = "Good evening! Finish strong and review your key concepts. 🌙";
      greetingEl.textContent = greeting;
    }
  }

  renderRandomQuote() {
    const quoteEl = document.getElementById('quoteText');
    const authorEl = document.getElementById('quoteAuthor');
    if (!quoteEl || !authorEl) return;
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    quoteEl.textContent = `"${randomQuote.text}"`;
    authorEl.textContent = `— ${randomQuote.author}`;
  }

  // ---------------------------------------------------------------------------
  // QUICK ADD DROPDOWN
  // ---------------------------------------------------------------------------
  initQuickAdd() {
    const btn = document.getElementById('quickAddBtn');
    const menu = document.getElementById('quickAddMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      menu.classList.remove('show');
    });

    menu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.remove('show');
        const action = item.getAttribute('data-action');
        if (action === 'new-assignment') this.openModal('modalAssignment');
        else if (action === 'new-note') this.openModal('modalNote');
        else if (action === 'new-subject') this.openModal('modalSubject');
        else if (action === 'new-schedule') this.openModal('modalSchedule');
        else if (action === 'new-goal') this.openModal('modalGoal');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // MODALS SYSTEM
  // ---------------------------------------------------------------------------
  initModals() {
    // Close modal triggers
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        if (modalId) this.closeModal(modalId);
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });

    // Global keyboard listener (Escape closes modal, Ctrl+K opens search)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show').forEach(m => this.closeModal(m.id));
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openModal('modalSearch');
        const searchInput = document.getElementById('liveSearchModalInput');
        if (searchInput) searchInput.focus();
      }
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('show');
    const firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('show');
  }

  // ---------------------------------------------------------------------------
  // TOAST NOTIFICATIONS
  // ---------------------------------------------------------------------------
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' 
      ? '<i class="fa-solid fa-circle-check" style="color:var(--emerald)"></i>' 
      : type === 'error' 
      ? '<i class="fa-solid fa-circle-exclamation" style="color:var(--rose)"></i>' 
      : '<i class="fa-solid fa-circle-info" style="color:var(--primary)"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ---------------------------------------------------------------------------
  // SUBJECT MANAGEMENT
  // ---------------------------------------------------------------------------
  initSubjects() {
    const form = document.getElementById('formSubject');
    const colorPicker = document.getElementById('subjectColor');
    const colorHex = document.getElementById('subjectColorHex');

    if (colorPicker && colorHex) {
      colorPicker.addEventListener('input', (e) => {
        colorHex.textContent = e.target.value;
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('subjectId').value;
        const name = document.getElementById('subjectName').value.trim();
        const code = document.getElementById('subjectCode').value.trim();
        const color = document.getElementById('subjectColor').value;
        const teacher = document.getElementById('subjectTeacher').value.trim();
        const targetHours = parseInt(document.getElementById('subjectTargetHours').value) || 4;
        const room = document.getElementById('subjectRoom').value.trim();

        if (id) {
          // Edit existing subject
          const index = this.subjects.findIndex(s => s.id === id);
          if (index !== -1) {
            this.subjects[index] = { ...this.subjects[index], name, code, color, teacher, targetHours, room };
            this.showToast(`Updated subject "${name}"`, 'success');
          }
        } else {
          // Create new subject
          const newSub = {
            id: 'sub-' + Date.now(),
            name,
            code: code || name.slice(0, 3).toUpperCase(),
            color: color || '#4f46e5',
            teacher: teacher || 'TBD',
            targetHours,
            room: room || 'Room TBD'
          };
          this.subjects.push(newSub);
          this.showToast(`Subject "${name}" added!`, 'success');
        }

        this.save(STORAGE_KEYS.SUBJECTS, this.subjects);
        form.reset();
        document.getElementById('subjectId').value = '';
        this.closeModal('modalSubject');
        this.renderAll();
      });
    }
  }

  editSubject(id) {
    const sub = this.subjects.find(s => s.id === id);
    if (!sub) return;

    document.getElementById('subjectModalTitle').textContent = "Edit Subject";
    document.getElementById('subjectId').value = sub.id;
    document.getElementById('subjectName').value = sub.name;
    document.getElementById('subjectCode').value = sub.code || '';
    document.getElementById('subjectColor').value = sub.color;
    document.getElementById('subjectColorHex').textContent = sub.color;
    document.getElementById('subjectTeacher').value = sub.teacher || '';
    document.getElementById('subjectTargetHours').value = sub.targetHours || 4;
    document.getElementById('subjectRoom').value = sub.room || '';

    this.openModal('modalSubject');
  }

  deleteSubject(id) {
    const sub = this.subjects.find(s => s.id === id);
    if (!sub) return;
    if (confirm(`Are you sure you want to delete subject "${sub.name}"?`)) {
      this.subjects = this.subjects.filter(s => s.id !== id);
      // Remove or unbind timetable items
      this.timetable = this.timetable.filter(t => t.subjectId !== id);
      this.save(STORAGE_KEYS.SUBJECTS, this.subjects);
      this.save(STORAGE_KEYS.TIMETABLE, this.timetable);
      this.renderAll();
      this.showToast(`Deleted subject "${sub.name}"`, 'info');
    }
  }

  renderSubjects() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;

    if (this.subjects.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1">
          <i class="fa-solid fa-book empty-state-icon"></i>
          <h4 class="empty-state-title">No subjects added yet</h4>
          <p class="empty-state-desc">Add your courses to organize your timetable, assignments, and notes.</p>
          <button class="btn btn-primary" onclick="app.openModal('modalSubject')">Add First Subject</button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.subjects.map(sub => {
      const activeAssignments = this.assignments.filter(a => a.subjectId === sub.id && a.status !== 'completed').length;
      const linkedNotes = this.notes.filter(n => n.subjectId === sub.id).length;

      return `
        <div class="subject-card" style="border-top: 4px solid ${sub.color}">
          <div class="subject-card-top">
            <div class="subject-header-title">
              <span class="subject-color-pill" style="background-color: ${sub.color}"></span>
              <span class="subject-code-tag">${sub.code}</span>
            </div>
            <div class="subject-actions">
              <button class="icon-btn" onclick="app.editSubject('${sub.id}')" title="Edit Subject">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="icon-btn text-danger" onclick="app.deleteSubject('${sub.id}')" title="Delete Subject">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
          <h3 class="subject-name">${this.escapeHTML(sub.name)}</h3>
          <div class="subject-teacher">
            <i class="fa-solid fa-chalkboard-user"></i>
            <span>${this.escapeHTML(sub.teacher || 'Instructor TBD')}</span>
          </div>
          <div class="subject-stats-row">
            <div class="subject-stat-item">
              <span class="subject-stat-val">${sub.targetHours}h/wk</span>
              <span class="subject-stat-lbl">Study Target</span>
            </div>
            <div class="subject-stat-item">
              <span class="subject-stat-val">${activeAssignments} Due</span>
              <span class="subject-stat-lbl">Tasks Pending</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  populateSubjectDropdowns() {
    const dropdownIds = ['assignmentSubject', 'assignmentSubjectFilter', 'scheduleSubject', 'noteSubject', 'notesSubjectFilter', 'pomoSubjectSelect'];
    
    dropdownIds.forEach(id => {
      const select = document.getElementById(id);
      if (!select) return;

      const currentValue = select.value;
      const isFilter = id.includes('Filter');
      let optionsHtml = isFilter ? '<option value="All">All Subjects</option>' : '';

      this.subjects.forEach(sub => {
        optionsHtml += `<option value="${sub.id}">${sub.code} - ${sub.name}</option>`;
      });

      if (id === 'pomoSubjectSelect') {
        optionsHtml = '<option value="General Study">General Focus</option>' + optionsHtml;
      }

      select.innerHTML = optionsHtml;
      if (currentValue && select.querySelector(`option[value="${currentValue}"]`)) {
        select.value = currentValue;
      }
    });
  }

  // ---------------------------------------------------------------------------
  // TIMETABLE & PLANNER
  // ---------------------------------------------------------------------------
  initTimetable() {
    const form = document.getElementById('formSchedule');
    const dayTabs = document.getElementById('timetableDayTabs');
    const printBtn = document.getElementById('printTimetableBtn');

    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    if (dayTabs) {
      dayTabs.querySelectorAll('.day-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          dayTabs.querySelectorAll('.day-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const day = btn.getAttribute('data-day');
          this.renderTimetable(day);
        });
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const subjectId = document.getElementById('scheduleSubject').value;
        const day = document.getElementById('scheduleDay').value;
        const startTime = document.getElementById('scheduleStartTime').value;
        const endTime = document.getElementById('scheduleEndTime').value;
        const type = document.getElementById('scheduleType').value;
        const room = document.getElementById('scheduleRoom').value.trim();

        const newSession = {
          id: 'sch-' + Date.now(),
          subjectId,
          day,
          startTime,
          endTime,
          type,
          room: room || 'Classroom'
        };

        this.timetable.push(newSession);
        this.save(STORAGE_KEYS.TIMETABLE, this.timetable);
        form.reset();
        this.closeModal('modalSchedule');
        this.renderAll();
        this.showToast("Class session added to timetable!", "success");
      });
    }
  }

  deleteSession(id) {
    if (confirm("Remove this session from your timetable?")) {
      this.timetable = this.timetable.filter(s => s.id !== id);
      this.save(STORAGE_KEYS.TIMETABLE, this.timetable);
      this.renderAll();
      this.showToast("Timetable session removed", "info");
    }
  }

  renderTimetable(selectedDay = 'All') {
    const container = document.getElementById('timetableScheduleContainer');
    if (!container) return;

    const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const daysToRender = selectedDay === 'All' ? daysOrder : [selectedDay];

    let html = '';
    let totalSessionsRendered = 0;

    daysToRender.forEach(day => {
      const daySessions = this.timetable
        .filter(s => s.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      if (selectedDay === 'All' && daySessions.length === 0) {
        return; // Don't show empty day cards on "All" view to keep it clean
      }

      totalSessionsRendered += daySessions.length;

      html += `
        <div class="timetable-day-card">
          <div class="day-card-header">
            <h4 class="day-card-title"><i class="fa-solid fa-calendar-day" style="color:var(--primary)"></i> ${day}</h4>
            <span class="badge badge-primary">${daySessions.length} Session${daySessions.length === 1 ? '' : 's'}</span>
          </div>
          <div class="day-card-sessions">
            ${daySessions.length === 0 ? `
              <p style="color:var(--text-muted); font-size: 0.9rem; padding: 1rem 0;">No classes or study sessions scheduled for ${day}. Enjoy your break or study independently!</p>
            ` : daySessions.map(session => {
              const sub = this.subjects.find(s => s.id === session.subjectId) || { name: "Unknown Subject", color: "#4f46e5", code: "GEN" };
              return `
                <div class="session-card" style="border-left-color: ${sub.color}">
                  <div>
                    <div class="session-time-badge">
                      <i class="fa-regular fa-clock"></i> ${session.startTime} - ${session.endTime}
                    </div>
                    <h5 class="session-subject-title">${this.escapeHTML(sub.name)} (${sub.code})</h5>
                    <span class="badge badge-warning" style="margin-top: 4px; font-size: 0.7rem;">${session.type}</span>
                  </div>
                  <div class="session-footer">
                    <span><i class="fa-solid fa-location-dot"></i> ${this.escapeHTML(session.room)}</span>
                    <button class="session-delete-btn" onclick="app.deleteSession('${session.id}')" title="Delete Session">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    if (totalSessionsRendered === 0) {
      html = `
        <div class="empty-state">
          <i class="fa-regular fa-calendar-xmark empty-state-icon"></i>
          <h4 class="empty-state-title">No Timetable Sessions</h4>
          <p class="empty-state-desc">You don't have any classes scheduled yet for ${selectedDay}.</p>
          <button class="btn btn-primary" onclick="app.openModal('modalSchedule')">Add Timetable Session</button>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  // ---------------------------------------------------------------------------
  // ASSIGNMENTS & TASKS TRACKER
  // ---------------------------------------------------------------------------
  initAssignments() {
    const form = document.getElementById('formAssignment');
    const searchInput = document.getElementById('assignmentSearchInput');
    const subjectFilter = document.getElementById('assignmentSubjectFilter');
    const statusFilter = document.getElementById('assignmentStatusFilter');
    const priorityFilter = document.getElementById('assignmentPriorityFilter');

    [searchInput, subjectFilter, statusFilter, priorityFilter].forEach(el => {
      if (el) el.addEventListener('input', () => this.renderAssignments());
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('assignmentId').value;
        const title = document.getElementById('assignmentTitle').value.trim();
        const subjectId = document.getElementById('assignmentSubject').value;
        const dueDate = document.getElementById('assignmentDueDate').value;
        const priority = document.getElementById('assignmentPriority').value;
        const status = document.getElementById('assignmentStatus').value;
        const description = document.getElementById('assignmentDesc').value.trim();

        if (id) {
          const idx = this.assignments.findIndex(a => a.id === id);
          if (idx !== -1) {
            this.assignments[idx] = { ...this.assignments[idx], title, subjectId, dueDate, priority, status, description };
            this.showToast(`Updated assignment "${title}"`, 'success');
          }
        } else {
          const newAssignment = {
            id: 'asg-' + Date.now(),
            title,
            subjectId,
            dueDate,
            priority,
            status: status || 'pending',
            description
          };
          this.assignments.push(newAssignment);
          this.showToast(`Assignment "${title}" added!`, 'success');
        }

        this.save(STORAGE_KEYS.ASSIGNMENTS, this.assignments);
        form.reset();
        document.getElementById('assignmentId').value = '';
        this.closeModal('modalAssignment');
        this.renderAll();
      });
    }
  }

  toggleAssignmentStatus(id) {
    const asg = this.assignments.find(a => a.id === id);
    if (!asg) return;

    asg.status = (asg.status === 'completed') ? 'pending' : 'completed';
    this.save(STORAGE_KEYS.ASSIGNMENTS, this.assignments);
    this.renderAll();
    this.showToast(asg.status === 'completed' ? `Completed "${asg.title}"! 🎉` : `Marked "${asg.title}" as to-do`, 'info');
  }

  editAssignment(id) {
    const asg = this.assignments.find(a => a.id === id);
    if (!asg) return;

    document.getElementById('assignmentModalTitle').textContent = "Edit Assignment";
    document.getElementById('assignmentId').value = asg.id;
    document.getElementById('assignmentTitle').value = asg.title;
    document.getElementById('assignmentSubject').value = asg.subjectId;
    document.getElementById('assignmentDueDate').value = asg.dueDate;
    document.getElementById('assignmentPriority').value = asg.priority;
    document.getElementById('assignmentStatus').value = asg.status;
    document.getElementById('assignmentDesc').value = asg.description || '';

    this.openModal('modalAssignment');
  }

  deleteAssignment(id) {
    const asg = this.assignments.find(a => a.id === id);
    if (!asg) return;

    if (confirm(`Delete assignment "${asg.title}"?`)) {
      this.assignments = this.assignments.filter(a => a.id !== id);
      this.save(STORAGE_KEYS.ASSIGNMENTS, this.assignments);
      this.renderAll();
      this.showToast("Assignment removed", "info");
    }
  }

  renderAssignments() {
    const container = document.getElementById('assignmentsListContainer');
    const resultCountEl = document.getElementById('assignmentResultCount');
    if (!container) return;

    const query = (document.getElementById('assignmentSearchInput')?.value || '').toLowerCase();
    const subjectFilter = document.getElementById('assignmentSubjectFilter')?.value || 'All';
    const statusFilter = document.getElementById('assignmentStatusFilter')?.value || 'All';
    const priorityFilter = document.getElementById('assignmentPriorityFilter')?.value || 'All';

    const filtered = this.assignments.filter(asg => {
      const matchesQuery = asg.title.toLowerCase().includes(query) || (asg.description && asg.description.toLowerCase().includes(query));
      const matchesSubject = (subjectFilter === 'All') || (asg.subjectId === subjectFilter);
      const matchesStatus = (statusFilter === 'All') || (asg.status === statusFilter);
      const matchesPriority = (priorityFilter === 'All') || (asg.priority === priorityFilter);
      return matchesQuery && matchesSubject && matchesStatus && matchesPriority;
    });

    if (resultCountEl) {
      resultCountEl.textContent = `Showing ${filtered.length} of ${this.assignments.length} tasks`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-list-check empty-state-icon"></i>
          <h4 class="empty-state-title">No assignments match your filter</h4>
          <p class="empty-state-desc">Try clearing your filters or create a new assignment.</p>
          <button class="btn btn-primary" onclick="app.openModal('modalAssignment')">Add Assignment</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(asg => {
      const sub = this.subjects.find(s => s.id === asg.subjectId) || { name: 'General', color: '#6366f1', code: 'GEN' };
      const isDone = asg.status === 'completed';
      const formattedDate = this.formatDueDate(asg.dueDate);

      const priorityBadge = asg.priority === 'High' 
        ? '<span class="badge badge-danger">High Priority</span>'
        : asg.priority === 'Medium'
        ? '<span class="badge badge-warning">Medium Priority</span>'
        : '<span class="badge badge-primary">Low Priority</span>';

      return `
        <div class="assignment-card ${isDone ? 'is-done' : ''}">
          <div class="assignment-left">
            <div class="custom-checkbox assignment-checkbox ${isDone ? 'checked' : ''}" onclick="app.toggleAssignmentStatus('${asg.id}')">
              ${isDone ? '<i class="fa-solid fa-check"></i>' : ''}
            </div>
            <div class="assignment-details">
              <div class="assignment-title-row">
                <span class="assignment-title-text ${isDone ? 'is-done' : ''}">${this.escapeHTML(asg.title)}</span>
                ${priorityBadge}
                <span class="badge" style="background-color: ${sub.color}20; color: ${sub.color}; font-weight:700">${sub.code}</span>
              </div>
              ${asg.description ? `<p class="assignment-desc">${this.escapeHTML(asg.description)}</p>` : ''}
              <div class="assignment-meta-row">
                <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                <span><i class="fa-solid fa-tag"></i> ${this.escapeHTML(sub.name)}</span>
              </div>
            </div>
          </div>
          <div class="assignment-actions">
            <button class="icon-btn" onclick="app.editAssignment('${asg.id}')" title="Edit Assignment">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="icon-btn text-danger" onclick="app.deleteAssignment('${asg.id}')" title="Delete Assignment">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  formatDueDate(dateString) {
    if (!dateString) return "No deadline";
    const due = new Date(dateString);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const timeStr = due.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (diffDays < 0) {
      return `<strong style="color:var(--rose)">Overdue (${due.toLocaleDateString()})</strong>`;
    } else if (diffDays === 0) {
      return `<strong style="color:var(--rose)">Due Today at ${timeStr}</strong>`;
    } else if (diffDays === 1) {
      return `<strong style="color:var(--amber)">Due Tomorrow at ${timeStr}</strong>`;
    } else {
      return `Due ${due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${timeStr}`;
    }
  }

  // ---------------------------------------------------------------------------
  // NOTES & DOCUMENTS
  // ---------------------------------------------------------------------------
  initNotes() {
    const form = document.getElementById('formNote');
    const searchInput = document.getElementById('notesSearchInput');
    const subjectFilter = document.getElementById('notesSubjectFilter');
    const categoryFilter = document.getElementById('notesCategoryFilter');

    [searchInput, subjectFilter, categoryFilter].forEach(el => {
      if (el) el.addEventListener('input', () => this.renderNotes());
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('noteId').value;
        const title = document.getElementById('noteTitle').value.trim();
        const subjectId = document.getElementById('noteSubject').value;
        const category = document.getElementById('noteCategory').value;
        const tagsRaw = document.getElementById('noteTags').value;
        const content = document.getElementById('noteContent').value.trim();

        const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

        if (id) {
          const idx = this.notes.findIndex(n => n.id === id);
          if (idx !== -1) {
            this.notes[idx] = { ...this.notes[idx], title, subjectId, category, tags, content, updatedAt: new Date().toISOString() };
            this.showToast(`Updated note "${title}"`, 'success');
          }
        } else {
          const newNote = {
            id: 'note-' + Date.now(),
            title,
            subjectId,
            category,
            tags,
            content,
            updatedAt: new Date().toISOString()
          };
          this.notes.unshift(newNote);
          this.showToast(`Note "${title}" saved!`, 'success');
        }

        this.save(STORAGE_KEYS.NOTES, this.notes);
        form.reset();
        document.getElementById('noteId').value = '';
        this.closeModal('modalNote');
        this.renderAll();
      });
    }
  }

  editNote(id) {
    const note = this.notes.find(n => n.id === id);
    if (!note) return;

    document.getElementById('noteModalTitle').textContent = "Edit Study Note";
    document.getElementById('noteId').value = note.id;
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteSubject').value = note.subjectId;
    document.getElementById('noteCategory').value = note.category;
    document.getElementById('noteTags').value = (note.tags || []).join(', ');
    document.getElementById('noteContent').value = note.content;

    this.openModal('modalNote');
  }

  deleteNote(id) {
    const note = this.notes.find(n => n.id === id);
    if (!note) return;

    if (confirm(`Delete note "${note.title}"?`)) {
      this.notes = this.notes.filter(n => n.id !== id);
      this.save(STORAGE_KEYS.NOTES, this.notes);
      this.renderAll();
      this.showToast("Note deleted", "info");
    }
  }

  copyNoteContent(id) {
    const note = this.notes.find(n => n.id === id);
    if (!note) return;

    navigator.clipboard.writeText(`${note.title}\n\n${note.content}`).then(() => {
      this.showToast("Note copied to clipboard!", "success");
    }).catch(() => {
      this.showToast("Unable to copy to clipboard", "error");
    });
  }

  renderNotes() {
    const container = document.getElementById('notesContainer');
    if (!container) return;

    const query = (document.getElementById('notesSearchInput')?.value || '').toLowerCase();
    const subjectFilter = document.getElementById('notesSubjectFilter')?.value || 'All';
    const categoryFilter = document.getElementById('notesCategoryFilter')?.value || 'All';

    const filtered = this.notes.filter(note => {
      const matchQuery = note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query) || 
        (note.tags && note.tags.some(t => t.toLowerCase().includes(query)));
      const matchSubject = (subjectFilter === 'All') || (note.subjectId === subjectFilter);
      const matchCategory = (categoryFilter === 'All') || (note.category === categoryFilter);
      return matchQuery && matchSubject && matchCategory;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1">
          <i class="fa-solid fa-note-sticky empty-state-icon"></i>
          <h4 class="empty-state-title">No notes found</h4>
          <p class="empty-state-desc">Capture summaries, formulas, or key concepts for your classes.</p>
          <button class="btn btn-primary" onclick="app.openModal('modalNote')">Create New Note</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(note => {
      const sub = this.subjects.find(s => s.id === note.subjectId) || { name: 'General', color: '#8b5cf6', code: 'GEN' };
      const formattedDate = new Date(note.updatedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      return `
        <div class="note-card" style="border-top: 4px solid ${sub.color}">
          <div class="note-header">
            <div>
              <span class="badge" style="background-color: ${sub.color}20; color: ${sub.color}; font-size: 0.7rem; margin-bottom: 4px;">
                ${sub.code} • ${note.category}
              </span>
              <h4 class="note-title">${this.escapeHTML(note.title)}</h4>
            </div>
            <div class="note-actions">
              <button class="icon-btn" onclick="app.copyNoteContent('${note.id}')" title="Copy Text">
                <i class="fa-regular fa-copy"></i>
              </button>
              <button class="icon-btn" onclick="app.editNote('${note.id}')" title="Edit Note">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="icon-btn text-danger" onclick="app.deleteNote('${note.id}')" title="Delete Note">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
          <div class="note-body">${this.escapeHTML(note.content)}</div>
          ${note.tags && note.tags.length > 0 ? `
            <div class="note-tags-row">
              ${note.tags.map(tag => `<span class="note-tag">#${this.escapeHTML(tag)}</span>`).join('')}
            </div>
          ` : ''}
          <div class="note-footer">
            <span>${this.escapeHTML(sub.name)}</span>
            <span>Updated ${formattedDate}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ---------------------------------------------------------------------------
  // POMODORO TIMER & AMBIENT AUDIO SYNTHESIZER
  // ---------------------------------------------------------------------------
  initPomodoro() {
    // Mode Buttons
    document.querySelectorAll('.pomo-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pomo-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        this.setPomodoroMode(mode);
      });
    });

    // Main Timer Controls
    const toggleBtn = document.getElementById('pomoToggleBtn');
    const resetBtn = document.getElementById('pomoResetBtn');
    const skipBtn = document.getElementById('pomoSkipBtn');
    const subjectSelect = document.getElementById('pomoSubjectSelect');

    if (toggleBtn) toggleBtn.addEventListener('click', () => this.togglePomodoro());
    if (resetBtn) resetBtn.addEventListener('click', () => this.resetPomodoro());
    if (skipBtn) skipBtn.addEventListener('click', () => this.skipPomodoro());

    if (subjectSelect) {
      subjectSelect.addEventListener('change', (e) => {
        this.pomo.selectedSubject = e.target.value;
        const dashSub = document.getElementById('dashTimerSubject');
        if (dashSub) dashSub.textContent = `Studying: ${e.target.options[e.target.selectedIndex].text}`;
      });
    }

    // Dashboard Mini Timer Buttons
    const dashToggleBtn = document.getElementById('dashTimerToggleBtn');
    const dashResetBtn = document.getElementById('dashTimerResetBtn');
    if (dashToggleBtn) dashToggleBtn.addEventListener('click', () => this.togglePomodoro());
    if (dashResetBtn) dashResetBtn.addEventListener('click', () => this.resetPomodoro());

    // Custom Duration Settings Form
    const settingsForm = document.getElementById('pomoSettingsForm');
    if (settingsForm) {
      document.getElementById('customWorkDuration').value = this.pomoSettings.work;
      document.getElementById('customShortDuration').value = this.pomoSettings.shortBreak;
      document.getElementById('customLongDuration').value = this.pomoSettings.longBreak;

      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.pomoSettings.work = parseInt(document.getElementById('customWorkDuration').value) || 25;
        this.pomoSettings.shortBreak = parseInt(document.getElementById('customShortDuration').value) || 5;
        this.pomoSettings.longBreak = parseInt(document.getElementById('customLongDuration').value) || 15;
        this.save(STORAGE_KEYS.POMO_SETTINGS, this.pomoSettings);
        this.setPomodoroMode(this.pomo.mode);
        this.showToast("Pomodoro intervals updated!", "success");
      });
    }

    // Ambient Sound Generator Buttons
    document.querySelectorAll('.ambient-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const soundType = btn.getAttribute('data-sound');
        this.playAmbientSound(soundType);
      });
    });

    const stopAmbientBtn = document.getElementById('stopAmbientBtn');
    if (stopAmbientBtn) stopAmbientBtn.addEventListener('click', () => this.stopAmbientSound());

    const volumeSlider = document.getElementById('ambientVolume');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        if (this.ambientGain) {
          this.ambientGain.gain.setValueAtTime(parseFloat(e.target.value), this.audioContext.currentTime);
        }
      });
    }

    // Set initial mode time
    this.setPomodoroMode('work');
  }

  setPomodoroMode(mode) {
    this.pausePomodoro();
    this.pomo.mode = mode;

    let minutes = this.pomoSettings.work;
    let label = "Focus Time";

    if (mode === 'shortBreak') {
      minutes = this.pomoSettings.shortBreak;
      label = "Short Break";
    } else if (mode === 'longBreak') {
      minutes = this.pomoSettings.longBreak;
      label = "Long Break";
    }

    this.pomo.totalTime = minutes * 60;
    this.pomo.timeLeft = minutes * 60;

    const statusTag = document.getElementById('pomoStatusTag');
    if (statusTag) statusTag.textContent = label;

    const dashBadge = document.getElementById('dashTimerModeBadge');
    if (dashBadge) dashBadge.textContent = label;

    this.updatePomodoroDisplay();
  }

  togglePomodoro() {
    if (this.pomo.isRunning) {
      this.pausePomodoro();
    } else {
      this.startPomodoro();
    }
  }

  startPomodoro() {
    if (this.pomo.isRunning) return;
    this.pomo.isRunning = true;

    // Update toggle icons
    const icon = document.getElementById('pomoToggleIcon');
    if (icon) icon.className = "fa-solid fa-pause";

    const dashBtn = document.getElementById('dashTimerToggleBtn');
    if (dashBtn) dashBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

    this.pomo.timerId = setInterval(() => {
      if (this.pomo.timeLeft > 0) {
        this.pomo.timeLeft--;
        this.updatePomodoroDisplay();
      } else {
        this.onPomodoroComplete();
      }
    }, 1000);

    this.showToast(`Timer started: ${this.pomo.mode === 'work' ? 'Time to focus!' : 'Enjoy your break!'}`, 'info');
  }

  pausePomodoro() {
    if (!this.pomo.isRunning) return;
    this.pomo.isRunning = false;
    clearInterval(this.pomo.timerId);

    const icon = document.getElementById('pomoToggleIcon');
    if (icon) icon.className = "fa-solid fa-play";

    const dashBtn = document.getElementById('dashTimerToggleBtn');
    if (dashBtn) dashBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }

  resetPomodoro() {
    this.pausePomodoro();
    this.pomo.timeLeft = this.pomo.totalTime;
    this.updatePomodoroDisplay();
    this.showToast("Timer reset", "info");
  }

  skipPomodoro() {
    this.pausePomodoro();
    if (this.pomo.mode === 'work') {
      this.setPomodoroMode('shortBreak');
    } else {
      this.setPomodoroMode('work');
    }
    this.showToast("Skipped to next session", "info");
  }

  onPomodoroComplete() {
    this.pausePomodoro();
    this.playChimeSound();

    if (this.pomo.mode === 'work') {
      const minutesSpent = Math.round(this.pomo.totalTime / 60);
      this.logStudySession(minutesSpent);

      this.pomo.completedToday++;
      this.showToast(`🎉 Focus session complete! Logged ${minutesSpent} minutes.`, 'success');

      // Next mode recommendation
      if (this.pomo.completedToday % 4 === 0) {
        this.setPomodoroMode('longBreak');
      } else {
        this.setPomodoroMode('shortBreak');
      }
    } else {
      this.showToast("🔔 Break ended! Ready to focus again?", 'info');
      this.setPomodoroMode('work');
    }

    this.updatePomodoroDisplay();
    this.renderAll();
  }

  logStudySession(minutes) {
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayKey = dayNames[today.getDay()];

    this.pomoStats.todayMinutes = (this.pomoStats.todayMinutes || 0) + minutes;
    this.pomoStats.todaySessions = (this.pomoStats.todaySessions || 0) + 1;
    this.pomoStats.totalMinutes = (this.pomoStats.totalMinutes || 0) + minutes;

    if (!this.pomoStats.weeklyMinutes) this.pomoStats.weeklyMinutes = {};
    this.pomoStats.weeklyMinutes[todayKey] = (this.pomoStats.weeklyMinutes[todayKey] || 0) + minutes;

    const subjectName = this.pomo.selectedSubject || "General Study";
    if (!this.pomoStats.subjectMinutes) this.pomoStats.subjectMinutes = {};
    this.pomoStats.subjectMinutes[subjectName] = (this.pomoStats.subjectMinutes[subjectName] || 0) + minutes;

    // Check streak increment
    this.streak.current = Math.max(this.streak.current || 1, 1);
    this.save(STORAGE_KEYS.POMO_STATS, this.pomoStats);
    this.save(STORAGE_KEYS.STREAK, this.streak);
  }

  updatePomodoroDisplay() {
    const m = Math.floor(this.pomo.timeLeft / 60);
    const s = this.pomo.timeLeft % 60;
    const timeFormatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    // Update main display
    const timerDisplay = document.getElementById('pomoTimerDisplay');
    if (timerDisplay) timerDisplay.textContent = timeFormatted;

    // Update header pill
    const headerPill = document.getElementById('headerPomoDisplay');
    if (headerPill) headerPill.textContent = timeFormatted;

    // Update dashboard mini display
    const dashDisplay = document.getElementById('dashTimerDisplay');
    if (dashDisplay) dashDisplay.textContent = timeFormatted;

    // Update Browser title
    if (this.pomo.isRunning) {
      document.title = `(${timeFormatted}) StudyBuddy - ${this.pomo.mode === 'work' ? 'Focusing' : 'Break'}`;
    } else {
      document.title = "StudyBuddy | Modern Student Education & Productivity Dashboard";
    }

    // Update Circular SVG ring
    const ring = document.getElementById('pomoProgressRing');
    if (ring) {
      const radius = 120;
      const circumference = 2 * Math.PI * radius;
      ring.style.strokeDasharray = `${circumference} ${circumference}`;
      const fraction = (this.pomo.totalTime - this.pomo.timeLeft) / this.pomo.totalTime;
      const offset = circumference - (fraction * circumference);
      ring.style.strokeDashoffset = offset;
    }

    // Update cycle dots
    const dotsContainer = document.getElementById('pomoCycleDots');
    const countEl = document.getElementById('pomoCompletedCount');
    if (dotsContainer) {
      const dotsHtml = [0, 1, 2, 3].map(i => {
        const isFilled = (this.pomo.completedToday % 4) > i || (this.pomo.completedToday > 0 && this.pomo.completedToday % 4 === 0);
        return `<span class="dot ${isFilled ? 'filled' : ''}"></span>`;
      }).join('');
      dotsContainer.innerHTML = dotsHtml;
    }
    if (countEl) countEl.textContent = `${this.pomo.completedToday} / 4`;
  }

  // ---------------------------------------------------------------------------
  // WEB AUDIO API - CHIME & SYNTHESIZED AMBIENT NOISE
  // (Zero external dependencies - 100% offline & reliable)
  // ---------------------------------------------------------------------------
  getAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  playChimeSound() {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.warn("Audio Context playback prevented:", e);
    }
  }

  playAmbientSound(type) {
    try {
      this.stopAmbientSound();

      const ctx = this.getAudioContext();
      const volumeInput = document.getElementById('ambientVolume');
      const volume = volumeInput ? parseFloat(volumeInput.value) : 0.3;

      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(volume, ctx.currentTime);
      this.ambientGain.connect(ctx.destination);

      // Create 5-second buffer of generated white/pink noise for seamless loop
      const bufferSize = ctx.sampleRate * 5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (type === 'rain' || type === 'cafe') {
          // Pink noise filter
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
          b6 = white * 0.115926;
        } else {
          // White noise
          output[i] = white * 0.2;
        }
      }

      const whiteNoiseNode = ctx.createBufferSource();
      whiteNoiseNode.buffer = noiseBuffer;
      whiteNoiseNode.loop = true;

      // Filter modulation for specific atmospheres
      const filter = ctx.createBiquadFilter();

      if (type === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, ctx.currentTime);
      } else if (type === 'waves') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        // Modulate filter for wave swell
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // Wave swell frequency
        lfoGain.gain.setValueAtTime(300, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
      } else if (type === 'cafe') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, ctx.currentTime);
      } else {
        // Pure Focus White Noise
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
      }

      whiteNoiseNode.connect(filter);
      filter.connect(this.ambientGain);

      whiteNoiseNode.start();
      this.ambientSource = whiteNoiseNode;
      this.currentAmbientSound = type;

      // Update UI active buttons
      document.querySelectorAll('.ambient-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-sound') === type);
      });

      const badge = document.getElementById('ambientPlayingBadge');
      if (badge) {
        badge.style.display = 'inline-flex';
        badge.textContent = `Playing: ${type.toUpperCase()}`;
      }

      this.showToast(`Ambience enabled: ${type}`, 'info');
    } catch (e) {
      console.warn("Ambient Audio could not start:", e);
    }
  }

  stopAmbientSound() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
        this.ambientSource.disconnect();
      } catch (e) {}
      this.ambientSource = null;
    }
    this.currentAmbientSound = null;

    document.querySelectorAll('.ambient-btn').forEach(btn => btn.classList.remove('active'));
    const badge = document.getElementById('ambientPlayingBadge');
    if (badge) badge.style.display = 'none';
  }

  // ---------------------------------------------------------------------------
  // DAILY GOALS & HABITS TRACKER
  // ---------------------------------------------------------------------------
  initDailyGoals() {
    const form = document.getElementById('formGoal');
    const clearBtn = document.getElementById('clearCompletedGoalsBtn');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('goalTitle').value.trim();
        const category = document.getElementById('goalCategory').value;

        const newGoal = {
          id: 'goal-' + Date.now(),
          title,
          category,
          completed: false
        };

        this.goals.push(newGoal);
        this.save(STORAGE_KEYS.GOALS, this.goals);
        form.reset();
        this.closeModal('modalGoal');
        this.renderAll();
        this.showToast("Daily goal added!", "success");
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const completedCount = this.goals.filter(g => g.completed).length;
        if (completedCount === 0) {
          this.showToast("No completed goals to clear", "info");
          return;
        }
        this.goals = this.goals.filter(g => !g.completed);
        this.save(STORAGE_KEYS.GOALS, this.goals);
        this.renderAll();
        this.showToast(`Cleared ${completedCount} completed goals`, "info");
      });
    }
  }

  toggleGoal(id) {
    const goal = this.goals.find(g => g.id === id);
    if (!goal) return;

    goal.completed = !goal.completed;
    this.save(STORAGE_KEYS.GOALS, this.goals);
    this.renderAll();

    if (goal.completed) {
      this.showToast(`Completed: "${goal.title}" 🌟`, 'success');
    }
  }

  deleteGoal(id) {
    this.goals = this.goals.filter(g => g.id !== id);
    this.save(STORAGE_KEYS.GOALS, this.goals);
    this.renderAll();
  }

  renderGoals() {
    // Render Goals on Full Goals View
    const fullContainer = document.getElementById('fullGoalsContainer');
    const bigStreakEl = document.getElementById('goalsStreakBig');
    const todayCompletedEl = document.getElementById('goalsTodayCompleted');
    const bestRecordEl = document.getElementById('goalsBestRecord');

    const completedGoals = this.goals.filter(g => g.completed).length;

    if (bigStreakEl) bigStreakEl.textContent = this.streak.current || 1;
    if (todayCompletedEl) todayCompletedEl.textContent = completedGoals;
    if (bestRecordEl) bestRecordEl.textContent = this.streak.best || 14;

    if (fullContainer) {
      if (this.goals.length === 0) {
        fullContainer.innerHTML = `
          <div class="empty-state">
            <i class="fa-solid fa-bullseye empty-state-icon"></i>
            <h4 class="empty-state-title">No Daily Goals Yet</h4>
            <p class="empty-state-desc">Set achievable targets for today to build strong learning momentum.</p>
            <button class="btn btn-primary" onclick="app.openModal('modalGoal')">Add Daily Goal</button>
          </div>
        `;
      } else {
        fullContainer.innerHTML = this.goals.map(g => `
          <div class="goal-item">
            <div class="goal-item-left">
              <div class="custom-checkbox ${g.completed ? 'checked' : ''}" onclick="app.toggleGoal('${g.id}')">
                ${g.completed ? '<i class="fa-solid fa-check"></i>' : ''}
              </div>
              <div>
                <span class="goal-label ${g.completed ? 'completed' : ''}">${this.escapeHTML(g.title)}</span>
                <span class="badge badge-primary" style="font-size:0.65rem; margin-left:6px">${g.category}</span>
              </div>
            </div>
            <button class="icon-btn text-danger" onclick="app.deleteGoal('${g.id}')" title="Delete Goal">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `).join('');
      }
    }

    // Render Goals on Dashboard Widget
    const dashContainer = document.getElementById('dashGoalsList');
    const dashPercent = document.getElementById('dashGoalPercentage');
    const dashBar = document.getElementById('dashGoalProgressBar');

    const total = this.goals.length;
    const pct = total === 0 ? 0 : Math.round((completedGoals / total) * 100);

    if (dashPercent) dashPercent.textContent = `${pct}%`;
    if (dashBar) dashBar.style.width = `${pct}%`;

    if (dashContainer) {
      if (this.goals.length === 0) {
        dashContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted)">No goals set for today.</p>`;
      } else {
        dashContainer.innerHTML = this.goals.slice(0, 4).map(g => `
          <div class="goal-item">
            <div class="goal-item-left">
              <div class="custom-checkbox ${g.completed ? 'checked' : ''}" onclick="app.toggleGoal('${g.id}')">
                ${g.completed ? '<i class="fa-solid fa-check"></i>' : ''}
              </div>
              <span class="goal-label ${g.completed ? 'completed' : ''}">${this.escapeHTML(g.title)}</span>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // ---------------------------------------------------------------------------
  // DASHBOARD AGGREGATE STATS & WIDGETS
  // ---------------------------------------------------------------------------
  renderDashboard() {
    // 1. Sidebar counters
    const navSubCount = document.getElementById('navSubjectCount');
    const navPendingTasks = document.getElementById('navPendingAssignments');
    const sidebarStreakCount = document.getElementById('sidebarStreakCount');

    const pendingAssignments = this.assignments.filter(a => a.status !== 'completed');

    if (navSubCount) navSubCount.textContent = this.subjects.length;
    if (navPendingTasks) navPendingTasks.textContent = pendingAssignments.length;
    if (sidebarStreakCount) sidebarStreakCount.textContent = `${this.streak.current || 1} Days`;

    // 2. Dashboard Stat Cards
    const dashSubjectCount = document.getElementById('dashSubjectCount');
    const dashPendingTasks = document.getElementById('dashPendingTasks');
    const dashDueSoonCount = document.getElementById('dashDueSoonCount');
    const dashTodayStudyTime = document.getElementById('dashTodayStudyTime');
    const dashPomoCount = document.getElementById('dashPomoCount');
    const dashStreakValue = document.getElementById('dashStreakValue');
    const dashBestStreak = document.getElementById('dashBestStreak');

    if (dashSubjectCount) dashSubjectCount.textContent = this.subjects.length;
    if (dashPendingTasks) dashPendingTasks.textContent = pendingAssignments.length;

    // Due in 48 hours calculation
    const now = new Date();
    const twoDaysAhead = new Date();
    twoDaysAhead.setDate(now.getDate() + 2);
    const dueSoon = pendingAssignments.filter(a => {
      if (!a.dueDate) return false;
      const due = new Date(a.dueDate);
      return due >= now && due <= twoDaysAhead;
    }).length;

    if (dashDueSoonCount) dashDueSoonCount.textContent = `${dueSoon} due in next 48h`;

    // Today's Focus Time
    const todayMins = this.pomoStats.todayMinutes || 0;
    const hours = Math.floor(todayMins / 60);
    const mins = todayMins % 60;
    if (dashTodayStudyTime) dashTodayStudyTime.textContent = `${hours}h ${mins}m`;
    if (dashPomoCount) dashPomoCount.textContent = `${this.pomoStats.todaySessions || 0} completed session${(this.pomoStats.todaySessions || 0) === 1 ? '' : 's'}`;

    if (dashStreakValue) dashStreakValue.textContent = `${this.streak.current || 1} Days`;
    if (dashBestStreak) dashBestStreak.textContent = `${this.streak.best || 14} Days`;

    // 3. Today's Schedule on Dashboard
    const dashClassesContainer = document.getElementById('dashTodayClasses');
    if (dashClassesContainer) {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const currentDayName = dayNames[now.getDay()];

      const todaySessions = this.timetable
        .filter(s => s.day === currentDayName)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      if (todaySessions.length === 0) {
        dashClassesContainer.innerHTML = `
          <div style="padding: 1rem 0; color: var(--text-muted); font-size: 0.9rem;">
            <i class="fa-solid fa-mug-hot" style="color:var(--amber); margin-right: 6px;"></i>
            No lectures scheduled for today (${currentDayName}). Great day for independent project work!
          </div>
        `;
      } else {
        dashClassesContainer.innerHTML = todaySessions.map(session => {
          const sub = this.subjects.find(s => s.id === session.subjectId) || { name: 'Course', color: '#4f46e5' };
          return `
            <div class="class-item" style="border-left-color: ${sub.color}">
              <div class="class-time-box">
                <span class="class-time">${session.startTime}</span>
                <span class="class-type-tag">${session.type}</span>
              </div>
              <div class="class-info">
                <span class="class-name">${this.escapeHTML(sub.name)}</span>
                <span class="class-location"><i class="fa-solid fa-location-dot"></i> ${this.escapeHTML(session.room)}</span>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 4. Upcoming Deadlines on Dashboard
    const dashDeadlinesList = document.getElementById('dashDeadlinesList');
    if (dashDeadlinesList) {
      const topDeadlines = [...pendingAssignments]
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 4);

      if (topDeadlines.length === 0) {
        dashDeadlinesList.innerHTML = `
          <div style="padding: 1rem 0; color: var(--text-muted); font-size: 0.9rem;">
            <i class="fa-solid fa-circle-check" style="color:var(--emerald); margin-right: 6px;"></i>
            All caught up! No pending assignments on your list.
          </div>
        `;
      } else {
        dashDeadlinesList.innerHTML = topDeadlines.map(asg => {
          const sub = this.subjects.find(s => s.id === asg.subjectId) || { code: 'GEN', color: '#4f46e5' };
          const formattedDate = this.formatDueDate(asg.dueDate);
          return `
            <div class="dash-task-item">
              <div class="dash-task-left">
                <div class="custom-checkbox" onclick="app.toggleAssignmentStatus('${asg.id}')"></div>
                <div class="dash-task-details">
                  <span class="dash-task-title">${this.escapeHTML(asg.title)}</span>
                  <span class="dash-task-meta">${sub.code} • ${formattedDate}</span>
                </div>
              </div>
              <span class="badge ${asg.priority === 'High' ? 'badge-danger' : 'badge-warning'}">${asg.priority}</span>
            </div>
          `;
        }).join('');
      }
    }

    // 5. Recent Notes on Dashboard
    const dashRecentNotes = document.getElementById('dashRecentNotes');
    if (dashRecentNotes) {
      const recent = this.notes.slice(0, 3);
      if (recent.length === 0) {
        dashRecentNotes.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted)">No study notes created yet.</p>`;
      } else {
        dashRecentNotes.innerHTML = recent.map(note => `
          <div class="dash-note-item" onclick="app.navigateTo('notes')">
            <h5 class="dash-note-title">${this.escapeHTML(note.title)}</h5>
            <p class="dash-note-preview">${this.escapeHTML(note.content)}</p>
          </div>
        `).join('');
      }
    }
  }

  // ---------------------------------------------------------------------------
  // PROGRESS ANALYTICS & CHART.JS INTEGRATION
  // ---------------------------------------------------------------------------
  initAnalytics() {
    // Automatically called upon switching to analytics view
  }

  renderCharts() {
    if (typeof Chart === 'undefined') {
      console.warn("Chart.js is not loaded.");
      return;
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#1f2c40' : '#e2e8f0';

    // 1. Weekly Study Time Bar Chart
    const weeklyCtx = document.getElementById('weeklyStudyChart');
    if (weeklyCtx) {
      if (this.charts.weekly) this.charts.weekly.destroy();

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const weeklyData = days.map(d => (this.pomoStats.weeklyMinutes && this.pomoStats.weeklyMinutes[d]) || 0);

      this.charts.weekly = new Chart(weeklyCtx, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [{
            label: 'Study Minutes',
            data: weeklyData,
            backgroundColor: '#4f46e5',
            borderRadius: 8,
            hoverBackgroundColor: '#6366f1'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.raw} minutes (${Math.round(ctx.raw / 6) / 10}h)`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: textColor }
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor },
              beginAtZero: true
            }
          }
        }
      });
    }

    // 2. Subject Distribution Doughnut Chart
    const subjectCtx = document.getElementById('subjectDistributionChart');
    if (subjectCtx) {
      if (this.charts.subject) this.charts.subject.destroy();

      const labels = Object.keys(this.pomoStats.subjectMinutes || {});
      const values = Object.values(this.pomoStats.subjectMinutes || {});

      const colors = ['#4f46e5', '#059669', '#0284c7', '#d97706', '#8b5cf6', '#ec4899'];

      this.charts.subject = new Chart(subjectCtx, {
        type: 'doughnut',
        data: {
          labels: labels.length > 0 ? labels : ['No recorded study yet'],
          datasets: [{
            data: values.length > 0 ? values : [1],
            backgroundColor: colors.slice(0, Math.max(labels.length, 1)),
            borderWidth: isDark ? 2 : 1,
            borderColor: isDark ? '#151e2e' : '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor, boxWidth: 12, padding: 12 }
            }
          },
          cutout: '70%'
        }
      });
    }

    // 3. Assignment Completion Rate Chart
    const asgCtx = document.getElementById('assignmentStatusChart');
    if (asgCtx) {
      if (this.charts.assignment) this.charts.assignment.destroy();

      const done = this.assignments.filter(a => a.status === 'completed').length;
      const inProg = this.assignments.filter(a => a.status === 'in-progress').length;
      const todo = this.assignments.filter(a => a.status === 'pending').length;

      this.charts.assignment = new Chart(asgCtx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'In Progress', 'To Do'],
          datasets: [{
            data: [done, inProg, todo],
            backgroundColor: ['#10b981', '#f59e0b', '#6366f1'],
            borderWidth: isDark ? 2 : 1,
            borderColor: isDark ? '#151e2e' : '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor, boxWidth: 12, padding: 12 }
            }
          },
          cutout: '70%'
        }
      });
    }

    // 4. Update Summary Numbers
    const totalMinutes = this.pomoStats.totalMinutes || 0;
    const totHours = Math.floor(totalMinutes / 60);
    const totMins = totalMinutes % 60;
    const totalStudyEl = document.getElementById('analyticsTotalStudyTime');
    if (totalStudyEl) totalStudyEl.textContent = `${totHours}h ${totMins}m`;

    const totalAsg = this.assignments.length;
    const completedAsg = this.assignments.filter(a => a.status === 'completed').length;
    const asgPercentEl = document.getElementById('analyticsAssignmentPercent');
    if (asgPercentEl) {
      const pct = totalAsg === 0 ? 0 : Math.round((completedAsg / totalAsg) * 100);
      asgPercentEl.textContent = `${pct}% (${completedAsg}/${totalAsg})`;
    }

    const totalGoals = this.goals.length;
    const completedGoals = this.goals.filter(g => g.completed).length;
    const goalPercentEl = document.getElementById('analyticsGoalPercent');
    if (goalPercentEl) {
      const gPct = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);
      goalPercentEl.textContent = `${gPct}%`;
    }

    const bestStreakEl = document.getElementById('analyticsBestStreak');
    if (bestStreakEl) bestStreakEl.textContent = `${this.streak.best || 14} Days`;
  }

  // ---------------------------------------------------------------------------
  // GLOBAL SEARCH (LIVE MODAL)
  // ---------------------------------------------------------------------------
  initGlobalSearch() {
    const trigger = document.getElementById('globalSearchTrigger');
    const modalInput = document.getElementById('liveSearchModalInput');
    const resultsContainer = document.getElementById('searchResultsContainer');

    if (trigger) {
      trigger.addEventListener('click', () => {
        this.openModal('modalSearch');
        if (modalInput) modalInput.focus();
      });
    }

    if (modalInput && resultsContainer) {
      modalInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
          resultsContainer.innerHTML = `
            <div class="search-empty-state">
              <i class="fa-solid fa-keyboard"></i>
              <p>Start typing to search across your academic workspace...</p>
            </div>
          `;
          return;
        }

        const results = [];

        // Search Subjects
        this.subjects.forEach(s => {
          if (s.name.toLowerCase().includes(query) || s.code.toLowerCase().includes(query)) {
            results.push({ type: 'Subject', title: `${s.code} - ${s.name}`, sub: s.teacher, view: 'subjects' });
          }
        });

        // Search Assignments
        this.assignments.forEach(a => {
          if (a.title.toLowerCase().includes(query) || (a.description && a.description.toLowerCase().includes(query))) {
            results.push({ type: 'Assignment', title: a.title, sub: `Due: ${a.dueDate ? a.dueDate.split('T')[0] : 'N/A'}`, view: 'assignments' });
          }
        });

        // Search Notes
        this.notes.forEach(n => {
          if (n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)) {
            results.push({ type: 'Note', title: n.title, sub: n.category, view: 'notes' });
          }
        });

        // Search Timetable
        this.timetable.forEach(t => {
          const sub = this.subjects.find(s => s.id === t.subjectId);
          if (t.day.toLowerCase().includes(query) || (sub && sub.name.toLowerCase().includes(query))) {
            results.push({ type: 'Timetable', title: `${t.day}: ${sub ? sub.name : 'Class'} (${t.startTime})`, sub: t.room, view: 'timetable' });
          }
        });

        if (results.length === 0) {
          resultsContainer.innerHTML = `
            <div class="search-empty-state">
              <i class="fa-solid fa-magnifying-glass"></i>
              <p>No results found matching "${this.escapeHTML(query)}".</p>
            </div>
          `;
          return;
        }

        resultsContainer.innerHTML = results.map(r => `
          <div class="search-result-item" onclick="app.closeModal('modalSearch'); app.navigateTo('${r.view}')">
            <div class="search-result-info">
              <span class="search-item-type">${r.type}</span>
              <div>
                <strong>${this.escapeHTML(r.title)}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted)">${this.escapeHTML(r.sub || '')}</div>
              </div>
            </div>
            <i class="fa-solid fa-chevron-right" style="color:var(--text-subtle); font-size: 0.8rem"></i>
          </div>
        `).join('');
      });
    }
  }

  // ---------------------------------------------------------------------------
  // BACKUP, EXPORT & IMPORT DATA
  // ---------------------------------------------------------------------------
  initDataBackup() {
    const exportBtn = document.getElementById('exportDataBtn');
    const importInput = document.getElementById('importDataInput');
    const resetDemoBtn = document.getElementById('resetDemoBtn');

    if (resetDemoBtn) {
      resetDemoBtn.addEventListener('click', () => this.resetToDefault());
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const fullBackup = {
          version: '1.0',
          exportedAt: new Date().toISOString(),
          subjects: this.subjects,
          timetable: this.timetable,
          assignments: this.assignments,
          notes: this.notes,
          goals: this.goals,
          pomoStats: this.pomoStats,
          pomoSettings: this.pomoSettings,
          streak: this.streak
        };

        const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `StudyBuddy_Backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast("Backup exported successfully!", "success");
      });
    }

    if (importInput) {
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.subjects) this.subjects = data.subjects;
            if (data.timetable) this.timetable = data.timetable;
            if (data.assignments) this.assignments = data.assignments;
            if (data.notes) this.notes = data.notes;
            if (data.goals) this.goals = data.goals;
            if (data.pomoStats) this.pomoStats = data.pomoStats;
            if (data.pomoSettings) this.pomoSettings = data.pomoSettings;
            if (data.streak) this.streak = data.streak;

            this.saveAll();
            this.renderAll();
            this.showToast("StudyBuddy data imported successfully!", "success");
          } catch (err) {
            this.showToast("Invalid JSON backup file", "error");
          }
        };
        reader.readAsText(file);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // MASTER RENDER
  // ---------------------------------------------------------------------------
  renderAll() {
    this.populateSubjectDropdowns();
    this.renderDashboard();
    this.renderSubjects();
    this.renderTimetable();
    this.renderAssignments();
    this.renderNotes();
    this.renderGoals();
    this.updatePomodoroDisplay();

    if (this.activeView === 'analytics') {
      this.renderCharts();
    }
  }

  // ---------------------------------------------------------------------------
  // UTILITIES
  // ---------------------------------------------------------------------------
  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

// Instantiate and launch app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new StudyBuddyApp();
  window.app.init();
});
