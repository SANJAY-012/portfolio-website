import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// Type Definitions
interface Project {
  id: number;
  title: string;
  description: string;
  skills: string[];
  github: string;
}

interface ExperienceItem {
  title: string;
  date?: string;
  company?: string;
  desc: string | string[];
}

interface SkillCategory {
  category: string;
  skills: Array<{
    icon: string;
    name: string;
    level: string;
  }>;
}

interface Highlight {
  icon: string;
  title: string;
  desc: string;
}

interface ContactItem {
  icon: string;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Set up intersection observer to detect which section is in view
  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.3, // when 30% of the section is visible
    };

    const sectionIds = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      // Clean up observer when component unmounts
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    
    // Use a smoother approach with offset calculation
    const section = document.getElementById(sectionId);
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const projects: Project[] = [
      {
        id: 1,
        title: 'AI Code Assistant',
        description: 'A Copilot-like code generation tool leveraging machine learning to assist developers',
        skills: ['Python', 'NLP', 'Machine Learning'],
        github: 'https://github.com/SANJAY-012/ai-code-assistant',
      },
      {
        id: 2,
        title: 'Personal Portfolio',
        description: 'Modern responsive portfolio website built with React and TypeScript',
        skills: ['React', 'TypeScript', 'CSS'],
        github: 'https://github.com/SANJAY-012/portfolio',
      },
      {
        id: 3,
        title: 'E-commerce Dashboard',
        description: 'Interactive dashboard for tracking sales and inventory metrics',
        skills: ['React', 'Node.js', 'SQL'],
        github: 'https://github.com/SANJAY-012/ecommerce-dashboard',
      },
      {
        id: 4,
        title: 'Smart Task Manager',
        description: 'MERN stack task management application with AI-powered task prioritization and suggestions',
        skills: ['MongoDB', 'Express', 'React', 'Node.js', 'TensorFlow.js'],
        github: 'https://github.com/SANJAY-012/smart-task-manager',
      },
      {
        id: 5,
        title: 'Real-time Chat Application',
        description: 'Full-stack messaging platform with sentiment analysis and automatic translation features',
        skills: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'NLP'],
        github: 'https://github.com/SANJAY-012/realtime-chat-app',
      },
      {
        id: 6,
        title: 'Content Recommendation System',
        description: 'MERN application that uses collaborative filtering to suggest personalized content to users',
        skills: ['MongoDB', 'Express', 'React', 'Node.js', 'Machine Learning'],
        github: 'https://github.com/SANJAY-012/content-recommender',
      },
      {
        id: 7,
        title: 'Job Application Tracker',
        description: 'MERN stack application that helps users track job applications with AI resume matching',
        skills: ['MongoDB', 'Express', 'React', 'Node.js', 'NLP'],
        github: 'https://github.com/SANJAY-012/job-tracker-ai',
      },
      {
        id: 8,
        title: 'Healthcare Patient Portal',
        description: 'Secure MERN application for patient management with symptom prediction features',
        skills: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'TensorFlow.js'],
        github: 'https://github.com/SANJAY-012/patient-portal',
      },
      {
        id: 9,
        title: 'Social Media Analytics Dashboard',
        description: 'MERN platform that analyzes social media trends and provides AI-generated content suggestions',
        skills: ['MongoDB', 'Express', 'React', 'Node.js', 'D3.js', 'GPT API'],
        github: 'https://github.com/SANJAY-012/social-analytics',
      },
  ];

  const highlights: Highlight[] = [
    { icon: 'fas fa-code', title: 'Developer', desc: 'Full-stack development with focus on AI integration' },
    { icon: 'fas fa-brain', title: 'AI Enthusiast', desc: 'Passionate about Web and AI/ML applications' },
    { icon: 'fas fa-graduation-cap', title: 'Continuous Learner', desc: 'Always expanding my technical skills' },
  ];

  const experienceItems: ExperienceItem[] = [
    {
      title: 'Web Developer',
      date: 'Nov 2024 - Jan 2025',
      company: 'OASIS INFOBYTE, Remote',
      desc: 'Developed and maintained web applications using MERN stack (MongoDB, Express.js, React, Node.js)',
    },
    {
      title: 'AI Intern',
      date: 'Jun 2024 - Aug 2024',
      company: 'Coding JR, Remote',
      desc: 'Contributed to developing Copilot-like models, focusing on enhancing code generation and developer assistance tools.',
    },
    {
      title: 'Bachelor of Computer Applications (BCA)',
      date: '2022 - 2025',
      company: 'IES University, Bhopal, MP',
      desc: 'Pursuing comprehensive education in computer applications, focusing on programming and software development.',
    },
    {
      title: 'Certifications & Training',
      desc: [
        '<strong>Prompt Engineering</strong> - DeepLearning.ai (Nov 2023 - Dec 2023)',
        '<strong>Python</strong> - Udemy',
        '<strong>Web Development</strong> - Scaler',
      ].join('<br />'),
    },
  ];

  const skillCategories: SkillCategory[] = [
    {
      category: 'Programming Languages',
      skills: [
        { icon: 'fab fa-python', name: 'Python', level: '85%' },
        { icon: 'fab fa-js', name: 'JavaScript', level: '75%' },
      ],
    },
    {
      category: 'Web Development',
      skills: [
        { icon: 'fab fa-html5', name: 'HTML & CSS', level: '80%' },
        { icon: 'fab fa-react', name: 'ReactJS', level: '70%' },
        { icon: 'fab fa-node-js', name: 'Node.js', level: '65%' },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { icon: 'fas fa-database', name: 'SQL', level: '75%' },
        { icon: 'fas fa-database', name: 'MongoDB', level: '75%' },
      ],
    },
  ];

  const contactItems: ContactItem[] = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: '<a href="mailto:thesanjay369@gmail.com">thesanjay369@gmail.com</a>',
    },
    { 
      icon: 'fas fa-phone', 
      title: 'Phone', 
      content: '+91 *****1881' 
    },
    { 
      icon: 'fas fa-map-marker-alt', 
      title: 'Location', 
      content: 'Bhopal, Madhya Pradesh, India' 
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      content: '<a href="https://www.linkedin.com/in/sanjaysingh-ai/" target="_blank" rel="noopener noreferrer">sanjaysingh-ai</a>',
    },
  ];

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="logo">
          <h1>
            Sanjay<span>Singh</span>
          </h1>
        </div>
        <div
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          role="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <div className="hamburger"></div>
        </div>
        <nav className={isMenuOpen ? 'active' : ''}>
          <ul>
            {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className={activeSection === section ? 'active' : ''}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="theme-toggle" onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? '☀️' : '🌙'}
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-content">
            <h1>
              Hello, I'm <span>Sanjay Singh</span>
            </h1>
            <h2>Full Stack Developer & AI Enthusiast</h2>
            <p>Passionate about creating innovative solutions through code</p>
            <div className="hero-buttons">
              <a 
                href="#contact" 
                className="btn primary-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contact Me
              </a>
              <a 
                href="#projects" 
                className="btn secondary-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
              >
                View Projects
              </a>
            </div>
            <div className="social-links">
              <a 
                href="https://github.com/SANJAY-012" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/sanjaysingh-ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:thesanjay369@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="section-header">
            <h2>About Me</h2>
            <div className="underline"></div>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm Sanjay Singh, 
                a full-stack developer specializing in MERN stack technologies with a growing passion for AI integration.
                My expertise spans building responsive interfaces with React, 
                crafting efficient backend solutions with Node.js and Express, and working with MongoDB databases. 
                During my web development internship, I've contributed to various projects including an AI Code Assistant and E-commerce Dashboard, gaining valuable experience in the complete development lifecycle. 
                I'm constantly exploring new technologies and approaches to create innovative solutions that solve real-world problems. 
              </p>
              <p>
                I'm currently pursuing my Bachelor of Computer Applications (BCA) at IES University, Bhopal, and recently completed an
                AI internship where I worked on developing Copilot-like models. My passion lies in creating technology that makes a
                positive impact.
              </p>
              <div className="about-highlights">
                {highlights.map((highlight, idx) => (
                  <div className="highlight-item" key={idx}>
                    <div className="highlight-icon">
                      <i className={highlight.icon}></i>
                    </div>
                    <div className="highlight-text">
                      <h3>{highlight.title}</h3>
                      <p>{highlight.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <div className="section-header">
            <h2>Experience & Education</h2>
            <div className="underline"></div>
          </div>
          <div className="timeline">
            {experienceItems.map((item, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{item.title}</h3>
                    {item.date && <span className="date">{item.date}</span>}
                  </div>
                  <div className="timeline-body">
                    {item.company && <h4>{item.company}</h4>}
                    <p 
                      dangerouslySetInnerHTML={{ 
                        __html: Array.isArray(item.desc) 
                          ? item.desc.join('<br />') 
                          : item.desc 
                      }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="skills-section">
          <div className="section-header">
            <h2>Technical Skills</h2>
            <div className="underline"></div>
          </div>
          <div className="skills-container">
            {skillCategories.map((cat, idx) => (
              <div className="skill-category" key={idx}>
                <h3>{cat.category}</h3>
                <div className="skills-grid">
                  {cat.skills.map((skill, sIdx) => (
                    <div className="skill-item" key={sIdx}>
                      <div className="skill-icon">
                        <i className={skill.icon}></i>
                      </div>
                      <h4>{skill.name}</h4>
                      <div className="skill-bar">
                        <div 
                          className="skill-level" 
                          style={{ width: skill.level }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="section-header">
            <h2>Projects</h2>
            <div className="underline"></div>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-skills">
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                    >
                      <i className="fab fa-github"></i> View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-header">
            <h2>Contact Me</h2>
            <div className="underline"></div>
          </div>
          <div className="contact-container">
            <div className="contact-info">
              {contactItems.map((item, idx) => (
                <div className="contact-item" key={idx}>
                  <div className="contact-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="contact-text">
                    <h3>{item.title}</h3>
                    <p 
                      dangerouslySetInnerHTML={{ 
                        __html: item.content 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sanjay Singh. All Rights Reserved.</p>
          <p>Made with <i className="fas fa-heart"></i> and React</p>
        </div>
      </footer>
    </div>
  );
};

export default App;