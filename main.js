/* ==========================================================================
   AMBATI NARENDRA KUMAR REDDY - PORTFOLIO INTERACTIVE LOGIC (MAIN.JS)
   Typewriter, Filterable Grids, Modal Viewer, Terminal Simulator & Toast
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. TYPEWRITER EFFECT FOR HERO SUBTITLE
     ------------------------------------------------------------------------ */
  const typewriterElement = document.getElementById('typewriterText');
  const roles = [
    'Full-Stack Developer',
    'Oracle Java 17 Certified',
    'AI & Speech App Developer',
    'Python (Flask) Specialist',
    'B.E. CSE Student (8.96 CGPA)'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typewriterElement) {
    typeEffect();
  }


  /* ------------------------------------------------------------------------
     2. STICKY HEADER & ACTIVE SECTION NAV HIGHLIGHT
     ------------------------------------------------------------------------ */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Add blurred backdrop background to header on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Highlight active section in navigation bar
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    // Toggle Back To Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });


  /* ------------------------------------------------------------------------
     3. MOBILE MENU TOGGLE
     ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksMenu = document.getElementById('navLinks');

  if (mobileToggle && navLinksMenu) {
    mobileToggle.addEventListener('click', () => {
      navLinksMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinksMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }


  /* ------------------------------------------------------------------------
     4. SKILLS TAB FILTERING & ANIMATION
     ------------------------------------------------------------------------ */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ------------------------------------------------------------------------
     5. PROJECT CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ------------------------------------------------------------------------
     6. PROJECT DETAILS MODAL POPUP
     ------------------------------------------------------------------------ */
  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const openModalBtns = document.querySelectorAll('.open-modal');

  const projectDetailsMap = {
    speakwell: {
      title: "SpeakWell: AI-Powered English Learning & Speech Evaluation App",
      category: "Flagship AI Project • Jan 2026 – Apr 2026",
      tech: ["HTML5", "CSS3", "JavaScript", "Python (Flask)", "AI Chatbot API", "Speech Recognition", "MySQL"],
      description: `
        <p><strong>SpeakWell</strong> is a full-stack, AI-powered communication and English language learning application built to solve real-world pronunciation and fluency challenges for non-native speakers.</p>
        <br>
        <h4>Key Features & Architecture:</h4>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li><strong>AI Speech Evaluation Engine:</strong> Utilizes speech-to-text algorithms to analyze user spoken audio, giving real-time feedback on pronunciation accuracy, speaking speed (WPM), and fluency.</li>
          <li><strong>Interactive Conversational Chatbot:</strong> Integrated an AI chatbot providing real-time dynamic conversational practice prompts and adaptive dialogue.</li>
          <li><strong>Robust Flask Backend:</strong> Manages secure user session authentication, learning session history, progress tracking, and structured REST API endpoints.</li>
          <li><strong>Gamified Analytics:</strong> Daily progress tracking dashboard with historical session scheduling and accuracy metric charts.</li>
        </ul>
        <br>
        <p><strong>GitHub Repository:</strong> <a href="https://github.com/narendra192211960" target="_blank" style="color:var(--accent-cyan);">github.com/narendra192211960</a></p>
      `
    },
    climate: {
      title: "Climate Change Prediction & Accuracy Comparison Model",
      category: "Machine Learning Project",
      tech: ["Python", "Scikit-Learn", "SVM (Support Vector Machine)", "Random Forest Classifier", "Pandas", "Matplotlib"],
      description: `
        <p>A data science initiative to evaluate machine learning performance on historical climate data and predict global temperature variations.</p>
        <br>
        <h4>Technical Highlights:</h4>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Preprocessed, normalized, and engineered features on climate datasets.</li>
          <li>Built and fine-tuned <strong>Support Vector Machine (SVM)</strong> and <strong>Random Forest</strong> algorithms.</li>
          <li>Compared confusion matrices, accuracy, precision, and recall scores. Random Forest yielded 94.2% accuracy versus 89.6% for SVM.</li>
        </ul>
      `
    },
    airquality: {
      title: "Air Quality Index (AQI) Prediction & Health Insight Platform",
      category: "Data Science & AI Solution",
      tech: ["Python", "Scikit-Learn", "Data Analytics", "AQI Standards", "Matplotlib"],
      description: `
        <p>An intelligent environmental analysis application designed to predict regional Air Quality Index values and trigger personalized safety alerts.</p>
        <br>
        <h4>Technical Highlights:</h4>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Analyzes concentrations of PM2.5, PM10, NO2, CO, and SO2 pollutants.</li>
          <li>Generates automated actionable health recommendations for sensitive demographic groups.</li>
        </ul>
      `
    },
    blooddonor: {
      title: "Blood Donor Web System & Emergency Locator Portal",
      category: "Full-Stack Web Application",
      tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "XAMPP"],
      description: `
        <p>A web application built to streamline blood donation requests during emergency medical situations.</p>
        <br>
        <h4>Key Features:</h4>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Donor registration portal with blood group, contact details, and location filters.</li>
          <li>Real-time search functionality matching urgent requests with eligible nearby registered donors.</li>
          <li>Secure MySQL database schema handling user profiles and donor availability status.</li>
        </ul>
      `
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const details = projectDetailsMap[projKey];
      if (details) {
        modalBody.innerHTML = `
          <div style="margin-bottom: 16px;">
            <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">${details.category}</span>
            <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-top: 4px; font-weight: 800;">${details.title}</h2>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
            ${details.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
          </div>
          <div>${details.description}</div>
        `;
        projectModal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      projectModal.classList.remove('active');
    });
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
      }
    });
  }


  /* ------------------------------------------------------------------------
     7. INTERACTIVE TERMINAL WIDGET SIMULATOR
     ------------------------------------------------------------------------ */
  const terminalBody = document.getElementById('terminalBody');
  const btnRunSpeakwell = document.getElementById('btnRunSpeakwell');
  const btnRunJava = document.getElementById('btnRunJava');
  const btnRunML = document.getElementById('btnRunML');
  const btnClearTerminal = document.getElementById('btnClearTerminal');

  function appendTerminalLine(prompt, cmd, outputs) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';
    lineDiv.innerHTML = `<span class="prompt">${prompt}</span> <span class="cmd">${cmd}</span>`;
    terminalBody.appendChild(lineDiv);

    outputs.forEach(out => {
      const outDiv = document.createElement('div');
      outDiv.className = 'terminal-line output';
      outDiv.textContent = out;
      terminalBody.appendChild(outDiv);
    });

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  if (btnRunSpeakwell) {
    btnRunSpeakwell.addEventListener('click', () => {
      appendTerminalLine('narendra@speakwell-ai ~$', 'python evaluate_speech.py --audio sample_user.wav', [
        '✦ Processing audio stream: 16kHz PCM mono...',
        '✦ AI Speech Recognition: "The quick brown fox jumps over the lazy dog."',
        '------------------------------------------------',
        '📊 EVALUATION METRICS:',
        '  - Pronunciation Score : 94.5%',
        '  - Fluency & Pace       : 135 WPM (Optimal)',
        '  - Grammar & Accuracy  : 98.0%',
        '✔ Feedback generated & stored to Flask database.'
      ]);
    });
  }

  if (btnRunJava) {
    btnRunJava.addEventListener('click', () => {
      appendTerminalLine('narendra@java17-box ~$', 'java --version && java Demo.java', [
        'java 17.0.10 2024-01-16 LTS (Oracle Certified)',
        '------------------------------------------------',
        'public record Developer(String name, String role, int cgpa) {}',
        'Developer dev = new Developer("A. Narendra Reddy", "Software Developer", 9.0);',
        'System.out.println("Output: " + dev.name() + " | CGPA: " + dev.cgpa());',
        '>> Output: A. Narendra Reddy | CGPA: 8.96'
      ]);
    });
  }

  if (btnRunML) {
    btnRunML.addEventListener('click', () => {
      appendTerminalLine('narendra@ml-lab ~$', 'python train_climate_model.py', [
        '✦ Loading climate dataset (1980 - 2026 anomalies)...',
        '✦ Training Support Vector Machine (SVM) Kernel = RBF...',
        '✦ Training Random Forest Ensemble (n_estimators=100)...',
        '------------------------------------------------',
        '🏆 MODEL COMPARISON RESULTS:',
        '  [1] Random Forest Accuracy : 94.2%',
        '  [2] SVM Classifier Accuracy  : 89.6%',
        '✔ Random Forest selected for global anomaly prediction.'
      ]);
    });
  }

  if (btnClearTerminal) {
    btnClearTerminal.addEventListener('click', () => {
      terminalBody.innerHTML = `
        <div class="terminal-line"><span class="comment">// Terminal cleared. Select an option to execute code simulation.</span></div>
        <div class="terminal-line"><span class="prompt">narendra@portfolio ~$</span> <span class="cmd">_</span></div>
      `;
    });
  }


  /* ------------------------------------------------------------------------
     8. TOAST NOTIFICATION & COPY TO CLIPBOARD HANDLER
     ------------------------------------------------------------------------ */
  const toastContainer = document.getElementById('toastContainer');
  const copyBtns = document.querySelectorAll('.copy-btn');

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast(`Text: ${textToCopy}`);
        });
      }
    });
  });


  /* ------------------------------------------------------------------------
     9. CONTACT FORM SUBMISSION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('click', (e) => {
      if (e.target.type === 'submit') {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (nameInput.value && emailInput.value && messageInput.value) {
          showToast(`Thank you, ${nameInput.value}! Your message has been sent successfully.`);
          contactForm.reset();
        } else {
          showToast(`Please fill in all required fields.`);
        }
      }
    });
  }


  /* ------------------------------------------------------------------------
     10. BACK TO TOP BUTTON HANDLER
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
