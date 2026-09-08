import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function ContactSection() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_op0qs1i",
        "template_4w3ikwc",
        form.current,
        "5PEntxYq218uj-ngW",
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("❌ Failed to send message.");
          console.error(error.text);
        },
      );
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-info">
          <p>
            <strong>Location:</strong> Pune (411046), Maharashtra .
          </p>
          <p>
            <strong>Email:</strong> sakhareprajakta2@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +91 9665888349
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/prajakta-sakhare-b77b49220/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/prajakta-sakhare-b77b49220
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/sakhareprajakta"
            >
             https://github.com/sakhareprajakta
            </a>
          </p>
        </div>

        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            rows="3"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <div>
      <div className="portfolio-container">
        <nav className="navbar">
          <div className="navbar-container">
            <h3 className="logo">
              My <span style={{ color: "green" }}>Resume</span>
            </h3>

            {/* Hamburger icon */}
            <div className="hamburger" onClick={toggleMenu}>
              {menuOpen ? "✕" : "☰"}
            </div>

            {/* Nav Links */}
            <ul className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
              <li onClick={closeMenu}>
                <a href="#home">HOME</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#about">ABOUT</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#skills">TECHNICAL SKILLS</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#experience">EXPERIENCE</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#projects">PROJECTS</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#education">EDUCATION</a>
              </li>
              <li onClick={closeMenu}>
                <a href="#contact">CONTACT</a>
              </li>
            </ul>
          </div>
        </nav>
       <section id="home" class="hero-section">
  <div class="hero-content">

    <div class="hero-text">

<h1 id="typing-name">Hi, I am Prajakta Sakhare
  </h1>

      <p>Web Developer | Full Stack Developer</p>

      <a
        href="/Prajakta_Sakhare_WD__Resume.pdf"
        class="cta-button"
        download="Prajakta_Resume_Exp2.pdf"
      >
        Download Resume ↡
      </a>

    </div>

    <div class="hero-image">
      <img src="/image/prajakta2.jpg" alt="Prajakta Sakhare"/>
    </div>

  </div>
