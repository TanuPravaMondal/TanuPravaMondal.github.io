import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  ExternalLink, 
  Code, 
  Cpu, 
  Microscope, 
  Award, 
  BookOpen, 
  Menu, 
  X,
  Zap,
  Layers,
  Globe,
  Database,
  Atom, 
  GraduationCap,
  Fingerprint,
  BarChart, 
  Aperture,
  Sun,
  Moon
} from 'lucide-react';

// --- Components ---

const Section = ({ id, className, children, darkMode }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 transition-colors duration-300 ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({ children, icon: Icon, darkMode }) => (
  <div className="flex items-center gap-3 mb-12">
    {Icon && <Icon className="w-8 h-8 text-blue-500" />}
    <h2 className={`text-3xl md:text-4xl font-bold relative transition-colors duration-300 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      {children}
      <span className="absolute -bottom-3 left-0 w-24 h-1 bg-blue-600 rounded-full"></span>
    </h2>
  </div>
);

const Card = ({ children, className, darkMode }) => (
  <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
    darkMode 
      ? 'bg-[#0f172a]/80 border-slate-700/50 hover:border-blue-500/50 hover:shadow-blue-900/20' 
      : 'bg-white/80 border-slate-200 hover:border-blue-400/50 hover:shadow-blue-200/50'
  } ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue", darkMode }) => {
  const colors = {
    blue: darkMode 
      ? "bg-blue-900/40 text-blue-200 border-blue-700/50" 
      : "bg-blue-100 text-blue-800 border-blue-200",
    white: darkMode 
      ? "bg-slate-800 text-slate-200 border-slate-600" 
      : "bg-slate-100 text-slate-700 border-slate-300",
    indigo: darkMode 
      ? "bg-indigo-900/40 text-indigo-200 border-indigo-700/50" 
      : "bg-indigo-100 text-indigo-800 border-indigo-200",
    cyan: darkMode 
      ? "bg-cyan-900/40 text-cyan-200 border-cyan-700/50" 
      : "bg-cyan-100 text-cyan-800 border-cyan-200",
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

// --- Canvas Animation Component (CERN / Particle Theme) ---
const HeroCanvas = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        
        // Color logic based on theme
        if (darkMode) {
           // Dark Mode: White and Blue
           this.hue = Math.random() > 0.8 ? 0 : 220; 
           this.sat = this.hue === 0 ? '0%' : '100%';
           this.light = this.hue === 0 ? '100%' : '60%';
        } else {
           // Light Mode: Dark Grey and Blue
           this.hue = Math.random() > 0.8 ? 220 : 220; 
           this.sat = '100%';
           this.light = Math.random() > 0.5 ? '40%' : '30%'; 
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.sat}, ${this.light}, ${this.alpha})`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = Array.from({ length: 100 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            const opacity = 0.12 * (1 - dist / 120);
            if (darkMode) {
                ctx.strokeStyle = `hsla(220, 100%, 70%, ${opacity})`;
            } else {
                ctx.strokeStyle = `hsla(220, 80%, 40%, ${opacity})`;
            }
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]); // Re-run when darkMode changes

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" />;
};

// --- Main App Component ---

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(true);

  // Navigation Links
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Publications', href: '#publications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Honors', href: '#honors' },
  ];

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Base styles based on theme
  const bgClass = darkMode ? "bg-[#020617]" : "bg-slate-50";
  const textClass = darkMode ? "text-slate-300" : "text-slate-600";
  const navBgClass = darkMode ? "bg-[#020617]/90 border-slate-800" : "bg-white/90 border-slate-200";
  const headingClass = darkMode ? "text-white" : "text-slate-900";
  const subTextClass = darkMode ? "text-slate-400" : "text-slate-600";
  
  return (
    <div className={`min-h-screen ${bgClass} ${textClass} font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300`}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${navBgClass}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className={`text-2xl font-bold flex items-center gap-2 ${headingClass}`}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="font-bold text-white">TM</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  activeSection === link.href.substring(1) ? 'text-blue-500' : subTextClass
                }`}
              >
                {link.name}
              </a>
            ))}
            
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                title="Toggle Theme"
            >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a 
              href="mailto:tanupravamondal@gmail.com"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
            >
              Contact Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${darkMode ? 'text-yellow-400' : 'text-slate-600'}`}
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
                className={`${darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 w-full border-b p-6 flex flex-col gap-4 shadow-xl ${darkMode ? 'bg-[#020617] border-slate-800' : 'bg-white border-slate-200'}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-lg font-medium hover:text-blue-500 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-gradient-to-b ${darkMode ? 'from-[#020617] via-[#0f172a] to-[#020617]' : 'from-slate-50 via-white to-slate-50'}`}>
        <HeroCanvas darkMode={darkMode} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm max-w-full ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
              <Atom size={16} className="text-blue-500 flex-shrink-0" />
              <span className={`font-medium text-sm tracking-wide truncate ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>Erasmus Mundus Scholar · Intelligent Photonics</span>
            </div>
          </div>

          <h1 className={`text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight ${headingClass}`}>
            Tanu Prava <span className="text-blue-600">Mondal</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed ${subTextClass}`}>
            Photonics &amp; AI Researcher. <span className="text-blue-500 font-medium">From computational design to the optical lab.</span>
            <span className={`block mt-4 text-lg md:text-xl ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              Working across <span className="text-blue-500 font-medium">plasmonic &amp; photonic biosensors</span>, <span className="text-blue-500 font-medium">thin-film optimization</span>, <span className="text-blue-500 font-medium">laser–matter interaction</span>, <span className="text-blue-500 font-medium">color centers in diamond</span> and <span className="text-blue-500 font-medium">intelligent optical sensing</span>.
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://scholar.google.com/citations?user=A4lxmS8AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded font-medium transition-all border flex items-center gap-2 ${darkMode ? 'bg-[#1e293b] hover:bg-[#334155] text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'}`}>
              <GraduationCap size={18} />
              Google Scholar
            </a>
            <a href="https://www.researchgate.net/profile/Tanu-Mondal" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded font-medium transition-all border flex items-center gap-2 ${darkMode ? 'bg-[#1e293b] hover:bg-[#334155] text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'}`}>
              <Microscope size={18} />
              ResearchGate
            </a>
            <a href="https://orcid.org/0009-0003-9324-8864" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded font-medium transition-all border flex items-center gap-2 ${darkMode ? 'bg-[#1e293b] hover:bg-[#334155] text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'}`}>
              <Fingerprint size={18} />
              ORCID
            </a>
            <a href="https://www.linkedin.com/in/tanu-prava-mondal-28124a200/" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded font-medium transition-all border flex items-center gap-2 ${darkMode ? 'bg-[#1e293b] hover:bg-[#334155] text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'}`}>
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>

          <div className={`mt-16 grid grid-cols-3 max-w-xl mx-auto border-t pt-8 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
             <div className="flex flex-col items-center">
                <span className={`text-3xl font-bold ${headingClass}`}>9</span>
                <span className="text-xs uppercase tracking-widest text-slate-500 mt-1 text-center">Peer-reviewed papers</span>
             </div>
             <div className={`flex flex-col items-center border-l ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`text-3xl font-bold ${headingClass}`}>190+</span>
                <span className="text-xs uppercase tracking-widest text-slate-500 mt-1">Citations</span>
             </div>
             <div className={`flex flex-col items-center border-l ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`text-3xl font-bold ${headingClass}`}>3</span>
                <span className="text-xs uppercase tracking-widest text-slate-500 mt-1 text-center">Countries of research</span>
             </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className={darkMode ? 'bg-[#0b1120]' : 'bg-slate-50'} darkMode={darkMode}>
        <div className="max-w-4xl mx-auto">
          <SectionTitle icon={FileText} darkMode={darkMode}>About Me</SectionTitle>
          <div className="grid md:grid-cols-3 gap-12">
            <div className={`md:col-span-2 space-y-6 text-lg leading-relaxed md:text-justify ${subTextClass}`}>
              <p>
                I am a photonics researcher and Erasmus Mundus scholar in the Joint Master in Intelligent Photonics (iPSRS), studying at Université Jean Monnet (Saint-Étienne, France) and the University of Eastern Finland (Joensuu, Finland).
              </p>
              <p>
                My expertise lies at the intersection of <strong className="text-blue-500">Photonics</strong> and <strong className="text-blue-500">Artificial Intelligence</strong>. At AUST I designed multilayer SPR and photonic-crystal-fiber biosensors (Ag, TiO₂, 2D materials) with COMSOL, MATLAB and a Differential Evolution optimizer, contributing to 8 peer-reviewed papers. At UEF I characterized laser-induced activation of NV and SiV color centers in diamond needles using confocal Raman and photoluminescence mapping. Now, in a COIL industry project with TOPPAN Security, I am developing laser-printing workflows at 1064 nm and 532 nm.
              </p>
              <div>
                <p className={`text-base font-semibold mb-3 ${headingClass}`}>Research interests</p>
                <div className="flex flex-wrap gap-2">
                  {['Plasmonic & photonic biosensors', 'Thin-film & nanophotonic design', 'Optimization & AI for photonics', 'Laser–matter interaction & laser processing', 'Color centers & quantum emitters', 'Spectroscopy & optical characterization', 'Optical imaging & computer vision'].map((topic) => (
                    <Badge key={topic} color="blue" darkMode={darkMode}>{topic}</Badge>
                  ))}
                </div>
              </div>
              <p className={`border-l-4 border-blue-600 pl-4 italic py-2 pr-2 ${darkMode ? 'text-slate-300 bg-blue-900/10' : 'text-slate-700 bg-blue-50'}`}>
                "I am seeking PhD opportunities and research internships in experimental and computational photonics, from biosensing and thin-film design to laser processing, quantum emitters and intelligent optical systems."
              </p>
            </div>
            <div className="space-y-4">
              <Card className={darkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} darkMode={darkMode}>
                <h3 className={`font-semibold mb-4 flex items-center gap-2 ${headingClass}`}>
                  <Globe size={18} className="text-blue-500" />
                  Languages
                </h3>
                <ul className={`space-y-3 text-sm ${subTextClass}`}>
                  {[['Bengali', 'Native'], ['English', 'Fluent'], ['Hindi', 'Fluent'], ['French', 'A1']].map(([lang, level]) => (
                    <li key={lang} className={`flex justify-between border-b pb-2 ${darkMode ? 'border-slate-700/50' : 'border-slate-100'}`}><span>{lang}</span> <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{level}</span></li>
                  ))}
                </ul>
              </Card>
              <Card className={darkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} darkMode={darkMode}>
                <h3 className={`font-semibold mb-4 flex items-center gap-2 ${headingClass}`}>
                  <Award size={18} className="text-blue-500" />
                  Scores
                </h3>
                <div className="space-y-3">
                  {[['GRE', '329/340'], ['TOEFL iBT', '105/120']].map(([test, score]) => (
                    <div key={test} className="flex justify-between items-center">
                      <span className={`text-sm ${subTextClass}`}>{test}</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold border ${darkMode ? 'bg-blue-900/50 text-blue-200 border-blue-800' : 'bg-blue-50 text-blue-800 border-blue-200'}`}>{score}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Education & Experience */}
      <Section id="experience" className={darkMode ? '' : 'bg-slate-50'} darkMode={darkMode}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Layers} darkMode={darkMode}>Experience & Education</SectionTitle>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Education Column */}
            <div>
              <h3 className={`text-2xl font-bold mb-8 flex items-center gap-2 border-b pb-4 ${darkMode ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'}`}>
                <BookOpen className="text-blue-500" /> Education
              </h3>
              <div className={`relative border-l ml-3 space-y-12 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                {[
                  {
                    date: '2025 – 2027 (expected)',
                    title: 'Erasmus Mundus Joint Master in Intelligent Photonics (iPSRS)',
                    place: 'Full scholarship · ranked 27th of 217 applicants',
                    details: [
                      'Université Jean Monnet, Saint-Étienne, France (Sep 2025 – Jan 2026; Sep 2026 – present): MSc in Optics, Image, Vision, Multimedia, specialization Photonics & AI. GPA 13.95/20 (rank 6/21).',
                      'University of Eastern Finland, Joensuu, Finland (Jan 2026 – May 2026): MSc in Photonics. GPA 4.25/5.',
                      'Coursework in Digital Holography, Laser Physics and Light-Matter Interaction.',
                    ],
                    current: true,
                  },
                  {
                    date: 'Dec 2020 – Jan 2025',
                    title: 'B.Sc. Electrical & Electronic Engineering',
                    place: 'Ahsanullah University of Science and Technology, Dhaka',
                    details: [
                      'CGPA 3.64/4.00 (rank 11/148).',
                      'Thesis: "Surface Plasmon Resonance-Based Biosensor", supervised by Dr. Russel Reza Mahmud.',
                    ],
                  },
                ].map((ed) => (
                  <div key={ed.title} className="relative pl-8">
                    <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ${ed.current ? (darkMode ? 'bg-blue-500 ring-[#020617]' : 'bg-blue-600 ring-slate-50') : (darkMode ? 'bg-slate-600 ring-[#020617]' : 'bg-slate-400 ring-slate-50')}`}></div>
                    <span className={`text-xs font-bold tracking-wider uppercase ${ed.current ? 'text-blue-500' : 'text-slate-500'}`}>{ed.date}</span>
                    <h4 className={`text-xl font-bold mt-2 ${headingClass}`}>{ed.title}</h4>
                    <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>{ed.place}</p>
                    <ul className={`mt-3 space-y-2 text-sm list-disc pl-4 marker:text-blue-600 ${subTextClass}`}>
                      {ed.details.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Column */}
            <div>
              <h3 className={`text-2xl font-bold mb-8 flex items-center gap-2 border-b pb-4 ${darkMode ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'}`}>
                <Microscope className="text-blue-500" /> Experience
              </h3>
              <div className={`relative border-l ml-3 space-y-12 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                {[
                  {
                    date: 'Jun 2026 – Aug 2026',
                    title: 'Research Assistant',
                    place: 'Nanomaterials for THz and Biophotonics Group, University of Eastern Finland',
                    supervisor: 'Supervisor: Dr. Sergei Malykhin',
                    points: [
                      'Characterized laser-induced activation of NV⁰, NV⁻ and SiV⁻ color centers in single-crystal diamond needles with confocal micro-Raman and PL mapping (WITec), including depth-resolved Z-plane profiling.',
                      'Observed laser-power- and growth-dependent activation halos consistent with vacancy migration; identified a narrow power window that enhances NV⁰/NV⁻ emission.',
                      'Ran a preliminary e-beam irradiation study (Hitachi SU3900 SEM); assisted with CVD growth and selective-oxidation sample preparation.',
                      'First-author poster at NTB-Photonics 2026; manuscript in preparation.',
                    ],
                    current: true,
                  },
                  {
                    date: 'Feb 2025 – Oct 2025',
                    title: 'Research Assistant & Trainer',
                    place: 'Department of EEE, Ahsanullah University of Science and Technology',
                    supervisor: 'Supervisor: Dr. Russel Reza Mahmud',
                    points: [
                      'Designed multilayer SPR and photonic-crystal-fiber biosensors (Ag/TiO₂, 2D materials) for tuberculosis, dengue, malaria and cancer-cell detection using TMM and FEM (COMSOL, MATLAB).',
                      'Co-developed a Differential Evolution optimizer that automates multilayer geometry design.',
                      'Contributed to 8 peer-reviewed papers, including a first-author IEEE Sensors Journal article; trained 11 junior researchers and thesis students.',
                    ],
                  },
                  {
                    date: 'May 2025 – Aug 2025',
                    title: 'Technology Governance & Cyber Security Management Intern',
                    place: 'Banglalink (Flagship Digitalyst Internship Program), Dhaka',
                    points: [
                      'Managed cybersecurity governance for national telecom infrastructure using Nessus.',
                      'Led technical documentation and R&D collaboration between engineering and governance teams.',
                    ],
                  },
                ].map((job) => (
                  <div key={job.title + job.date} className="relative pl-8">
                    <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ${job.current ? (darkMode ? 'bg-blue-500 ring-[#020617]' : 'bg-blue-600 ring-slate-50') : (darkMode ? 'bg-slate-600 ring-[#020617]' : 'bg-slate-400 ring-slate-50')}`}></div>
                    <span className={`text-xs font-bold tracking-wider uppercase ${job.current ? 'text-blue-500' : 'text-slate-500'}`}>{job.date}</span>
                    <h4 className={`text-xl font-bold mt-2 ${headingClass}`}>{job.title}</h4>
                    <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>{job.place}</p>
                    {job.supervisor && <p className="text-xs text-slate-500 mt-1">{job.supervisor}</p>}
                    <ul className={`mt-3 space-y-2 text-sm list-disc pl-4 marker:text-blue-600 ${subTextClass}`}>
                      {job.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Publications Section */}
      <Section id="publications" className={darkMode ? 'bg-[#0b1120]' : 'bg-slate-100'} darkMode={darkMode}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={FileText} darkMode={darkMode}>Publications</SectionTitle>
          <p className={`-mt-6 mb-10 text-sm ${subTextClass}`}>
            190+ citations · full list on <a href="https://scholar.google.com/citations?user=A4lxmS8AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Scholar</a>
          </p>
          {[
            {
              heading: 'Peer-Reviewed Journal Articles',
              items: [
                { id: 'J1', factor: 'IF: 5.3 (Q1)', tag: 'Differential Evolution', authors: 'M. Bepare, K. K. Roy, S. Das, T. P. Mondal, R. R. Mahmud, M. S. Islam', title: 'Optimized design of a surface plasmon resonance biosensor for Mycobacterium tuberculosis detection using the differential evolution algorithm', venue: 'Microchimica Acta 192(12), 788', year: '2025', url: 'https://doi.org/10.1007/s00604-025-07636-6' },
                { id: 'J2', factor: 'IF: 4.3 (Q3)', tag: 'Photonic Crystal Fiber', authors: 'M. Bepare, T. P. Mondal, S. A. Rafi, R. R. Mahmud, M. S. Islam, B. Barua', title: 'Highly Sensitive Single-Core Surface Plasmon Resonance Biosensor for Detecting Six Different Cancer Cells Using Photonic Crystal Fiber', venue: 'Plasmonics 21(1), 871–888', year: '2025', url: 'https://doi.org/10.1007/s11468-025-03273-0' },
                { id: 'J3', factor: 'IF: 4.3 (Q3)', tag: 'Hybrid Plasmonics', authors: 'S. Das, T. P. Mondal, K. K. Roy, R. R. Mahmud, M. S. Islam, B. Barua', title: 'Design and Optimization of an SPR-Based Biosensor with Ultra-High Sensitivity Using a Hybrid Structure for Accurate Dengue Virus Detection', venue: 'Plasmonics 20(11), 10243–10262', year: '2025', url: 'https://doi.org/10.1007/s11468-025-03107-z' },
                { id: 'J4', factor: 'IF: 4.3 (Q3)', tag: 'Thin-Film Stack', authors: 'K. K. Roy, T. P. Mondal, S. Das, R. R. Mahmud, M. S. Islam, B. Barua', title: 'Pioneering Malaria Diagnostics with a Multi-layered BK7/TiO₂/Ag/Si/BP SPR Biosensor: Enhanced Sensitivity and Precision', venue: 'Plasmonics 20(10), 8781–8801', year: '2025', url: 'https://doi.org/10.1007/s11468-025-02921-9' },
                { id: 'J5', factor: 'IF: 4.3 (Q3)', tag: '2D Materials', authors: 'S. A. Rafi, T. P. Mondal, R. R. Mahmud, W. Emon, M. M. S. P. Rana, M. S. Islam, B. Barua', title: 'Innovative TiO₂/Ag/TiO₂ Sandwiched SPR Sensor with WSe₂ Layer for Efficient Dengue Virus Detection via TMM and FEM', venue: 'Plasmonics 20(7), 5345–5361', year: '2025', url: 'https://doi.org/10.1007/s11468-024-02730-6' },
                { id: 'J6', factor: 'IF: 4.5 (Q1)', tag: 'Surface Plasmon Resonance', authors: 'T. P. Mondal, R. R. Mahmud, S. A. Rafi, M. S. Islam, B. Barua', title: 'Design and Optimization of a Highly Sensitive Surface Plasmon Resonance Biosensor for Accurate Detection of Mycobacterium tuberculosis', venue: 'IEEE Sensors Journal 25(6), 9216–9223', year: '2025', url: 'https://doi.org/10.1109/JSEN.2025.3536976', first: true },
                { id: 'J7', factor: 'IF: 4.0 (Q2)', tag: 'Nanophotonics', authors: 'W. Emon, A. Chaki, T. P. Mondal, M. F. Nayan, R. R. Mahmud', title: 'Photonic crystal fiber-based SPR biosensor coated with Ag-TiO₂ and Au-TiO₂ for the detection of skin cancer: a comparison', venue: 'Optical and Quantum Electronics 56(8), 1322', year: '2024', url: 'https://doi.org/10.1007/s11082-024-07250-5' },
              ],
            },
            {
              heading: 'Peer-Reviewed Conference Proceedings',
              items: [
                { id: 'C1', tag: 'Biosensing', authors: 'N. K. Labonno, S.-E.-Mashiat, T. Kamal, T. P. Mondal, K. K. Roy, R. R. Mahmud', title: 'Non-Invasive SPR Based Biosensor for Early Detection of Glucose Levels Using BK7 Prism', venue: 'IEEE ICTP 2025, Dhaka, Bangladesh', year: '2025', url: 'https://doi.org/10.1109/ICTP68765.2025.11414835' },
                { id: 'C2', tag: 'FEM Simulation', authors: 'W. Emon, A. Chaki, T. P. Mondal, M. F. Nayan', title: 'Design and Performance Analysis of Gold-Coated Photonic Crystal Fiber Plasmonic Biosensor', venue: 'IEEE WIECON-ECE 2023, Thiruvananthapuram, India', year: '2023', url: 'https://doi.org/10.1109/WIECON-ECE60392.2023.10456377' },
              ],
            },
            {
              heading: 'Under Review, Preprints & Presentations',
              items: [
                { id: 'R1', authors: 'T. P. Mondal, M. Rahman, R. R. Mahmud, B. Barua, M. S. Islam', title: 'Numerical Design and Measurement Uncertainty Analysis of a Multilayer NFK51A/Ag/SiC/BP SPR Biosensor for Infectious and Metabolic Disease Biomarkers', venue: 'Submitted to IEEE Transactions on Instrumentation and Measurement (under review)', year: '', first: true },
                { id: 'P1', authors: 'S. Das, K. K. Roy, M. Bepare, T. P. Mondal, S. M. Salimullah, R. R. Mahmud', title: 'Machine Learning–Based Differential Evolution Algorithm for Design and Optimization of SPR-Based Biosensor for Dengue Virus Detection', venue: 'SSRN preprint', year: '2026', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6791643' },
                { id: 'CP1', authors: 'T. P. Mondal, E. Filonenko, S. Malykhin, M. Quarshie, H. Sakurai, K. Konishi, P. Kuzhir', title: 'Local Laser Activation of Color Centers in Diamond Needles', venue: 'Poster, NTB-Photonics 2026, Joensuu, Finland (Book of Abstracts, p. 46)', year: '2026', url: 'https://drive.google.com/drive/folders/1a_cLtcQtyuX8obyxxMMJ0EOYMjNyalfe', first: true },
              ],
            },
          ].map((group) => (
            <div key={group.heading} className="mb-12 last:mb-0">
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{group.heading}</h3>
              <div className="grid gap-4">
                {group.items.map((pub) => (
                  <Card key={pub.id} className={darkMode ? 'group hover:bg-[#1e293b]' : 'group hover:bg-white'} darkMode={darkMode}>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-blue-500">{pub.id}</span>
                          {pub.first && <Badge color="blue" darkMode={darkMode}>First author</Badge>}
                        </div>
                        <h4 className={`text-lg font-semibold transition-colors group-hover:text-blue-500 ${headingClass}`}>
                          {pub.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500">
                          {pub.authors.split('T. P. Mondal').map((part, i, arr) => (
                            <React.Fragment key={i}>
                              {part}
                              {i < arr.length - 1 && <strong className={darkMode ? 'text-slate-200' : 'text-slate-800'}>T. P. Mondal</strong>}
                            </React.Fragment>
                          ))}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm items-center text-slate-500">
                          <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{pub.venue}</span>
                          {pub.year && <span className="w-1 h-1 rounded-full bg-slate-500"></span>}
                          {pub.year && <span className="font-mono text-xs">{pub.year}</span>}
                          {pub.factor && <span className="w-1 h-1 rounded-full bg-slate-500"></span>}
                          {pub.factor && <span>{pub.factor}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 self-start md:self-center">
                      {pub.tag && <Badge color="blue" darkMode={darkMode}>{pub.tag}</Badge>}
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`self-start md:self-center p-2 rounded-lg transition-colors border ${darkMode ? 'bg-slate-800 hover:bg-blue-600 text-white border-slate-700 hover:border-blue-500' : 'bg-slate-50 hover:bg-blue-500 text-slate-600 hover:text-white border-slate-200 hover:border-blue-500'}`}
                          title="Open"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className={darkMode ? '' : 'bg-slate-50'} darkMode={darkMode}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Code} darkMode={darkMode}>Projects</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Sun, color: 'blue',
                title: 'Laser-Printed Colour Gamut at Two Wavelengths',
                meta: 'COIL industry project with TOPPAN Security · Sep 2026 – present',
                desc: 'Developing laser-printing workflows at 1064 nm and 532 nm and characterizing printed colours by spectroscopy, optical microscopy and SEM.',
                tags: ['Laser Processing', 'Spectroscopy', 'SEM'],
                result: 'Comparing colour gamuts and laser-induced surface morphology between the two wavelengths.',
              },
              {
                icon: Database, color: 'indigo',
                title: 'Automated Particle Detection & Classification',
                meta: 'Computer vision course project, UJM · Dec 2025',
                desc: 'Built a Python (OpenCV) and CNN pipeline to segment, count and classify microscopic particles.',
                tags: ['Python', 'OpenCV', 'CNN'],
                result: 'Reached ~80% classification accuracy and reduced manual analysis time.',
                url: 'https://drive.google.com/file/d/1DP945pbrRbiq84aZcOCkbtsRIArtvuud/view',
              },
              {
                icon: Aperture, color: 'cyan',
                title: 'Digital Holography & Phase Retrieval',
                meta: 'Course project, UJM',
                desc: 'Implemented Rayleigh-Sommerfeld propagation and Gerchberg-Saxton algorithms to reconstruct phase maps from holograms for biological sample analysis.',
                tags: ['Python', 'Fourier Optics', 'Phase Retrieval'],
                result: 'Enables refractive index and thickness measurement of bacteria samples.',
                url: 'https://drive.google.com/file/d/1pkwVhC4f1ZLZnE-66SP9KOkM1mBd-Bol/view',
              },
              {
                icon: BarChart, color: 'indigo',
                title: 'Automotive Fuel Efficiency Analysis',
                meta: 'Data analysis project',
                desc: 'EDA and Polynomial Ridge Regression models to predict vehicle MPG, using PCA for feature extraction.',
                tags: ['Python', 'Scikit-learn', 'Seaborn'],
                result: 'Identified weight and origin as key efficiency drivers.',
                url: 'https://drive.google.com/file/d/1vxV-Kg5k6umHnKmSdeX0tsKoGggH84VE/view',
              },
              {
                icon: Cpu, color: 'blue',
                title: '2:1 Multiplexer Design Optimization',
                meta: 'Undergraduate project, AUST',
                desc: 'Comparative analysis of power efficiency using Adiabatic (2N2P, 2N2N2P), NAND and NOR logic.',
                tags: ['Verilog', 'MATLAB', 'Hardware'],
                result: 'Simulated power dissipation metrics to identify optimal logic configurations.',
                url: 'https://drive.google.com/file/d/1T8uwD10lOYnXvgIwxrcVcFYuNd5QWbAj/view',
              },
            ].map((proj) => {
              const Icon = proj.icon;
              const iconColors = {
                blue: darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-600 border-blue-200',
                indigo: darkMode ? 'bg-indigo-900/30 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border-indigo-200',
                cyan: darkMode ? 'bg-cyan-900/30 text-cyan-400 border-cyan-500/30' : 'bg-cyan-50 text-cyan-600 border-cyan-200',
              };
              return (
                <Card key={proj.title} className={darkMode ? 'h-full flex flex-col bg-[#1e293b] border-slate-700' : 'h-full flex flex-col bg-white border-slate-200'} darkMode={darkMode}>
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded flex items-center justify-center border ${iconColors[proj.color]}`}>
                        <Icon size={24} />
                      </div>
                      {proj.url && (
                        <a href={proj.url} target="_blank" rel="noopener noreferrer" className={`p-2 transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold mb-1 ${headingClass}`}>{proj.title}</h3>
                    <p className="text-xs text-slate-500 mb-3">{proj.meta}</p>
                    <p className={`text-sm ${subTextClass}`}>{proj.desc}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tags.map((t) => <Badge key={t} color={proj.color} darkMode={darkMode}>{t}</Badge>)}
                    </div>
                    <div className={`text-sm border-t pt-4 ${darkMode ? 'text-slate-500 border-slate-700' : 'text-slate-500 border-slate-100'}`}>
                      {proj.result}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className={darkMode ? 'bg-[#0b1120]' : 'bg-slate-100'} darkMode={darkMode}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle icon={Zap} darkMode={darkMode}>Technical Expertise</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Experimental', icon: Microscope, accent: 'text-blue-500', items: ['Confocal micro-Raman & PL mapping (WITec)', 'SEM & e-beam irradiation', 'Laser processing & alignment', 'Optical spectroscopy & microscopy', 'Cryogenic spectroscopy (LN₂ cryostat)', 'Digital Holography (NDT)', 'Interferometry', 'Cleanroom protocols', 'Laser Safety Class 3/4'] },
              { title: 'Modeling & Simulation', icon: Zap, accent: 'text-blue-500', items: ['COMSOL Multiphysics (Wave Optics, RF)', 'CST Studio Suite', 'Transfer-matrix method & FEM', 'Thin-film & PCF design', 'Ansys Lumerical', 'AutoCAD / SketchUp', 'Differential Evolution & Genetic Algorithms'] },
              { title: 'Programming & Tools', icon: Code, accent: 'text-indigo-500', items: ['Python (NumPy, SciPy, Pandas)', 'PyTorch, Keras, OpenCV', 'CNN / ConvLSTM', 'MATLAB', 'C++ / Verilog', 'OriginPro', 'LaTeX, Git, Linux'] },
            ].map((group) => {
              const Icon = group.icon;
              return (
                <Card key={group.title} className={darkMode ? 'hover:border-blue-500/50' : 'hover:border-blue-400/50'} darkMode={darkMode}>
                  <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${darkMode ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'}`}>{group.title}</h3>
                  <ul className={`space-y-2 text-sm ${subTextClass}`}>
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2"><Icon size={14} className={`${group.accent} mt-0.5 flex-shrink-0`}/> {item}</li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Honors & Service Section */}
      <Section id="honors" className={darkMode ? '' : 'bg-slate-50'} darkMode={darkMode}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Award} darkMode={darkMode}>Honors & Service</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className={darkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} darkMode={darkMode}>
              <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${darkMode ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'}`}>Awards</h3>
              <ul className={`space-y-4 text-sm ${subTextClass}`}>
                {[
                  ['2025', 'Erasmus Mundus Joint Master Scholarship, full funding (€51,600); ranked 27th of 217 applicants'],
                  ['2024', '1st Place, Excellence in Research & Presentation, AUST EEE Society'],
                  ['2022', 'Tuition Waiver for Academic Excellence (top 8% of cohort), AUST'],
                  ['2018', '1st Runner-up, 11th NDF BD National Debate Festival'],
                  ['2017', '1st Runner-up, Regional Physics Olympiad (Faridpur)'],
                ].map(([year, text]) => (
                  <li key={text} className="flex gap-4"><span className="font-mono text-xs text-blue-500 pt-0.5 w-10 flex-shrink-0">{year}</span><span>{text}</span></li>
                ))}
              </ul>
            </Card>
            <Card className={darkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} darkMode={darkMode}>
              <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${darkMode ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'}`}>Service & Leadership</h3>
              <ul className={`space-y-4 text-sm ${subTextClass}`}>
                {[
                  ['Peer Reviewer, Springer Nature journals', '2025 – present', 'Optical and Quantum Electronics, Plasmonics, Scientific Reports, Sensing and Imaging, Discover Sensors, Journal of Computational Electronics, Silicon.'],
                  ['Founder & Community Lead, Global Welcome Network', '2025 – present', 'A 90+ member network from 7+ countries across 5 cities in France and Finland, supporting newcomers.'],
                  ['Youth Community Service Leader, Rotary Club of Faridpur', '2017 – present', 'COVID relief, blood drives, winter aid and the May 2025 flood response.'],
                  ['Undergraduate Research Mentor, AUST', '2025', 'Trained 11 junior researchers in COMSOL, MATLAB and OriginPro.'],
                  ['Elected Cohort Representative, AUST', '2020 – 2024', 'Represented 180 engineering students.'],
                ].map(([role, date, text]) => (
                  <li key={role}>
                    <div className="flex justify-between gap-4"><span className={`font-semibold ${headingClass}`}>{role}</span><span className="font-mono text-xs text-blue-500 flex-shrink-0 pt-0.5">{date}</span></div>
                    <p className="mt-1">{text}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className={`border-t py-12 transition-colors duration-300 ${darkMode ? 'bg-[#020617] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className={`text-2xl font-bold mb-6 ${headingClass}`}>Let's Connect</h2>
            <p className={`mb-8 max-w-lg mx-auto ${subTextClass}`}>
                Open to PhD positions, internships and research collaborations in photonics, biosensing, laser processing and AI for optics.
            </p>
            <div className="flex justify-center gap-6 mb-8">
                <a href="mailto:tanupravamondal@gmail.com" className={`w-12 h-12 rounded flex items-center justify-center transition-all border ${darkMode ? 'bg-[#1e293b] hover:bg-blue-600 hover:text-white text-slate-400 border-slate-700 hover:border-blue-500' : 'bg-white hover:bg-blue-500 hover:text-white text-slate-600 border-slate-200 hover:border-blue-500 shadow-sm'}`}>
                    <Mail size={20} />
                </a>
                <a href="https://www.linkedin.com/in/tanu-prava-mondal-28124a200/" target="_blank" className={`w-12 h-12 rounded flex items-center justify-center transition-all border ${darkMode ? 'bg-[#1e293b] hover:bg-[#0077b5] hover:text-white text-slate-400 border-slate-700 hover:border-[#0077b5]' : 'bg-white hover:bg-[#0077b5] hover:text-white text-slate-600 border-slate-200 hover:border-[#0077b5] shadow-sm'}`}>
                    <Linkedin size={20} />
                </a>
            </div>
            <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Tanu Prava Mondal.
            </p>
        </div>
      </footer>
    </div>
  );
}