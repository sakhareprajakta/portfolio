import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// --- CONTACT SECTION COMPONENT ---
function ContactSection() {
  const form = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", message: "", fallbackMailto: "" });

  useEffect(() => {
    try {
      emailjs.init({
        publicKey: "5PEntxYq218uj-ngW",
      });
    } catch (err) {
      console.warn("EmailJS init warning:", err);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus({ state: "submitting", message: "Sending your message...", fallbackMailto: "" });

    const templateParams = {
      name: formData.name,
      from_name: formData.name,
      user_name: formData.name,
      email: formData.email,
      from_email: formData.email,
      user_email: formData.email,
      reply_to: formData.email,
      message: formData.message,
    };

    const mailtoLink = `mailto:sakhareprajakta2@gmail.com?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${formData.name || "Visitor"}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    try {
      // 1. Try sending via emailjs.send with full parameter aliases
      await emailjs.send(
        "service_op0qs1i",
        "template_4w3ikwc",
        templateParams,
        { publicKey: "5PEntxYq218uj-ngW" }
      );

      setStatus({
        state: "success",
        message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
        fallbackMailto: "",
      });
      setFormData({ name: "", email: "", message: "" });
      if (form.current) form.current.reset();
      setTimeout(() => setStatus({ state: "idle", message: "", fallbackMailto: "" }), 7000);
    } catch (err1) {
      console.warn("emailjs.send failed, attempting sendForm fallback...", err1);
      try {
        // 2. Fallback to sendForm if send had an issue
        await emailjs.sendForm(
          "service_op0qs1i",
          "template_4w3ikwc",
          form.current,
          { publicKey: "5PEntxYq218uj-ngW" }
        );

        setStatus({
          state: "success",
          message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
          fallbackMailto: "",
        });
        setFormData({ name: "", email: "", message: "" });
        if (form.current) form.current.reset();
        setTimeout(() => setStatus({ state: "idle", message: "", fallbackMailto: "" }), 7000);
      } catch (err2) {
        console.error("EmailJS Error:", err2);
        const reason = err2?.text || err1?.text || err2?.message || "Service issue";
        setStatus({
          state: "error",
          message: `Unable to deliver message automatically (${reason}). Click below to send directly via your email app:`,
          fallbackMailto: mailtoLink,
        });
      }
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <span className="section-badge">Get In Touch</span>
        <h2 className="section-title">Let's Work Together</h2>
        <p className="section-subtitle">
          Have a project in mind, an open role, or just want to connect? Send a message below!
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info-card">
          <h3>Contact Information</h3>
          <p className="contact-desc">
            Feel free to reach out directly through any of the channels below. I'm actively looking for full-time opportunities and exciting projects.
          </p>

          <div className="contact-methods">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>Pune (411046), Maharashtra, India</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h4>Email</h4>
                <a href="mailto:sakhareprajakta2@gmail.com">sakhareprajakta2@gmail.com</a>
              </div>
            </div>


            <div className="contact-item">
              <div className="contact-icon">💼</div>
              <div>
                <h4>LinkedIn</h4>
                <a
                  href="https://www.linkedin.com/in/prajakta-sakhare-b77b49220/"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/prajakta-sakhare
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">🐙</div>
              <div>
                <h4>GitHub</h4>
                <a
                  href="https://github.com/sakhareprajakta"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/sakhareprajakta
                </a>
              </div>
            </div>
          </div>

          <div className="contact-availability">
            <span className="status-indicator"></span>
            <span>Available for Full-time Roles &amp; Freelance Projects</span>
          </div>
        </div>

        <div className="contact-form-card">
          <h3>Send Me a Message</h3>
          <form className="contact-form" ref={form} onSubmit={sendEmail}>
            {/* Hidden field aliases to ensure EmailJS template variables match */}
            <input type="hidden" name="from_name" value={formData.name} />
            <input type="hidden" name="user_name" value={formData.name} />
            <input type="hidden" name="from_email" value={formData.email} />
            <input type="hidden" name="user_email" value={formData.email} />
            <input type="hidden" name="reply_to" value={formData.email} />

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Hi Prajakta, I would like to discuss a project / job opportunity with you..."
                required
              ></textarea>
            </div>

            {status.message && (
              <div className={`form-feedback ${status.state}`}>
                <p>{status.message}</p>
                {status.fallbackMailto && (
                  <a
                    href={status.fallbackMailto}
                    className="fallback-email-btn"
                  >
                    Send Directly via Email Client ✉️
                  </a>
                )}
              </div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={status.state === "submitting"}
            >
              {status.state === "submitting" ? "Sending..." : "Send Message 🚀"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// --- MAIN PORTFOLIO COMPONENT ---
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);

  const roles = [
    "Full-Stack Developer",
    "React.js Developer",
    "Node.js Developer",
    "Frontend & UI Engineer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ONLY THE TWO REQUESTED KEY PROJECTS
  const projects = [
    {
      id: "ai-task-manager",
      title: "AI-Based Task Management System",
      badge: "Featured / AI-Powered",
      description:
        "Full-stack AI task manager built with React.js, Node.js, and MongoDB featuring intelligent AI-driven task prioritization, deadline alerts, JWT authentication, and a real-time Redux-powered dashboard for productivity tracking.",
      highlights: [
        "Built visual task board with task creation, assignment, priority, deadline, status tracking, update, and delete functionality.",
        "Integrated Gemini AI API to generate task suggestions and provide estimated task completion time based on task details.",
        "Engineered role-based access control (RBAC) with secure JWT authentication and real-time dashboard analytics."
      ],
      techStack: [
        "React.js",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "JWT",
        "Gemini AI API",
        "Redux Toolkit",
        "HTML5",
        "CSS3"
      ],
      demoUrl: "https://ai-task-manager-web.vercel.app",
      codeUrl: "https://github.com/sakhareprajakta",
      icon: "🤖"
    },
    {
      id: "workday-automation",
      title: "Advanced Job Application Automation for Workday",
      badge: "Chrome Extension MV3 / Automation",
      description:
        "A browser-based job application automation system using a Manifest V3 Chrome Extension to assist with completing complex, multi-step Workday application forms seamlessly.",
      highlights: [
        "Engineered dynamic field-detection and label/alias mapping logic to identify and map candidate information across changing field labels, attributes, and DOM structures.",
        "Built a React.js profile management interface with Node.js/Express.js REST APIs and MongoDB to securely manage and retrieve reusable candidate profile information.",
        "Optimized form-filling efficiency, reducing manual repetitive input and accelerating application submissions."
      ],
      techStack: [
        "React.js",
        "JavaScript",
        "Chrome Extension MV3",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "DOM Manipulation"
      ],
      demoUrl: "https://github.com/sakhareprajakta",
      codeUrl: "https://github.com/sakhareprajakta",
      icon: "⚡"
    }
  ];

  // CERTIFICATIONS WITH ATTACHED IMAGES
  const certifications = [
    {
      title: "Java Full Stack Developer",
      issuer: "Giri's Tech Hub Pvt Ltd, Pune",
      date: "5th July 2022 – 5th Mar 2023",
      image: "/certificates/java_fullstack_giris.png",
      pdfUrl: "/certificates/java_fullstack_giris.pdf",
      skills: ["Java", "JSP", "Servlets", "JDBC", "MySQL", "Full Stack Development"],
      description:
        "Comprehensive hands-on training covering Java core, web backend architectures, database connectivity, and full-stack development."
    },
    {
      title: "Unlocking the Power of JavaScript",
      issuer: "Scaler Topics (Certificate of Excellence)",
      date: "10 May 2026",
      image: "/certificates/javascript_scaler.png",
      pdfUrl: "/certificates/javascript_scaler.pdf",
      skills: ["JavaScript (ES6+)", "Async JS", "Event Loop", "DOM", "Performance"],
      description:
        "In recognition of completing the comprehensive JavaScript program: 70 Video Tutorials, 9 In-Depth Modules, and 8 Coding Challenges."
    },
    {
      title: "AI Tools & ChatGPT Workshop",
      issuer: "be10x (Verified Completion)",
      date: "21st December 2025",
      image: "/certificates/ai_tools_be10x.png",
      pdfUrl: "/certificates/ai_tools_be10x.pdf",
      skills: ["ChatGPT", "AI Productivity", "AI-Assisted Coding", "Rapid Debugging"],
      description:
        "Certified in leveraging modern AI tools and LLMs to accelerate coding, debugging, presentations, and data analysis in under 10 minutes."
    },
    {
      title: "Full Stack Development Internship",
      issuer: "Cognifyz Technologies",
      date: "Nov 2025 – Dec 2025",
      image: "/certificates/internship_cognifyz.png",
      pdfUrl: "/certificates/internship_cognifyz.pdf",
      skills: ["Full Stack Development", "React.js", "Node.js", "REST APIs", "Teamwork"],
      description:
        "Successfully served as a Full Stack Development Intern, demonstrating exceptional problem-solving, code quality, and dedication to building scalable web applications."
    }
  ];

  return (
    <div className="portfolio-container">
      {/* ================= NAVBAR ================= */}
      <header className="navbar-header">
        <nav className="navbar">
          <div className="navbar-container">
            <a href="#home" className="logo">
              <span className="logo-symbol">&lt;</span>
              Prajakta
              <span className="logo-symbol">/&gt;</span>
            </a>

            {/* Hamburger Button */}
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Navigation Links */}
            <ul className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
              <li onClick={closeMenu}>
                <a href="#home">Home</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#about">About</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#skills">Skills</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#experience">Experience</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#projects">Projects</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#certifications">Certifications</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#education">Education</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#contact" className="nav-cta-link">
                  Contact Me
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section id="home" className="hero-section">
        <div className="hero-background-glow"></div>
        <div className="hero-content">
          {/* LEFT SIDE TEXT */}
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-pulse"></span>
              Available for Full-time Roles
            </div>

            <h1 className="hero-title">
              Hi, I am <span className="gradient-text">Prajakta Sakhare</span>
            </h1>

            <div className="role-container">
              <span className="role-prefix">I am a </span>
              <span className="role-animated">{roles[roleIndex]}</span>
            </div>

            <p className="hero-bio">
              Full-Stack Developer with <strong>2+ years of experience</strong> building
              responsive, production-grade applications with <strong>React.js, Redux Toolkit</strong> on the
              frontend and <strong>Node.js/Express.js</strong> on the backend. Skilled in JWT/RBAC security,
              RESTful APIs, Gemini AI integration, and cloud deployments across Vercel, AWS, and VPS.
            </p>

            {/* HERO STATS - 10+ Projects removed as requested */}
            <div className="hero-stats">
              <div className="stat-card">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">Full-Stack</span>
                <span className="stat-label">React &amp; Node.js</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">M.Sc</span>
                <span className="stat-label">Computer Science</span>
              </div>
            </div>

            <div className="hero-actions">
              <a
                href="/Prajakta_Sakhare_Resume.pdf"
                className="btn-primary"
                download="Prajakta_Sakhare_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <span>Download Resume</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>

              <a href="#projects" className="btn-secondary">
                <span>View Projects</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

              <a href="#contact" className="btn-outline">
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-social-links">
              <a
                href="https://github.com/sakhareprajakta"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/prajakta-sakhare-b77b49220/"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                title="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="mailto:sakhareprajakta2@gmail.com"
                className="social-icon"
                title="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>

            </div>
          </div>

          {/* RIGHT SIDE AVATAR */}
          <div className="hero-image-wrapper">
            <div className="avatar-frame">
              <div className="avatar-glow"></div>
              <img
                src="/image/prajakta2.jpg"
                alt="Prajakta Sakhare"
                className="avatar-img"
              />
            </div>

            {/* Floating Tech Badges */}
            <div className="floating-badge badge-react">
              <span className="badge-icon">⚛️</span>
              <span>React.js</span>
            </div>
            <div className="floating-badge badge-node">
              <span className="badge-icon">🟢</span>
              <span>Node.js</span>
            </div>
            <div className="floating-badge badge-mongo">
              <span className="badge-icon">🍃</span>
              <span>MongoDB</span>
            </div>
            <div className="floating-badge badge-cloud">
              <span className="badge-icon">☁️</span>
              <span>AWS / Vercel</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="about-section">
        <div className="section-header">
          <span className="section-badge">Get To Know Me</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate about architecting clean web solutions and delivering impactful user experiences
          </p>
        </div>

        <div className="about-container">
          <div className="about-left">
            <div className="about-narrative">
              <h3>
                Hello! I'm Prajakta, an <span className="highlight">Experienced Web Developer</span> based in Pune, India.
              </h3>
              <p>
                With over <strong>2+ years of production experience as a Web Developer</strong> at{" "}
                <strong>Vetrina Healthcare Pvt. Ltd.</strong>, I specialize in engineering responsive,
                scalable applications with <strong>React.js, Redux Toolkit</strong> on the frontend and{" "}
                <strong>Node.js / Express.js</strong> on the backend.
              </p>
              <p>
                I have designed and delivered secure REST APIs, implemented JWT-based Role-Based
                Access Control (RBAC), and integrated both <strong>MySQL</strong> and <strong>MongoDB</strong>{" "}
                databases. I frequently integrate modern AI tools, including the <strong>Gemini AI API</strong>{" "}
                for smart auto-suggestions, task prioritization, and predictive logic to accelerate delivery.
              </p>
              <p>
                I hold a <strong>Master's Degree in Computer Science (M.Sc)</strong> from Rajarshi Shahu
                Mahavidyalaya with an 8.20 CGPA. I stay on the cutting edge by integrating modern AI-assisted
                coding workflows, adhering to best web performance practices (code splitting, caching,
                lazy loading), and deploying across <strong>AWS, Vercel, and VPS environments</strong>.
              </p>
            </div>

            <div className="about-strengths-grid">
              <div className="strength-card">
                <span className="strength-icon">⚡</span>
                <h4>Clean Architecture</h4>
                <p>Modular, reusable components using Functional Components, Hooks, Context API &amp; Redux.</p>
              </div>
              <div className="strength-card">
                <span className="strength-icon">🔒</span>
                <h4>Security &amp; Auth</h4>
                <p>Strict RBAC, JWT authentication, and secure API data validation flows.</p>
              </div>
              <div className="strength-card">
                <span className="strength-icon">🤖</span>
                <h4>AI Integration</h4>
                <p>Gemini AI API integration for smart auto-suggestions, prioritization &amp; analytics.</p>
              </div>
              <div className="strength-card">
                <span className="strength-icon">🚀</span>
                <h4>Performance Driven</h4>
                <p>Optimized bundle sizes, asset caching, image optimization, and sub-second load times.</p>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="profile-details-card">
              <h3>Profile Summary</h3>
              <ul className="details-list">
                <li>
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">Prajakta Sakhare</span>
                </li>
                <li>
                  <span className="detail-label">Role:</span>
                  <span className="detail-value">Web Developer (React | Node.js)</span>
                </li>
                <li>
                  <span className="detail-label">Experience:</span>
                  <span className="detail-value">2+ Years (Nov 2023 - Nov 2025)</span>
                </li>
                <li>
                  <span className="detail-label">Education:</span>
                  <span className="detail-value">M.Sc Computer Science (CGPA: 8.20)</span>
                </li>
                <li>
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">Pune, Maharashtra, India</span>
                </li>
                <li>
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">sakhareprajakta2@gmail.com</span>
                </li>
                <li>
                  <span className="detail-label">Availability:</span>
                  <span className="detail-value status-badge-inline">Open to New Opportunities</span>
                </li>
              </ul>

              <div className="about-cta-box">
                <p>Looking for an experienced Web Developer for your team?</p>
                <a href="#contact" className="btn-primary full-width">
                  Let's Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section id="skills" className="skills-section">
        <div className="section-header">
          <span className="section-badge">Capabilities</span>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">
            A comprehensive overview of the technologies, tools, and frameworks I use every day
          </p>
        </div>

        <div className="skills-grid">
          {/* Frontend Card */}
          <div className="skill-category-card">
            <div className="category-header">
              <div className="category-icon">🎨</div>
              <div>
                <h3>Frontend Development</h3>
                <p>Modern UI/UX &amp; Scalable React Architecture</p>
              </div>
            </div>
            <div className="skill-tags">
              <span className="tag">React.js</span>
              <span className="tag">Next.js (App Router, SSR, SSG)</span>
              <span className="tag">Redux Toolkit</span>
              <span className="tag">Context API</span>
              <span className="tag">JavaScript (ES6+)</span>
              <span className="tag">Material UI</span>
              <span className="tag">HTML5</span>
              <span className="tag">CSS3</span>
              <span className="tag">Bootstrap</span>
              <span className="tag">Responsive Web Design</span>
            </div>
            <div className="category-proficiency">
              <div className="proficiency-header">
                <span>Frontend Mastery</span>
                <span>92%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "92%" }}></div>
              </div>
            </div>
          </div>

          {/* Backend Card */}
          <div className="skill-category-card">
            <div className="category-header">
              <div className="category-icon">⚙️</div>
              <div>
                <h3>Backend &amp; API Design</h3>
                <p>Scalable Server Architecture &amp; Security</p>
              </div>
            </div>
            <div className="skill-tags">
              <span className="tag">Node.js</span>
              <span className="tag">Express.js</span>
              <span className="tag">REST APIs</span>
              <span className="tag">JWT Authentication</span>
              <span className="tag">Role-Based Access (RBAC)</span>
              <span className="tag">Middleware Architecture</span>
              <span className="tag">AJAX / Axios / Fetch</span>
            </div>
            <div className="category-proficiency">
              <div className="proficiency-header">
                <span>Backend Proficiency</span>
                <span>88%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "88%" }}></div>
              </div>
            </div>
          </div>

          {/* Databases Card */}
          <div className="skill-category-card">
            <div className="category-header">
              <div className="category-icon">🗄️</div>
              <div>
                <h3>Databases &amp; Query Optimization</h3>
                <p>Relational &amp; Document Databases</p>
              </div>
            </div>
            <div className="skill-tags">
              <span className="tag">MongoDB</span>
              <span className="tag">MySQL</span>
              <span className="tag">Database Design</span>
              <span className="tag">Query Optimization</span>
              <span className="tag">CRUD Operations</span>
            </div>
            <div className="category-proficiency">
              <div className="proficiency-header">
                <span>Database Handling</span>
                <span>85%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>

          {/* Cloud & DevOps Card */}
          <div className="skill-category-card">
            <div className="category-header">
              <div className="category-icon">☁️</div>
              <div>
                <h3>Cloud, Hosting &amp; Developer Tools</h3>
                <p>Production Deployment &amp; Version Control</p>
              </div>
            </div>
            <div className="skill-tags">
              <span className="tag">AWS</span>
              <span className="tag">VPS</span>
              <span className="tag">Vercel</span>
              <span className="tag">Git &amp; GitHub</span>
              <span className="tag">Postman</span>
              <span className="tag">VS Code</span>
              <span className="tag">Agile / Scrum Code Reviews</span>
            </div>
            <div className="category-proficiency">
              <div className="proficiency-header">
                <span>DevOps &amp; Tools</span>
                <span>82%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "82%" }}></div>
              </div>
            </div>
          </div>

          {/* Optimization & AI Card */}
          <div className="skill-category-card wide-card">
            <div className="category-header">
              <div className="category-icon">🤖</div>
              <div>
                <h3>AI-Assisted Development &amp; Web Performance</h3>
                <p>Gemini AI Integrations, Speed, &amp; Smart Automation</p>
              </div>
            </div>
            <div className="skill-tags">
              <span className="tag highlight-tag">Gemini AI API</span>
              <span className="tag highlight-tag">AI Auto-Suggestions</span>
              <span className="tag highlight-tag">Smart Prioritization Logic</span>
              <span className="tag highlight-tag">Code Splitting &amp; Lazy Loading</span>
              <span className="tag highlight-tag">Caching &amp; Image Optimization</span>
              <span className="tag highlight-tag">Chrome Extension MV3 Automation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE SECTION ================= */}
      <section id="experience" className="experience-section">
        <div className="section-header">
          <span className="section-badge">Career Journey</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Proven track record of building production applications in collaborative, agile environments
          </p>
        </div>

        <div className="experience-timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <div className="timeline-header">
                <div>
                  <h3 className="role-title">Web Developer (Frontend | Backend)</h3>
                  <h4 className="company-title">
                    Vetrina Healthcare Pvt. Ltd. <span className="location-pill">Pune, Maharashtra | Full-Time</span>
                  </h4>
                </div>
                <div className="timeline-period">
                  <span>Nov 2023 – Nov 2025</span>
                  <span className="period-badge">2 Years Full-Time</span>
                </div>
              </div>

              <div className="timeline-body">
                <ul className="achievements-list">
                  <li>
                    <strong>Responsive Web Applications:</strong> Developed and maintained responsive web applications using React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, and jQuery, improving cross-device usability and reducing UI-related issues by approximately 25%.
                  </li>
                  <li>
                    <strong>Reusable Architecture:</strong> Built reusable React components using Functional Components, React Hooks, Context API, and Redux, reducing repetitive frontend development effort by approximately 30%.
                  </li>
                  <li>
                    <strong>Backend APIs &amp; Databases:</strong> Developed backend APIs using Node.js and Express.js and integrated MongoDB/MySQL, improving data-management workflow and application reliability.
                  </li>
                  <li>
                    <strong>Asynchronous Data Flow:</strong> Integrated RESTful APIs using AJAX, Fetch, and Axios, optimizing asynchronous data handling and reducing unnecessary page reloads by approximately 30%.
                  </li>
                  <li>
                    <strong>Feature Delivery &amp; Security:</strong> Implemented CRUD operations, dynamic forms, validation, search, filtering, pagination, and role-based functionality, improving feature delivery efficiency by approximately 25%.
                  </li>
                  <li>
                    <strong>DevOps &amp; Releases:</strong> Used Git/GitHub for version control and deployed applications using AWS and VPS, supporting reliable application releases and maintenance.
                  </li>
                </ul>

                <div className="tech-used-pills">
                  <span>React.js</span>
                  <span>Node.js</span>
                  <span>Express.js</span>
                  <span>Redux</span>
                  <span>Context API</span>
                  <span>MongoDB</span>
                  <span>MySQL</span>
                  <span>AWS</span>
                  <span>VPS</span>
                  <span>Git/GitHub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS SECTION (ONLY THE TWO REQUESTED PROJECTS) ================= */}
      <section id="projects" className="projects-section">
        <div className="section-header">
          <span className="section-badge">Key Projects</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Core production-grade full-stack applications with AI integrations and browser automation
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid two-projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card featured-project-card">
              <div className="project-card-header">
                <span className="project-avatar-icon">{project.icon}</span>
                <span className="project-badge">{project.badge}</span>
              </div>

              <div className="project-card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-highlights">
                  <ul>
                    {project.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-tags">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-card-footer">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn demo-btn"
                  title="Open Live Project"
                >
                  <span>Live Project 🚀</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>

                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn code-btn"
                  title="View GitHub Repository"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Code Repo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CERTIFICATIONS SECTION WITH ACTUAL IMAGES ================= */}
      <section id="certifications" className="certifications-section">
        <div className="section-header">
          <span className="section-badge">Credentials</span>
          <h2 className="section-title">Certifications &amp; Accreditations</h2>
          <p className="section-subtitle">
            Click on any certificate to inspect full-size image and verifiable credential details
          </p>
        </div>

        <div className="certifications-grid cert-images-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card cert-image-card">
              {/* Certificate Image Preview */}
              <div
                className="cert-image-container"
                onClick={() => setSelectedCert(cert)}
                title="Click to view full certificate"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cert-thumbnail"
                />
                <div className="cert-zoom-overlay">
                  <span>🔍 View Certificate</span>
                </div>
              </div>

              <div className="cert-card-body">
                <div className="cert-card-top">
                  <span className="cert-date-badge">{cert.date}</span>
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-desc">{cert.description}</p>

                <div className="cert-skills">
                  {cert.skills.map((s, i) => (
                    <span key={i} className="cert-skill-tag">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="cert-actions-row">
                  <button
                    className="cert-view-btn"
                    onClick={() => setSelectedCert(cert)}
                  >
                    View Full Image
                  </button>
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-pdf-link"
                    title="Open original document"
                  >
                    PDF Document ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATE FULL-IMAGE MODAL */}
      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="cert-modal-close"
              onClick={() => setSelectedCert(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="cert-modal-header">
              <h3>{selectedCert.title}</h3>
              <p>{selectedCert.issuer} • {selectedCert.date}</p>
            </div>
            <div className="cert-modal-image-wrapper">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="cert-modal-img"
              />
            </div>
            <div className="cert-modal-footer">
              <a
                href={selectedCert.image}
                download={`${selectedCert.title}.png`}
                className="btn-primary"
              >
                Download Image ↡
              </a>
              <button
                className="btn-outline"
                onClick={() => setSelectedCert(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDUCATION SECTION ================= */}
      <section id="education" className="education-section">
        <div className="section-header">
          <span className="section-badge">Academic Background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Strong foundational computer science and analytical education
          </p>
        </div>

        <div className="edu-timeline-container">
          <div className="edu-card">
            <div className="edu-period">2020 – 2022</div>
            <div className="edu-badge-score">CGPA: 8.20 / 10</div>
            <h3 className="edu-degree">M.Sc. Computer Science</h3>
            <h4 className="edu-school">Rajarshi Shahu Mahavidyalaya (Autonomous)</h4>
            <p className="edu-city">Latur, Maharashtra</p>
            <p className="edu-description">
              Advanced coursework in Distributed Systems, Data Structures &amp; Algorithms, Web Technologies, Database Architecture, and Software Engineering.
            </p>
          </div>

          <div className="edu-card">
            <div className="edu-period">2017 – 2020</div>
            <div className="edu-badge-score">CGPA: 9.19 / 10</div>
            <h3 className="edu-degree">B.Sc. Science</h3>
            <h4 className="edu-school">Shri Kumarswami Mahavidyalaya</h4>
            <p className="edu-city">Ausa, Latur, Maharashtra</p>
            <p className="edu-description">
              Graduated with First Class with Distinction. Focused on mathematical problem-solving, analytical programming, and computational logic.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <ContactSection />

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-copyright">
            <p>
              &copy; {new Date().getFullYear()} Prajakta Sakhare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Navbar;