</section>

        <section id="about" className="about-section">
          <div className="about-container">
            {/* Left side - Title only */}
            <div className="about-left">
              <h2>About Me</h2>
              <span>What i am all about</span>
            </div>

            {/* Right side - Paragraph content */}
            <div className="about-right">
              <p>
                I am <b> Prajakta Sakhare </b>, a Computer Science postgraduate with a strong
                passion for designing and developing responsive, user-friendly
                web applications. With a solid foundation in programming
                principles and full stack development, I bring both analytical
                thinking and creative problem-solving to project/websites I work
                on. recentely, I am employed as a <b> Web Developer </b>at <strong> Vetrina
                Healthcare Pvt.Ltd.</strong>, where I actively contribute to the
                development of scalable and efficient healthcare web platforms.
                <br />

                My expertise includes Full Stack technologies like <b>React.js, Node.js, HTML, CSS
                Javascript, Bootstrap, RestAPI's, MySQL ,MongoDB, </b>  as well as dynamic front-end
                libraries such as <b> Next.js, Express.js</b>. I take pride in writing clean,
                maintainable code and ensuring smooth user experiences through
                responsive design and optimized performance. I enjoy learning
                new tools and frameworks and thrive in collaborative
                environments where innovation and continuous improvement are
                valued.
                <br />
                Whether I am building applications from scratch or enhancing
                existing systems, I am driven by the goal of delivering
                high-quality software solutions that make a meaningful impact.
              </p>
            </div>
          </div>
        </section>
        <section id="skills" className="skills-section">
          <div className="skills-container">
            {/* Left Title Section */}
            <div className="skills-left">
              <h2>Skills</h2>
              <p>About me.</p>
            </div>

            {/* Right Skills Progress Section */}
            <div className="skills-right">
              <div className="skill-item">
                <span>React.js, JavaScript (ES6+), HTML5, CSS3, Redux Toolkit, Bootstrap, Next.js (SSR/SSG/App Router),</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "90%" }}></div>
                </div>
                <span className="progress-percent">90%</span>
              </div>

              <div className="skill-item">
                 <span> Node.js, Express.js, REST APIs, JWT Authentication, MySQL, MongoDB</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "95%" }}></div>
                </div>
                <span className="progress-percent">87%</span>
              </div>

              <div className="skill-item">
                <span>Code Splitting, Lazy Loading, Image Optimization, Caching, GitHub, VS Code, Postman</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "85%" }}></div>
                </div>
                <span className="progress-percent">85%</span>
              </div>

              <div className="skill-item">
                <span>AWS, Vercel, VPS Servers, Netlify</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "90%" }}></div>
                </div>
                <span className="progress-percent">80%</span>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <div className="experience-wrapper">
            {/* Left Column: Title */}
            <div className="experience-title">
              <h2>Experience</h2>
               <p>What i work done.</p>
            </div>

            {/* Middle Column: Web Developer */}
            <div className="experience-item">
              <h3>Web Developer</h3>
              <p className="company">
                Vetrina Healthcare Pvt. Ltd. Pune{" "}
                <span>(Nov 2023 - Nov 2025)</span>
              </p>
              <ul>
                <li>
                  Developed and maintained responsive web applications using HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap, and jQuery.
                </li>
                 <li>
                  Built reusable and scalable React components using functional components and React Hooks.
                </li>
                <li>
                 Integrated REST APIs using Fetch/Axios and handled API responses, errors, authentication, and loading states.
                </li>
                 <li>
                Worked with Node.js, Express.js, MongoDB, and MySQL for backend development and database integration.
                </li>
                 <li>
                 Implemented CRUD operations, form validation, search, filtering, sorting, and pagination.
                </li>
                 <li>
                Deployed and maintained web applications using Vercel, Netlify, AWS, and VPS.
                </li>
              </ul>
            </div>

            {/* Right Column: Back Office Ops */}
            
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="projects-layout">
            {/* Left Column: Section Heading */}
            <div className="projects-left">
              <h2>Projects</h2>
              <p>I build the real value.</p>
            </div>

            {/* Right Column: Project Names & Details */}
            <div className="projects-right">
              

              <div className="project-entry">
                <h3>AI Task Management System</h3>
                <p>
                  - Built an AI-powered task management system with smart task
                  prioritization, JWT authentication, and RESTful APIs using
                  React, Node.js, and MongoDB
                  <br />
                  - Implemented intelligent task prioritization and reminder
                  logic to improve productivity and reduce missed deadlines.
                  <br />
                  - Created secure REST APIs and implemented JWT-based
                  authentication for user access control..
                  <br />
                  - Designed a responsive and user-friendly dashboard to manage
                  tasks, view priorities, and track progress in real time. .
                  <br />
                </p>
                <p>
                  <strong>Tech Stack:</strong> React.js, Node.js, JavaScript, Bootstrap,
                  MongoDB
                </p>
              </div>

              <div className="project-entry">
                <h3>Online Feedback System for Training Institutes</h3>
                <p>
                  - Designed and implemented a web-based feedback system for
                  private training institutes.
                  <br />
                  - Collected feedback from students, instructors, and
                  employers.
                  <br />
                  - Enabled real-time analysis and reporting of feedback to
                  improve training quality.
                  <br />
                  - Enhanced student satisfaction through structured feedback
                  loops.
                  <br />
                  - Increased employer engagement by incorporating industry
                  insights into training outcomes.
                  <br />
                </p>
                <p>
                  <strong>Tech Used:</strong> HTML, CSS, JSP, Servlet, MySQL
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="education-section">
          <h2>Education</h2>
          <p className="edu-subtitle">Learn and grow.</p>

          <div className="edu-timeline">
            <div className="edu-item">
              <h4>2020 - 2022</h4>
              <p className="degree">M.Sc(Computer Science)</p>
              <div className="edu-line">
                <span className="dot"></span>
                <span className="line"></span>
              </div>
              <p className="institute">Rajarshi Shahu Mahavidyalaya</p>
              <p className="location">Latur, Maharashtra</p>
            </div>

            <div className="edu-item">
              <h4>2017 - 2020</h4>
              <p className="degree">B.Sc (Science)</p>
              <div className="edu-line">
                <span className="dot"></span>
                <span className="line"></span>
              </div>
              <p className="institute">Shri Kumarswami Mahavidyalaya</p>
              <p className="location">Latur, Maharashtra</p>
            </div>

            <div className="edu-item">
              <h4>2015 - 2017</h4>
              <p className="degree">HSC</p>
              <div className="edu-line">
                <span className="dot"></span>
                <span className="line"></span>
              </div>
              <p className="institute">Shivaji Vidyalaya </p>
              <p className="location">Latur, Maharashtra</p>
            </div>

            <div className="edu-item">
              <h4>2015</h4>
              <p className="degree"> SSC</p>
              <div className="edu-line">
                <span className="dot"></span>
                <span className="line"></span>
              </div>
              <p className="institute">Maharashtra Vidyalaya</p>
              <p className="location">Latur, Maharashtra</p>
            </div>
          </div>
        </section>
        <ContactSection />
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Prajakta Sakhare. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
export default Navbar;
