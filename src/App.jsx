import React, { useState, useEffect, useRef } from 'react';

// Dynamic Network Web / Constellation Mesh Background
function ConstellationCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodeCount = Math.floor((width * height) / 13000);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.45)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.22 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  const [formStatus, setFormStatus] = useState(''); // '' | 'submitting' | 'success' | 'error'

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      // ⚠️ Inga ungaloda Formspree URL-ah paste pannunga:
      const response = await fetch('https://formspree.io/f/mrpbeeqy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Input fields-ah clear pannum
        setTimeout(() => setFormStatus(''), 5000); // 5 secs kazhichu reset aagum
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  const phrases = [
    "Java Backend Developer",
    "REST API Developer",
    "Scalable Solutions Builder",
    "Creative Frontend Developer",
    "Database Management"
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  const clockTechs = [
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", posClass: "pos-0" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", posClass: "pos-1" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", posClass: "pos-2" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", posClass: "pos-3" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", posClass: "pos-4" },
    { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", posClass: "pos-5" },
    { name: "Hibernate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg", posClass: "pos-6" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", posClass: "pos-7" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", posClass: "pos-8" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", posClass: "pos-9" },
    { name: "Maven", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg", posClass: "pos-10" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", posClass: "pos-11" }
  ];

  const techCategories = [
    {
      title: "Backend Core",
      skills: ["Java", "Spring Boot", "Hibernate ORM", "REST APIs", "Microservices"]
    },
    {
      title: "Databases & Storage",
      skills: ["MySQL", "JDBC", "Data Modeling", "Schema Design"]
    },
    {
      title: "Frontend & Tools",
      skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Postman", "Git / GitHub", "Maven", "Figma"]
    }
  ];
    const experienceData = [
    {
      role: "Java Developer Intern",
      company: "Lesuccess",
      location: "Coimbatore, Tamil Nadu, India",
      period: "Jul 2025 – Aug 2025",
      type: "Internship"
    },
    {
      role: "Frontend Developer Intern",
      company: "Unityr Tech Labs",
      location: "On-Campus Incubator",
      period: "Jul 2024 – Oct 2024",
      type: "Internship"
    }
  ];

  const educationData = [
    {
      degree: "B.E. Computer Science & Engineering",
      institution: "Syed Ammal Engineering College",
      location: "Ramanathapuram, Tamil Nadu",
      period: "2022 – 2026",
      score: "8.6 CGPA",
      scoreBadge: "CGPA: 8.6"
    },
    {
      degree: "Higher Secondary Certificate (HSC 12th)",
      institution: "Syed Ammal Matric Higher Secondary School",
      location: "Ramanathapuram, Tamil Nadu",
      period: "2021 – 2022",
      score: "86%",
      scoreBadge: "Score: 86%"
    }
  ];

  const projectsData = [
    {
      title: "Smart Banking System",
      type: "Full Stack",
      primaryTech: "Spring Boot",
      desc: "Secure banking platform with JWT authentication, transaction transfers, and real-time ledger accounting.",
      techStack: ["Java", "Spring Boot", "React.js", "MySQL", "REST APIs"],
      demoLink: "#",
      githubLink: "https://github.com/",
      status: "In Progress"
    },
    {
      title: "Hostel Complaint Portal",
      type: "Full Stack",
      primaryTech: "Hibernate",
      desc: "Centralized hostel grievance system featuring room ticket resolution and authority workflows.",
      techStack: ["Java", "Spring Boot", "React.js", "Hibernate", "MySQL"],
      demoLink: "#",
      githubLink: "https://github.com/",
      status: "In Progress"
    },
    {
      title: "Dreamy Dough",
      type: "Frontend Web",
      primaryTech: "Vite + React",
      desc: "Responsive bakery app with interactive dessert menus, live cart updates, and seamless checkout.",
      techStack: ["Vite + React", "JavaScript (ES6+)", "HTML5", "CSS3"],
      demoLink: "https://dreamy-dough.vercel.app/",
      githubLink: "https://github.com/Zuwairiyamariyam/Dreamy-dough.git",
      status: "Live Demo",
      image: "/dreamy-dough.png" // 
    },
    {
      title: "Classic Arcade Engine",
      type: "Full Stack Game Platform",
      primaryTech: "React & Spring Boot",
      desc: "Interactive gaming Hub with bot intelligence, audio FX, REST state handling, and responsive views.",
      techStack: ["React.js", "Java", "Spring Boot", "REST APIs", "CSS3"],
      demoLink: "https://classic-arcade-frontend.vercel.app/",
      githubLink: "https://github.com/Zuwairiyamariyam/classic-arcade-frontend",
      status: "Completed",
      image: "/Games.png"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 font-sans pb-4 selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* Background Constellation Mesh */}
      <ConstellationCanvas />

      {/* Ambient Glow */}
      <div className="fixed top-10 right-10 w-[500px] h-[500px] bg-purple-600/20 blur-[140px] pointer-events-none z-0"></div>

      {/* Top Navbar */}
      <header className="relative sticky top-0 z-50 backdrop-blur-md bg-[#070913]/90 border-b border-purple-950/40">
        <nav className="w-full px-4 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
          <a href="#" className="text-sm sm:text-lg lg:text-2xl font-bold tracking-wider text-purple-400 font-mono flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            <span className="text-purple-400">&lt;/&gt;</span> Hi, I'm Zuwairiya Mariyam
          </a>

          {/* Right Corner Menu Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-purple-400 transition">About</a>
            <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
            <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
            <a href="#experience" className="hover:text-purple-400 transition">Experience</a>
            <a href="#contact" className="hover:text-purple-400 transition">Let's Talk</a>
          </div>

          {/* Mobile Menu Hamburger Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg bg-purple-950/50 border border-purple-800/40 text-purple-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu Drawer */}
{menuOpen && (
  <div className="md:hidden bg-[#0a0d1d]/95 border-b border-purple-900/50 backdrop-blur-xl px-6 py-4 space-y-3 font-mono text-sm">
    <a href="#about" onClick={() => setMenuOpen(false)} className="block text-slate-300 hover:text-purple-400 py-1.5 border-b border-purple-950/40">✦ About Me</a>
    <a href="#projects" onClick={() => setMenuOpen(false)} className="block text-slate-300 hover:text-purple-400 py-1.5 border-b border-purple-950/40">✦ Projects</a>
    <a href="#skills" onClick={() => setMenuOpen(false)} className="block text-slate-300 hover:text-purple-400 py-1.5 border-b border-purple-950/40">✦ Skills</a>
    <a href="#experience" onClick={() => setMenuOpen(false)} className="block text-slate-300 hover:text-purple-400 py-1.5 border-b border-purple-950/40">✦ Experience</a>
    <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-slate-300 hover:text-purple-400 py-1.5">✦ Let's Talk</a>
  </div>
)}
      </header>

      {/* Hero Section Container */}
      <div className="relative min-h-fit lg:min-h-[calc(100vh-80px)] flex flex-col justify-between">
        <main className="relative z-10 w-full max-w-[1520px] mx-auto px-5 sm:px-12 lg:px-16 pt-5 lg:pt-2 lg:my-auto">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-14 items-center">
            
            {/* Left Column: Software Developer */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left lg:pl-4">
              
              {/* AVAILABLE FOR FREELANCE BADGE */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/50 border border-purple-800/50 backdrop-blur-md shadow-sm mb-4 sm:mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-medium text-purple-200 tracking-wide">
                  Available for Freelance
                </span>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-tight">
                  Software Developer
                </h1>
                
                <div className="h-10 sm:h-16 flex items-center overflow-hidden pt-1">
                  <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300">
                    + {currentText}
                    <span className="inline-block w-1.5 sm:w-2 h-5 sm:h-8 lg:h-10 ml-2 bg-purple-400 animate-pulse align-middle"></span>
                  </h2>
                </div>
              </div>

              {/* Summary Content */}
              <p className="max-w-[675px] text-slate-400 text-sm sm:text-[16px] lg:text-[17.5px] leading-relaxed font-medium tracking-normal text-justify [text-align-last:left]">
                Passionate about turning ideas into clean, functional, and meaningful digital solutions through code, creativity and problem-solving. Learning, creating, and growing with every project.
              </p>

              {/* Action Buttons (Exact Same Size on Laptop, Full Width on Mobile) */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <a 
                  href="#projects" 
                  className="w-full sm:w-[205px] h-[48px] sm:h-[50px] flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm sm:text-base transition duration-200 shadow-lg shadow-purple-900/60"
                >
                  View My Projects
                </a>
                <a 
                  href="#contact" 
                  className="w-full sm:w-[205px] h-[48px] sm:h-[50px] flex items-center justify-center gap-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-purple-800/70 hover:border-purple-400 font-semibold text-sm sm:text-base transition duration-200"
                >
                  Download Resume ↓
                </a>
              </div>

              {/* Let's Connect + Social Icons */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs sm:text-sm font-mono font-medium text-slate-400">
                  Let's connect :
                </span>
                
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://www.linkedin.com/in/zuwairiya-mariyam-r-250b172a1/"
                    target="_blank"
                    rel="noreferrer"
                    title="LinkedIn"
                    className="p-2 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/50 hover:border-purple-400 text-purple-300 hover:text-white transition duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
                    </svg>
                  </a>

                  <a
                    href="https://github.com/Zuwairiyamariyam"
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub"
                    className="p-2 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/50 hover:border-purple-400 text-purple-300 hover:text-white transition duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>

                  <a
                    href="mailto:zuwairiyamariyam2305@gmail.com"
                    title="Send Email"
                    className="p-2 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/50 hover:border-purple-400 text-purple-300 hover:text-white transition duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Avatar with Responsive Scaled Orbit (Tight mobile fit, zero extra spacing) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end lg:pr-12 -my-14 sm:-my-6 lg:my-0 py-0 overflow-visible">
              <div className="orbit-container float-gentle transform scale-[0.65] sm:scale-85 lg:scale-100 origin-center lg:-translate-x-4">
                <div className="absolute inset-0 rounded-full bg-purple-600/25 blur-3xl pointer-events-none"></div>
                
                <div className="relative w-76 h-76 sm:w-88 sm:h-88 rounded-full p-2.5 bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-500 shadow-2xl shadow-purple-600/40 z-10">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#070913] border-4 border-[#070913]">
                    <img 
                      src="/Profile-zuwai.jpeg" 
                      alt="Zuwairiya Mariyam" 
                      style={{ transform: 'scale(1.14)', transformOrigin: 'center 45%' }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {clockTechs.map((tech, idx) => (
                  <div
                    key={idx}
                    title={tech.name}
                    className={`orbit-icon ${tech.posClass} z-20`}
                  >
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain pointer-events-none"
                    />
                  </div>
                ))}
              </div>
            </div>

          </section>
        </main>

        {/* ================= SLIM DIAGONAL DUAL TICKER ================= */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 -mt-6 lg:mt-auto -mb-6 h-14 sm:h-16 overflow-hidden pointer-events-none flex items-center justify-center">

          {/* BACKSIDE WHITE TICKER */}
          <div
            className="
              absolute
              w-[160vw]
              h-7 sm:h-8
              flex items-center
              bg-white
              border-y border-slate-200
              shadow-md
              z-10
              transform
              -rotate-[0.3deg]
              translate-y-[-1px]
            "
          >
            {/* Clean solid white accent line */}
          </div>

          {/* FRONT VIOLET TICKER */}
          <div
            className="
              absolute
              w-[160vw]
              h-7 sm:h-8
              flex items-center
              bg-gradient-to-r from-[#581c87] via-[#7c3aed] to-[#4c1d95]
              text-white
              border-y border-purple-400/60
              shadow-2xl
              z-20
              overflow-hidden
              transform
              rotate-[0.5deg]
            "
          >

            {/* MOVING CONTENT - 100% UNBROKEN INFINITE LOOP */}
            <div className="ticker-track flex items-center">

              {/* REPEATABLE SET 1 */}
              <div className="ticker-group flex items-center shrink-0">
                <span>✦ Database Management</span>
                <span className="ticker-star">✦</span>
                <span>REST API Developer</span>
                <span className="ticker-star">✦</span>
                <span>Scalable Solutions Builder</span>
                <span className="ticker-star">✦</span>
                <span>Creative Frontend Developer</span>
                <span className="ticker-star">✦</span>
                <span>Object Oriented Programming</span>
                <span className="ticker-star">✦</span>
                <span>Spring Boot & Hibernate</span>
                <span className="ticker-star">✦</span>
                <span>Java Backend Developer</span>
                <span className="ticker-star">✦</span>
              </div>

              {/* REPEATABLE SET 2 */}
              <div className="ticker-group flex items-center shrink-0">
                <span>✦ Database Management</span>
                <span className="ticker-star">✦</span>
                <span>REST API Developer</span>
                <span className="ticker-star">✦</span>
                <span>Scalable Solutions Builder</span>
                <span className="ticker-star">✦</span>
                <span>Creative Frontend Developer</span>
                <span className="ticker-star">✦</span>
                <span>Object Oriented Programming</span>
                <span className="ticker-star">✦</span>
                <span>Spring Boot & Hibernate</span>
                <span className="ticker-star">✦</span>
                <span>Java Backend Developer</span>
                <span className="ticker-star">✦</span>
              </div>

              {/* REPEATABLE SET 3 */}
              <div className="ticker-group flex items-center shrink-0">
                <span>✦ Database Management</span>
                <span className="ticker-star">✦</span>
                <span>REST API Developer</span>
                <span className="ticker-star">✦</span>
                <span>Scalable Solutions Builder</span>
                <span className="ticker-star">✦</span>
                <span>Creative Frontend Developer</span>
                <span className="ticker-star">✦</span>
                <span>Object Oriented Programming</span>
                <span className="ticker-star">✦</span>
                <span>Spring Boot & Hibernate</span>
                <span className="ticker-star">✦</span>
                <span>Java Backend Developer</span>
                <span className="ticker-star">✦</span>
              </div>

              {/* REPEATABLE SET 4 */}
              <div className="ticker-group flex items-center shrink-0">
                <span>✦ Database Management</span>
                <span className="ticker-star">✦</span>
                <span>REST API Developer</span>
                <span className="ticker-star">✦</span>
                <span>Scalable Solutions Builder</span>
                <span className="ticker-star">✦</span>
                <span>Creative Frontend Developer</span>
                <span className="ticker-star">✦</span>
                <span>Object Oriented Programming</span>
                <span className="ticker-star">✦</span>
                <span>Spring Boot & Hibernate</span>
                <span className="ticker-star">✦</span>
                <span>Java Backend Developer</span>
                <span className="ticker-star">✦</span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Main Content Sections (About, Skills, Experience, Projects, Contact) */}
      <main className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-16 space-y-28 sm:space-y-36 mt-14 sm:mt-16">
        
        {/* ================= ABOUT ME SECTION ================= */}
        <section id="about" className="scroll-mt-6 sm:scroll-mt-8 space-y-7">
          
          {/* Header Tag + Title */}
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-950/50 border border-purple-700/50 text-xs sm:text-sm font-mono font-medium text-purple-200 tracking-wide backdrop-blur-md shadow-sm">
              <span className="text-purple-400">✦</span> Who I Am
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Crafting digital experiences with passion &amp; precision
            </h2>
          </div>

          {/* 2-Column Responsive Layout (Same Bottom Height) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch pt-2">
            
            {/* Left Column: Summary Card */}
            <div className="lg:col-span-7 flex flex-col justify-center rounded-3xl p-7 sm:p-9 bg-[#0a0e1c]/70 border border-purple-900/40 backdrop-blur-md shadow-xl">
              <div className="space-y-5">
                <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-200">
                  Full Stack Developer
                </h3>
                
                <p className="text-slate-300 text-sm sm:text-[15.5px] lg:text-[16px] leading-[1.8] text-justify [text-align-last:left]">
                  I’m a Computer Science professional with a strong interest in building practical, user-focused software solutions. Through academic and personal projects, I’ve gained hands-on experience in turning ideas and requirements into functional applications while developing a strong foundation in software development.
                </p>

                <p className="text-slate-300 text-sm sm:text-[15.5px] lg:text-[16px] leading-[1.8] text-justify [text-align-last:left]">
                  I’m always interested in learning new things and improving my skills through hands-on experience. I’m currently seeking an entry-level Software Engineer / Junior Developer opportunity where I can contribute to meaningful projects, strengthen my skills, and grow as a developer while working with a collaborative team.
                </p>
              </div>

              {/* ================= MOBILE ONLY: BENTO GRID ================= */}
              <div className="lg:hidden mt-7 pt-6 border-t border-purple-900/60 space-y-3">
                
                {/* Bento Row 1: Status Pill (No Glowing Dot, Clean Status Icon) */}
                <div className="p-3.5 px-4 rounded-2xl bg-[#0e1329]/80 border border-purple-900/60 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400/80 block">Status</span>
                      <p className="text-xs font-bold text-white tracking-wide">Open to Work</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 font-medium">
                    Available
                  </span>
                </div>

                {/* Bento Row 2: 2 Interactive Action Cards (Phone & Email) */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Phone Action Card */}
                  <a 
                    href="tel:+917904269931" 
                    className="p-3 rounded-2xl bg-purple-950/40 border border-purple-900/50 hover:border-purple-600 transition flex flex-col justify-between space-y-2 group active:scale-95"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400/80 block">Phone</span>
                      <p className="text-xs font-semibold text-white group-hover:text-purple-300 transition truncate">
                        +91 7904269931
                      </p>
                    </div>
                  </a>

                  {/* Email Action Card */}
                  <a 
                    href="mailto:zuwairiyamariyam2305@gmail.com" 
                    className="p-3 rounded-2xl bg-purple-950/40 border border-purple-900/50 hover:border-purple-600 transition flex flex-col justify-between space-y-2 group active:scale-95"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400/80 block">Email</span>
                      <p className="text-xs font-semibold text-white group-hover:text-purple-300 transition truncate">
                        Send Mail ↗
                      </p>
                    </div>
                  </a>

                </div>

                {/* Bento Row 3: 2 Info Cards (Location & Languages) */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Location Card */}
                  <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-900/50 flex flex-col justify-between space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400/80 block">Location</span>
                      <p className="text-xs font-semibold text-white tracking-wide truncate">Chennai, TN</p>
                    </div>
                  </div>

                  {/* Languages Card */}
                  <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-900/50 flex flex-col justify-between space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"></path>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400/80 block">Languages</span>
                      <p className="text-xs font-semibold text-white tracking-wide truncate">Tamil, English</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Right Column: 6-Item Minimal Info Grid (100% UNTOUCHED ORIGINAL LAPTOP CODE) */}
            <div className="hidden lg:block lg:col-span-5 h-full">
              <div className="h-full rounded-3xl p-6 sm:p-7 bg-[#0a0e1c]/70 border border-purple-900/40 backdrop-blur-md shadow-xl flex flex-col justify-between">
                
                {/* 2-Column Grid for the 6 Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-5 gap-y-6 sm:gap-y-8 my-auto">
                  
                  {/* 1. Name */}
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/70 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition duration-200 shadow-sm shadow-purple-950/50">
                      <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400/80 block">Name</span>
                      <p className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                        Zuwairiya Mariyam R
                      </p>
                    </div>
                  </div>

                  {/* 2. Location */}
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/70 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition duration-200 shadow-sm shadow-purple-950/50">
                      <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400/80 block">Location</span>
                      <p className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                        Chennai, Tamil Nadu
                      </p>
                    </div>
                  </div>

                  {/* Divider Line 1 */}
                  <div className="hidden sm:block col-span-2 h-px bg-purple-950/60 -my-1"></div>

                  {/* 3. Phone */}
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/70 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition duration-200 shadow-sm shadow-purple-950/50">
                      <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400/80 block">Phone</span>
                      <a 
                        href="tel:+917904269931" 
                        className="text-xs sm:text-sm font-semibold text-white tracking-wide hover:text-purple-300 transition block whitespace-nowrap"
                      >
                        +91 7904269931
                      </a>
                    </div>
                  </div>

                  {/* 4. Email */}
                  <div className="flex items-center gap-3 group min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/70 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition duration-200 shadow-sm shadow-purple-950/50">
                      <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400/80 block">Email</span>
                      <a 
                        href="mailto:zuwairiyamariyam2305@gmail.com" 
                        className="text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold text-white tracking-tight block hover:text-purple-300 transition whitespace-nowrap"
                        title="zuwairiyamariyam2305@gmail.com"
                      >
                        zuwairiyamariyam2305@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Divider Line 2 */}
                  <div className="hidden sm:block col-span-2 h-px bg-purple-950/60 -my-1"></div>

                  {/* 5. Availability */}
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/70 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition duration-200 shadow-sm shadow-purple-950/50">
                      <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400/80 block">Availability</span>
                      <p className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                        Open to Work
                      </p>
                    </div>
                  </div>

                  {/* 6. Languages */}
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/70 border border-purple-800/60 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition duration-200 shadow-sm shadow-purple-950/50">
                      <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"></path>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400/80 block">Languages</span>
                      <p className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                        Tamil (Native), English
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ================= TECH STACK SECTION ================= */}
        <section id="skills" className="-mt-14 sm:-mt-18 scroll-mt-6 sm:scroll-mt-8 space-y-3">
          
          {/* Section Header (With Perfect Bottom Spacing) */}
          <div className="text-left mb-4 sm:mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/50 border border-purple-700/50 text-xs sm:text-sm font-mono font-medium text-purple-200 tracking-wide backdrop-blur-md shadow-sm">
              <span className="text-purple-400">⚡</span> Tech Stack
            </div>
          </div>

          {/* ================= 1. LAPTOP VIEW (15 ICONS DOCK ROW) ================= */}
          <div className="hidden lg:block">
            <div className="rounded-3xl p-6 bg-[#0a0e1c]/70 border border-purple-900/40 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between gap-3 overflow-x-auto py-1">
                
                {/* 1. Java (Official Original Icon) */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg p-2.5">
                    <img 
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
                      alt="Java" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">Java</span>
                </div>

                {/* 2. Spring Boot (Official Hexagonal Leaf Icon) */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg p-2.5">
                    <img 
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" 
                      alt="Spring Boot" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">Spring Boot</span>
                </div>

                {/* 3. Hibernate (Official Plain Icon) */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg p-2.5">
                    <img 
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-plain.svg" 
                      alt="Hibernate" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">Hibernate</span>
                </div>

                {/* 4. MySQL (Official Dolphin Icon) */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg p-2">
                    <img 
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" 
                      alt="MySQL" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">MySQL</span>
                </div>

                {/* 5. JDBC */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.8">
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">JDBC</span>
                </div>

                {/* 6. React.js */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.8">
                      <ellipse cx="12" cy="12" rx="10" ry="4.5"/>
                      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
                      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
                      <circle cx="12" cy="12" r="1.5" fill="#61DAFB"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">React.js</span>
                </div>

                {/* 7. JavaScript */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-[#F7DF1E]/10 border border-[#F7DF1E]/30 group-hover:border-[#F7DF1E]/70 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <div className="w-6 h-6 bg-[#F7DF1E] rounded text-black font-black text-xs flex items-end justify-end p-0.5 leading-none">
                      JS
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">JavaScript</span>
                </div>

                {/* 8. HTML5 */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#E34F26">
                      <path d="M4.1 2.5l1.4 15.6 6.5 1.8 6.5-1.8 1.4-15.6H4.1zm12.3 4.3l-.2 2.2H9.8l.2 2.2h6l-.6 6.3-3.4 1-3.4-1-.2-2.8H10l.1 1.4 1.9.5 1.9-.5.2-2.3H7.8l-.5-6.8h9.1z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">HTML5</span>
                </div>

                {/* 9. CSS3 */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#1572B6">
                      <path d="M4.1 2.5l1.4 15.6 6.5 1.8 6.5-1.8 1.4-15.6H4.1zm11.7 4.3l-.2 2.2H8.2l.2 2.2h7.2l-.6 6.3-3 1-3-1-.2-2.8H7.4l.1 1.4 2.5.7 2.5-.7.2-2.3H8.8l-.4-4.6h7.4l.2-2.2H6.6l-.4-4.3h9.8z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">CSS3</span>
                </div>

                {/* 10. Bootstrap */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <div className="w-7 h-7 rounded-lg bg-[#7952B3] text-white font-black text-base flex items-center justify-center">
                      B
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">Bootstrap</span>
                </div>

                {/* 11. Postman */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#FF6C37">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M12 6.5c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.5-5.5-5.5zm1.5 8.5h-3v-1.5h3v1.5zm0-3h-3V8h3V12z" fill="#070913"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">Postman</span>
                </div>

                {/* 12. IntelliJ */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-pink-500/20 via-purple-600/20 to-blue-500/20 border border-purple-700/40 group-hover:border-purple-400/70 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-[10px] font-black text-white">
                      IJ
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">IntelliJ</span>
                </div>

                {/* 13. Eclipse */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" fill="#F7941E"/>
                      <circle cx="10" cy="12" r="9" fill="#2C2255"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">Eclipse</span>
                </div>

                {/* 14. Figma */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-purple-950/40 border border-purple-900/50 group-hover:border-purple-500/60 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <rect x="6" y="3" width="6" height="6" rx="3" fill="#F24E1E"/>
                      <rect x="12" y="3" width="6" height="6" rx="3" fill="#FF7262"/>
                      <rect x="6" y="9" width="6" height="6" rx="3" fill="#A259FF"/>
                      <circle cx="15" cy="12" r="3" fill="#1ABCFE"/>
                      <path d="M6 15h3a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3 3 3 0 0 1-3-3v-3z" fill="#0ACF83"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">Figma</span>
                </div>

                {/* 15. Excel */}
                <div className="flex flex-col items-center gap-2 group min-w-[65px]">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 group-hover:border-emerald-500/70 flex items-center justify-center transition duration-300 group-hover:scale-110 shadow-lg">
                    <div className="w-6 h-6 bg-[#107C41] rounded flex items-center justify-center text-white font-black text-[11px]">
                      X
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white transition">Excel</span>
                </div>

              </div>
            </div>
          </div>

          {/* ================= 2. PHONE VIEW (4 ORGANIZED ROWS) ================= */}
          <div className="lg:hidden space-y-3">
            
            {/* ROW 1: FRONTEND */}
            <div className="rounded-2xl p-4 bg-[#0a0e1c]/70 border border-purple-900/40 backdrop-blur-md shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-purple-300">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-white">Frontend</h4>
              </div>
              <div className="grid grid-cols-5 gap-2 pt-1">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.8">
                    <ellipse cx="12" cy="12" rx="10" ry="4.5"/>
                    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
                    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
                    <circle cx="12" cy="12" r="1.5" fill="#61DAFB"/>
                  </svg>
                  <span className="text-[9.5px] font-mono text-slate-300 truncate">React.js</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <div className="w-5 h-5 bg-[#F7DF1E] rounded text-black font-black text-[10px] flex items-end justify-end p-0.5 leading-none">JS</div>
                  <span className="text-[9.5px] font-mono text-slate-300 truncate">JavaScript</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E34F26">
                    <path d="M4.1 2.5l1.4 15.6 6.5 1.8 6.5-1.8 1.4-15.6H4.1zm12.3 4.3l-.2 2.2H9.8l.2 2.2h6l-.6 6.3-3.4 1-3.4-1-.2-2.8H10l.1 1.4 1.9.5 1.9-.5.2-2.3H7.8l-.5-6.8h9.1z"/>
                  </svg>
                  <span className="text-[9.5px] font-mono text-slate-300 truncate">HTML5</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1572B6">
                    <path d="M4.1 2.5l1.4 15.6 6.5 1.8 6.5-1.8 1.4-15.6H4.1zm11.7 4.3l-.2 2.2H8.2l.2 2.2h7.2l-.6 6.3-3 1-3-1-.2-2.8H7.4l.1 1.4 2.5.7 2.5-.7.2-2.3H8.8l-.4-4.6h7.4l.2-2.2H6.6l-.4-4.3h9.8z"/>
                  </svg>
                  <span className="text-[9.5px] font-mono text-slate-300 truncate">CSS3</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <div className="w-5 h-5 rounded bg-[#7952B3] text-white font-black text-[11px] flex items-center justify-center">B</div>
                  <span className="text-[9.5px] font-mono text-slate-300 truncate">Bootstrap</span>
                </div>
              </div>
            </div>

            {/* ROW 2: BACKEND */}
            <div className="rounded-2xl p-4 bg-[#0a0e1c]/70 border border-purple-900/40 backdrop-blur-md shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-purple-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-white">Backend</h4>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {/* Java */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
                    alt="Java" 
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-[10px] font-mono text-slate-300 truncate">Java</span>
                </div>

                {/* Spring Boot */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" 
                    alt="Spring Boot" 
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-[10px] font-mono text-slate-300 truncate">Spring Boot</span>
                </div>

                {/* Hibernate */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-plain.svg" 
                    alt="Hibernate" 
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-[10px] font-mono text-slate-300 truncate">Hibernate</span>
                </div>
              </div>
            </div>

            {/* ROW 3: DATABASE */}
            <div className="rounded-2xl p-4 bg-[#0a0e1c]/70 border border-purple-900/40 backdrop-blur-md shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-purple-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-white">Database</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* MySQL */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" 
                    alt="MySQL" 
                    className="w-6 h-6 object-contain shrink-0"
                  />
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">MySQL</span>
                    <span className="text-[9.5px] font-mono text-purple-400/80">RDBMS &amp; SQL</span>
                  </div>
                </div>

                {/* JDBC */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.8">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">JDBC</span>
                    <span className="text-[9.5px] font-mono text-purple-400/80">DB Connectivity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 4: TOOLS & IDE */}
            <div className="rounded-2xl p-4 bg-[#0a0e1c]/70 border border-purple-900/40 backdrop-blur-md shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-purple-300">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400"></span>
                <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-white">Tools &amp; IDE</h4>
              </div>
              <div className="grid grid-cols-5 gap-2 pt-1">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF6C37">
                    <circle cx="12" cy="12" r="9"/>
                  </svg>
                  <span className="text-[9px] font-mono text-slate-300 truncate">Postman</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <div className="w-5 h-5 bg-black rounded text-[9px] font-black text-white flex items-center justify-center">IJ</div>
                  <span className="text-[9px] font-mono text-slate-300 truncate">IntelliJ</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" fill="#F7941E"/>
                    <circle cx="10" cy="12" r="8" fill="#2C2255"/>
                  </svg>
                  <span className="text-[9px] font-mono text-slate-300 truncate">Eclipse</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect x="6" y="3" width="6" height="6" rx="3" fill="#F24E1E"/>
                    <rect x="12" y="3" width="6" height="6" rx="3" fill="#FF7262"/>
                    <rect x="6" y="9" width="6" height="6" rx="3" fill="#A259FF"/>
                    <circle cx="15" cy="12" r="3" fill="#1ABCFE"/>
                  </svg>
                  <span className="text-[9px] font-mono text-slate-300 truncate">Figma</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                  <div className="w-5 h-5 bg-[#107C41] rounded text-[9px] font-black text-white flex items-center justify-center">X</div>
                  <span className="text-[9px] font-mono text-slate-300 truncate">Excel</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ================= PROJECTS SECTION ================= */}
<section id="projects" className="-mt-14 sm:-mt-18 scroll-mt-6 sm:scroll-mt-8 space-y-6">
  
  {/* Header Row: Tag + Title on Left, "View All Projects →" on Right */}
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left border-b border-purple-900/30 pb-4">
    <div className="space-y-3.5 sm:space-y-4">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/50 border border-purple-700/50 text-xs sm:text-sm font-mono font-medium text-purple-200 tracking-wide backdrop-blur-md shadow-sm">
        <span className="text-purple-400">✦</span> Featured Projects
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
        Some Things I've Built
      </h2>
    </div>

    {/* View All Projects Action Link */}
    <a
      href="https://github.com/Zuwairiyamariyam"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-medium text-purple-300 hover:text-white transition group/all w-fit"
    >
      <span>View All Projects</span>
      <span className="transform group-hover/all:translate-x-1 transition duration-200">→</span>
    </a>
  </div>

  {/* 4-Column Single Row Dock Layout */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 pt-1 items-stretch">
    {projectsData.map((project, idx) => (
      <div
        key={idx}
        className="group rounded-2xl bg-[#0a0e1c]/80 border border-purple-900/40 hover:border-purple-500/50 backdrop-blur-md overflow-hidden flex flex-col justify-between transition-colors duration-200 h-full"
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1">
          {/* Card Top Window Bar + Preview Image */}
          <div className="relative w-full h-36 overflow-hidden border-b border-purple-900/40 bg-[#070913]/90 flex items-center justify-center shrink-0">
            {project.image ? (
              <>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1c] via-transparent to-black/35 pointer-events-none" />
              </>
            ) : (
              <span className="px-3 py-1 rounded-full text-[11px] font-mono text-purple-300 border border-purple-800/40 bg-purple-950/40">
                {project.type}
              </span>
            )}
          </div>

          {/* Card Content */}
          <div className="p-4 space-y-3 flex flex-col flex-1 justify-between">
            <div className="space-y-2">
              {/* Title + Primary Tech */}
              <div className="flex items-start justify-between gap-1.5">
                <h3 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-purple-300 transition truncate" title={project.title}>
                  {project.title}
                </h3>
                <span className="shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-950/70 border border-indigo-700/50 text-indigo-200">
                  {project.primaryTech}
                </span>
              </div>

              {/* 2-Line Summary */}
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {project.desc}
              </p>
            </div>

            {/* Compact Tech Tags */}
            <div className="flex flex-wrap gap-1 pt-1 min-h-[38px] items-center">
              {project.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-purple-950/40 border border-purple-900/40 text-purple-300/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Live Demo + GitHub */}
        <div className="px-4 py-3 border-t border-purple-900/40 bg-purple-950/20 flex items-center justify-between mt-auto">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-purple-300 hover:text-white transition"
          >
            Live Demo →
          </a>

          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub repo for ${project.title}`}
            className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-800/50 hover:border-purple-400 text-slate-300 hover:text-white flex items-center justify-center transition shadow-sm"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    ))}
  </div>

</section>

        {/* ================= EXPERIENCE & EDUCATION SECTION ================= */}
        <section id="experience" className="-mt-13 sm:-mt-17 scroll-mt-6 sm:scroll-mt-8 space-y-8">
          
          {/* Section Header (100% Left Aligned) */}
          <div className="space-y-3.5 sm:space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/50 border border-purple-700/50 text-xs sm:text-sm font-mono font-medium text-purple-200 tracking-wide backdrop-blur-md shadow-sm">
              <span className="text-purple-400">✦</span> Career &amp; Academic Journey
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Experience &amp; Education
            </h2>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pt-1">
            
            {/* ================= LEFT COLUMN: EXPERIENCE ================= */}
            <div className="space-y-4">
              
              {/* Category Sub-Header */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-purple-900/30">
                <div className="w-8 h-8 rounded-xl bg-purple-950/70 border border-purple-800/60 text-purple-300 flex items-center justify-center">
                  <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  Internship Experience
                </h3>
              </div>

              {/* Experience Boxes List (Removed Internship Box Tag) */}
              <div className="space-y-3.5 pt-1">
                {experienceData.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0a0e1c]/75 border border-purple-900/40 hover:border-purple-600/50 backdrop-blur-md transition-colors duration-200 flex flex-col justify-between gap-3"
                  >
                    {/* Top Row: Role Title & Right-Corner Timeline Badge */}
                    <div className="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
                      <div>
                        <h4 className="text-base sm:text-[17px] font-bold text-white tracking-tight">
                          {exp.role}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-purple-400 mt-0.5">
                          {exp.company}
                        </p>
                      </div>

                      {/* Right Timeline Period Badge */}
                      <span className="shrink-0 text-[11px] font-mono text-purple-200 bg-purple-950/70 border border-purple-800/50 px-2.5 py-1 rounded-lg">
                        {exp.period}
                      </span>
                    </div>

                    {/* Bottom Row: Pure Clean Location Only */}
                    <div className="pt-2 border-t border-purple-900/30 flex items-center text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 truncate">
                        <svg className="w-3.5 h-3.5 text-purple-400/80 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {exp.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* ================= RIGHT COLUMN: EDUCATION ================= */}
<div className="space-y-4">
  
  {/* Category Sub-Header */}
  <div className="flex items-center gap-2.5 pb-2 border-b border-purple-900/30">
    <div className="w-8 h-8 rounded-xl bg-purple-950/70 border border-purple-800/60 text-indigo-300 flex items-center justify-center">
      <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
      Academic Background
    </h3>
  </div>

  {/* Education Boxes List */}
  <div className="space-y-3.5 pt-1">
    {educationData.map((edu, idx) => (
      <div
        key={idx}
        className="p-4 sm:p-5 rounded-2xl bg-[#0a0e1c]/75 border border-purple-900/40 hover:border-indigo-600/50 backdrop-blur-md transition-colors duration-200 flex flex-col justify-between gap-3"
      >
        {/* Top Row: Degree Title & Right-Corner Timeline Badge */}
        <div className="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
          <div>
            <h4 className="text-base sm:text-[17px] font-bold text-white tracking-tight">
              {edu.degree}
            </h4>
            <p className="text-xs sm:text-sm font-medium text-indigo-400 mt-0.5">
              {edu.institution}
            </p>
          </div>

          {/* Right Timeline Period Badge */}
          <span className="shrink-0 text-[11px] font-mono text-indigo-200 bg-indigo-950/70 border border-indigo-800/50 px-2.5 py-1 rounded-lg">
            {edu.period}
          </span>
        </div>

        {/* Bottom Row: Location & Score Pill (Laptop-la hide aagum) */}
        <div className="pt-2 border-t border-purple-900/30 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 truncate">
            <svg className="w-3.5 h-3.5 text-indigo-400/80 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {edu.location}
          </span>

          {/* `lg:hidden` potadhum: Phone-la mattum display aagum, laptop-la hide aaidum */}
          <span className="lg:hidden text-[11px] font-mono font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-2.5 py-0.5 rounded-full">
            {edu.scoreBadge}
          </span>
        </div>
      </div>
    ))}
  </div>

</div>

            </div>

        </section>

        {/* ================= CONTACT & REACH OUT SECTION ================= */}
        <section id="contact" className="-mt-14 sm:-mt-20 scroll-mt-6 sm:scroll-mt-8 border-t border-purple-900/30 pt-10 sm:pt-14">
          
          {/* Top Row: Left Tag & Mobile-Only "Do Visit" Socials (PHONE VIEW UNTOUCHED) */}
          <div className="flex items-center justify-between gap-4 flex-wrap pb-4">
            
            {/* Left Corner Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/50 border border-purple-700/50 text-xs sm:text-sm font-mono font-medium text-purple-200 tracking-wide backdrop-blur-md shadow-sm">
              <span className="text-purple-400">✦</span> Let's Talk
            </div>

            {/* Right Corner: "Do Visit" Text + Socials (PHONE VIEW ONLY - 100% UNTOUCHED) */}
            <div className="flex lg:hidden items-center gap-3">
              <span className="text-xs sm:text-sm font-mono text-slate-400 font-medium tracking-wide">
                Do Visit
              </span>
              <div className="flex items-center gap-2">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/zuwairiya-mariyam-r-250b172a1/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-400 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Zuwairiyamariyam"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-400 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Main Grid: Left Content + Right Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-2">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-between text-left space-y-4 lg:space-y-0">
              
              {/* Heading & Summary */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Ready to Build Something Meaningful?
                </h2>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl text-justify sm:text-left">
                  Have an open opportunity, a product in mind, or looking for a dedicated backend &amp; full-stack engineer? My inbox is always accessible.
                </p>

                {/* Hire Me Button (PHONE VIEW ONLY - 100% UNTOUCHED) */}
                <div className="pt-2 block lg:hidden">
                  <a
                    href="mailto:zuwairiyamariyam2305@gmail.com?subject=Job%20Opportunity%20/%20Project%20Collaboration"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-950/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Hire Me</span>
                    <span className="text-purple-200">→</span>
                  </a>
                </div>
              </div>

              {/* LAPTOP ONLY: "Do Visit" + Socials below summary */}
              <div className="hidden lg:flex items-center gap-3 pt-6">
                <span className="text-xs sm:text-sm font-mono text-slate-400 font-medium tracking-wide">
                  Do Visit :
                </span>
                <div className="flex items-center gap-2.5">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/zuwairiya-mariyam-r-250b172a1/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-400 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/Zuwairiyamariyam"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-400 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Form: LAPTOP VIEW ONLY with SUBTLE COSMIC AURA GLOW */}
            <div className="hidden lg:block lg:col-span-6 relative">
              
              {/* ✨ Subtle Soft Glow (Reduced intensity & soft blur) */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-indigo-500/15 to-purple-800/20 rounded-3xl blur-xl opacity-35 pointer-events-none"></div>

              {/* Form Container */}
              <form 
                onSubmit={handleFormSubmit}
                className="relative p-6 rounded-3xl bg-[#0a0e1c]/85 border border-purple-800/40 hover:border-purple-600/50 backdrop-blur-2xl shadow-xl space-y-4 text-left h-full flex flex-col justify-between transition-colors duration-300"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-purple-300 tracking-wider uppercase block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Recruiter / Collab"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070913]/90 border border-purple-900/50 focus:border-purple-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-purple-300 tracking-wider uppercase block">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070913]/90 border border-purple-900/50 focus:border-purple-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-purple-300 tracking-wider uppercase block">
                      Message
                    </label>
                    <textarea
                      rows="3"
                      name="message"
                      required
                      placeholder="Share details about the role or project."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070913]/90 border border-purple-900/50 focus:border-purple-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Send Button & Live Status */}
                <div className="space-y-2 mt-2">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:opacity-60 text-white font-mono font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-950/60 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>
                      {formStatus === 'submitting' ? 'Sending Message' : 'Send Message'}
                    </span>
                    <span className="text-purple-200">↗</span>
                  </button>

                  {/* Success Feedback */}
                  {formStatus === 'success' && (
                    <p className="text-xs font-mono text-emerald-400 text-center tracking-wide">
                      ✦ Message sent! I'll get back to you soon.
                    </p>
                  )}

                  {/* Error Feedback */}
                  {formStatus === 'error' && (
                    <p className="text-xs font-mono text-rose-400 text-center tracking-wide">
                      Failed to send. Please reach via direct mail.
                    </p>
                  )}
                </div>
              </form>
              </div>

          </div>

        </section>
        </main>

        {/* ================= MINIMAL BOTTOM FOOTER ================= */}
<footer className="mt-10 sm:mt-14 border-t border-purple-900/30 pt-6 pb-2 sm:pb-3 flex flex-col items-center justify-center gap-1 text-[9.5px] sm:text-[11px] font-mono text-slate-400 text-center px-4">
  <p>© 2026 Zuwairiya Mariyam. All rights reserved.</p>
  <p className="text-purple-400/75 tracking-tight">Crafted with ideas, creativity and dedication.</p>
</footer>
    </div>
  );
}