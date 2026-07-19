import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import doctorImg from './assets/image.png';
import { 
  Activity, 
  Check, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Phone, 
  Shield, 
  ArrowUpRight, 
  Menu, 
  X, 
  Lock, 
  Dna, 
  Cpu, 
  UserCheck, 
  FileText,
  MapPin,
  Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// CARD 1: DIAGNOSTIC SHUFFLER SUB-COMP
// ----------------------------------------------------
const shufflerItems = [
  { id: 1, title: "Hematology & CBC", desc: "60+ critical cell metrics analyzed under pathologist supervision.", status: "Verified by MD" },
  { id: 2, title: "Hormonal & Thyroid", desc: "T3, T4, TSH assays to determine active endocrine balance.", status: "Verified by MD" },
  { id: 3, title: "Lipid & Metabolic", desc: "Comprehensive glucose, cholesterol fractionation, and liver enzymes.", status: "Verified by MD" }
];

function DiagnosticShuffler() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % shufflerItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full flex items-center justify-center overflow-hidden">
      {shufflerItems.map((item, idx) => {
        // Calculate stacking classes based on relative index to activeIndex
        const relativeIdx = (idx - activeIndex + shufflerItems.length) % shufflerItems.length;
        
        let zIndex = "z-10";
        let transformClass = "scale-90 translate-y-8 opacity-40";
        let borderClass = "border-moss/10";
        
        if (relativeIdx === 0) {
          zIndex = "z-30";
          transformClass = "scale-100 translate-y-0 opacity-100";
          borderClass = "border-clay/30";
        } else if (relativeIdx === 1) {
          zIndex = "z-20";
          transformClass = "scale-95 translate-y-4 opacity-75";
          borderClass = "border-moss/20";
        }

        return (
          <div
            key={item.id}
            className={`absolute w-11/12 max-w-sm bg-cream-light border ${borderClass} rounded-[2rem] p-6 shadow-xl transition-all duration-700 ease-spring ${zIndex} ${transformClass}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-clay bg-clay/10 px-2 py-0.5 rounded-full">
                {item.status}
              </span>
              <Activity className="w-4 h-4 text-moss/40" />
            </div>
            <h4 className="text-lg font-outfit font-bold text-moss mb-1">{item.title}</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed font-sans">{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------
// CARD 2: TELEMETRY TYPEWRITER SUB-COMP
// ----------------------------------------------------
const typewriterLogs = [
  "[OK] CORE: Diagnostics environment calibrated.",
  "[RUNNING] Accessioning barcode sample #90482...",
  "[OK] Centrifugation cycle completed (3200 RPM).",
  "[RUNNING] Spectrometry assay on serum content...",
  "[OK] Hemoglobin count: 14.8 g/dL (optimal bounds).",
  "[OK] Thyroid TSH level: 2.1 uIU/mL (verified).",
  "[OK] Pathology supervisor review active...",
  "[OK] Doctor Verification complete: Dr. Ajit Chavan approved.",
  "[OK] Secure patient PDF report finalized."
];

function TelemetryTypewriter() {
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    // Typewriter logic for the active line
    if (currentLineIndex < typewriterLogs.length) {
      const activeLine = typewriterLogs[currentLineIndex];
      if (charIndex < activeLine.length) {
        const timeout = setTimeout(() => {
          setTypedText((prev) => prev + activeLine[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        // Line completed, push to history and reset for next line
        const timeout = setTimeout(() => {
          setVisibleLogs((prev) => [...prev.slice(-3), activeLine]);
          setCurrentLineIndex((prev) => (prev + 1) % typewriterLogs.length);
          setTypedText("");
          setCharIndex(0);
          // Loop reset
          if (currentLineIndex === typewriterLogs.length - 1) {
            setVisibleLogs([]);
          }
        }, 1500);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, currentLineIndex]);

  return (
    <div className="bg-charcoal text-[#39ff14] font-mono text-[10px] p-4 rounded-[1.5rem] border border-moss/80 shadow-inner h-48 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between border-b border-moss/30 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-clay animate-pulse"></span>
            <span className="text-[9px] uppercase tracking-wider text-moss-light">Live Lab Diagnostics</span>
          </div>
          <span className="text-moss-light">SYS: active</span>
        </div>
        <div className="space-y-1">
          {visibleLogs.map((log, index) => (
            <div key={index} className="opacity-60">{log}</div>
          ))}
          <div className="flex items-center">
            <span>{typedText}</span>
            <span className="w-1.5 h-3 bg-clay ml-0.5 animate-pulse"></span>
          </div>
        </div>
      </div>
      <div className="text-[8px] text-moss-light/40 text-right">
        SUYASH PATHOLOGY INC — CALIB: OK
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CARD 3: WHATSAPP REPORTS SUB-COMP
// ----------------------------------------------------
function WhatsAppReports() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    let timeoutId;
    let step1, step2, step3, step4;
    
    const runSimulation = () => {
      setMessages([]);
      
      step1 = setTimeout(() => {
        setMessages([{ id: 1, text: "Report ready: John Doe", type: 'incoming' }]);
      }, 1000);
      
      step2 = setTimeout(() => {
        setMessages(prev => [...prev, { id: 2, text: "Sending PDF report to patient...", type: 'system' }]);
      }, 2500);
      
      step3 = setTimeout(() => {
        setMessages(prev => [...prev, { id: 3, text: "Delivered ✔✔", type: 'outgoing' }]);
      }, 4000);
      
      step4 = setTimeout(() => {
        runSimulation();
      }, 7000);
    };
    
    runSimulation();
    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
    };
  }, []);

  return (
    <div className="relative w-full bg-[#E5DDD0] border border-moss/10 rounded-[2rem] p-4 shadow-inner h-60 flex flex-col overflow-hidden">
      <div className="bg-moss text-cream rounded-t-2xl -mx-4 -mt-4 px-4 py-3 flex items-center gap-2 text-xs font-outfit shadow-md">
        <div className="w-6 h-6 rounded-full bg-clay flex items-center justify-center">
          <Check className="w-3.5 h-3.5" />
        </div>
        <div>
          <p className="font-bold tracking-wide">Suyash Lab Reports</p>
          <p className="text-[9px] text-cream/70 font-mono uppercase tracking-widest">Verified Account</p>
        </div>
      </div>
      
      <div className="flex-1 mt-4 space-y-3 flex flex-col justify-end pb-2">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`text-[10px] font-sans px-3 py-2 max-w-[85%] rounded-2xl animate-fade-in ${
              msg.type === 'incoming' 
                ? 'bg-cream text-moss self-start rounded-tl-none border border-moss/5 shadow-sm'
                : msg.type === 'outgoing'
                ? 'bg-clay text-cream self-end rounded-tr-none shadow-sm'
                : 'bg-transparent text-moss/50 self-center font-mono uppercase tracking-widest border border-moss/10 rounded-full text-[8px]'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MICROSCOPE ASSEMBLY ANIMATION SUB-COMP
// ----------------------------------------------------
function MicroscopeAssembly() {
  const baseRef = useRef(null);
  const armRef = useRef(null);
  const knobsRef = useRef(null);
  const stageRef = useRef(null);
  const nosepieceRef = useRef(null);
  const eyepieceRef = useRef(null);
  const lightBeamRef = useRef(null);

  useEffect(() => {
    // Initial states
    gsap.set(baseRef.current, { y: 120, opacity: 0 });
    gsap.set(armRef.current, { x: 100, y: -100, opacity: 0, rotation: 30, transformOrigin: "bottom left" });
    gsap.set(knobsRef.current, { scale: 0, rotation: -270, opacity: 0, transformOrigin: "center" });
    gsap.set(stageRef.current, { x: -120, opacity: 0 });
    gsap.set(nosepieceRef.current, { y: -100, opacity: 0, transformOrigin: "top center" });
    gsap.set(eyepieceRef.current, { x: -60, y: -60, opacity: 0 });
    gsap.set(lightBeamRef.current, { opacity: 0, scaleY: 0, transformOrigin: "bottom center" });

    // Timeline assembly
    const tl = gsap.timeline({ delay: 0.6 });
    tl.to(baseRef.current, { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" })
      .to(armRef.current, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1.0, ease: "power2.out" }, "-=0.6")
      .to(stageRef.current, { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }, "-=0.5")
      .to(knobsRef.current, { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: "back.out(1.7)" }, "-=0.4")
      .to(eyepieceRef.current, { x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .to(nosepieceRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "bounce.out" }, "-=0.4")
      .to(lightBeamRef.current, { opacity: 1, scaleY: 1, duration: 0.6, ease: "power2.out" })
      // Smooth floating loop
      .to([baseRef.current, armRef.current, stageRef.current, knobsRef.current, eyepieceRef.current, nosepieceRef.current, lightBeamRef.current], {
        y: "-=6",
        duration: 2.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.04
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[420px] lg:min-h-[480px]">
      <svg 
        viewBox="0 0 400 500" 
        className="w-full h-full max-w-[360px] max-h-[460px] text-moss drop-shadow-2xl" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* LIGHT BEAM ACCENT */}
        <polygon 
          ref={lightBeamRef} 
          points="200,380 180,285 220,285" 
          fill="rgba(204,88,51,0.2)" 
          stroke="rgba(204,88,51,0.4)" 
          strokeWidth="1"
        />

        {/* BASE */}
        <g ref={baseRef}>
          <path d="M 120 440 L 280 440 L 255 405 L 145 405 Z" fill="#1F2C25" className="stroke-moss/40" />
          <path d="M 160 405 L 240 405 L 235 375 L 165 375 Z" fill="#2E4036" className="stroke-moss/20" />
          <circle cx="200" cy="375" r="10" fill="#CC5833" className="stroke-moss/40" />
        </g>

        {/* CURVED ARM */}
        <g ref={armRef}>
          <path d="M 235 375 C 265 375, 305 315, 285 215 C 275 165, 235 145, 205 145" fill="none" strokeWidth="15" className="stroke-moss" />
          <path d="M 230 375 C 260 375, 300 315, 280 215 C 270 165, 230 145, 200 145" fill="none" strokeWidth="5" className="stroke-[#2E4036]" />
        </g>

        {/* FOCUS KNOBS */}
        <g ref={knobsRef}>
          <circle cx="272" cy="305" r="15" fill="#CC5833" className="stroke-moss/50" />
          <circle cx="272" cy="305" r="8" fill="#F2F0E9" className="stroke-[#2E4036]" />
          <line x1="272" y1="290" x2="272" y2="320" />
          <line x1="257" y1="305" x2="287" y2="305" />
        </g>

        {/* STAGE & SLIDE */}
        <g ref={stageRef}>
          <line x1="120" y1="285" x2="280" y2="285" strokeWidth="10" className="stroke-moss" />
          <path d="M 155 280 L 175 273 M 245 280 L 225 273" strokeWidth="3" className="stroke-[#CC5833]" />
          <rect x="175" y="278" width="50" height="4" fill="rgba(204,88,51,0.6)" stroke="none" />
        </g>

        {/* TURRET NOSEPIECE & OBJECTIVE LENSES */}
        <g ref={nosepieceRef}>
          <path d="M 180 205 C 180 185, 220 185, 220 205 Z" fill="#1F2C25" className="stroke-moss/50" />
          <rect x="194" y="205" width="12" height="25" rx="2" fill="#CC5833" className="stroke-moss/60" />
          <rect x="196" y="230" width="8" height="4" fill="#F2F0E9" stroke="none" />
          <g transform="rotate(30 200 195)">
            <rect x="194" y="205" width="10" height="20" rx="2" fill="#2E4036" className="stroke-moss/40" />
          </g>
          <g transform="rotate(-30 200 195)">
            <rect x="194" y="205" width="10" height="20" rx="2" fill="#2E4036" className="stroke-moss/40" />
          </g>
        </g>

        {/* TUBE & EYEPIECE */}
        <g ref={eyepieceRef}>
          <path d="M 205 145 L 165 105" strokeWidth="14" className="stroke-moss" />
          <path d="M 202 142 L 168 108" strokeWidth="4" className="stroke-[#2E4036]" />
          <path d="M 170 110 L 155 95" strokeWidth="18" className="stroke-[#CC5833]" />
          <line x1="151" y1="99" x2="163" y2="87" strokeWidth="3" className="stroke-moss" />
        </g>
      </svg>
    </div>
  );
}

// ----------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------
export default function App() {
  const [navBackground, setNavBackground] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('mr');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showAdPrompt, setShowAdPrompt] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    test: '',
    date: '',
    time: '',
    visitType: 'Visit Laboratory'
  });

  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const ctaRef = useRef(null);
  
  // Language Initialization & Modals
  useEffect(() => {
    if (document.cookie.includes('googtrans=/en/en')) {
      setCurrentLang('en');
    } else {
      setCurrentLang('mr');
    }

    // Modal sequencing
    const langSeen = localStorage.getItem('langPromptSeen');
    const adSeen = localStorage.getItem('adPromptSeen');

    if (!langSeen) {
      setTimeout(() => setShowLangPrompt(true), 1500);
    } else if (!adSeen) {
      setTimeout(() => setShowAdPrompt(true), 1500);
    }
  }, []);

  const handleLangChoice = (choice) => {
    localStorage.setItem('langPromptSeen', 'true');
    setShowLangPrompt(false);
    
    if (choice === 'mr') {
      setCurrentLang('mr');
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
      document.cookie = `googtrans=/en/mr; path=/`;
      document.cookie = `googtrans=/en/mr; domain=${window.location.hostname}; path=/`;
      window.location.reload();
    } else {
      setTimeout(() => {
        if (!localStorage.getItem('adPromptSeen')) {
          setShowAdPrompt(true);
        }
      }, 500);
    }
  };

  const closeAdPrompt = () => {
    localStorage.setItem('adPromptSeen', 'true');
    setShowAdPrompt(false);
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'mr' ? 'en' : 'mr';
    
    // Clear any existing cookies that might conflict
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    
    // Set the new translation cookie
    document.cookie = `googtrans=/en/${newLang}; path=/`;
    document.cookie = `googtrans=/en/${newLang}; domain=${window.location.hostname}; path=/`;
    
    // Force a reload to guarantee Google Translate picks up the new cookie
    window.location.reload();
  };

  // Floating Navbar morphing logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations on Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section animation
      gsap.fromTo(title1Ref.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
      
      gsap.fromTo(title2Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.4 }
      );

      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.7 }
      );

      // Philosophy reveal
      gsap.fromTo(".philosophy-text", 
        { opacity: 0.2, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".philosophy-section",
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      // Protocol stacking cards pinning interaction
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            filter: "blur(8px)",
            scrollTrigger: {
              trigger: card,
              start: "top 12%",
              end: "bottom 15%",
              scrub: true,
            }
          });
        }
      });
      
    });

    return () => ctx.revert();
  }, []);

  // Handle Booking Form submission (Redirect to WhatsApp)
  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const { name, phone, test, date, time, visitType } = bookingForm;
    const message = `Hello Suyash Lab, I would like to book a diagnostic test.%0A%0A*Patient Name:* ${name}%0A*Contact:* ${phone}%0A*Test Requested:* ${test}%0A*Preferred Date:* ${date}%0A*Preferred Time:* ${time}%0A*Visit Type:* ${visitType}%0A%0APlease confirm my appointment. Thank you!`;
    const whatsappUrl = `https://wa.me/917499753643?text=${message}`; // Actual laboratory booking number
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Analytics />
      <div className="relative min-h-screen">
      {/* GLOBAL NOISE OVERLAY */}
      <div className="noise-overlay" />

      {/* FLOATING ISLAND NAVBAR */}
      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-5xl rounded-full transition-all duration-500 border ${
          navBackground 
            ? 'bg-cream/70 backdrop-blur-xl border-moss/10 shadow-lg py-3 px-6' 
            : 'bg-transparent border-transparent py-5 px-6'
        }`}
        id="navbar"
      >
        <div className="flex items-center justify-between">
          <a href="#home" className="flex flex-col select-none group">
            <span className="font-outfit font-black tracking-wider text-lg transition-colors duration-500 flex items-center gap-1.5 text-moss group-hover:text-clay">
              <Dna className="w-5 h-5 text-clay animate-pulse-slow" /> SUYASH LAB
            </span>
            <span className="text-[8px] font-mono tracking-widest transition-colors duration-500 text-moss/70">
              PATHOLOGY & DIAGNOSTICS
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-outfit uppercase tracking-widest font-semibold transition-colors duration-500 text-moss">
            <a href="#new-tests" className="text-clay hover:text-clay-dark transition-colors lift-hover animate-pulse">New Tests</a>
            <a href="#features" className="hover:text-clay transition-colors lift-hover">Diagnostic Features</a>
            <a href="#philosophy" className="hover:text-clay transition-colors lift-hover">Our Philosophy</a>
            <a href="#protocol" className="hover:text-clay transition-colors lift-hover">The Protocol</a>
            <a href="#profile" className="hover:text-clay transition-colors lift-hover">Pathologist</a>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 hover:text-clay transition-colors lift-hover bg-moss/5 px-3 py-1.5 rounded-full border border-moss/10"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              {currentLang === 'mr' ? 'English' : 'मराठी'}
            </button>
          </div>



          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none transition-colors duration-500 text-moss hover:text-clay"
            aria-label="Toggle menu"
            id="menu-toggle-btn"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown drawer */}
        {menuOpen && (
          <div className="md:hidden mt-4 p-6 bg-cream border border-moss/10 rounded-[2rem] flex flex-col gap-6 text-sm font-outfit uppercase tracking-widest font-semibold text-moss animate-fade-in shadow-xl">
            <a href="#new-tests" onClick={() => setMenuOpen(false)} className="text-clay animate-pulse">New Tests</a>
            <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-clay">Diagnostic Features</a>
            <a href="#philosophy" onClick={() => setMenuOpen(false)} className="hover:text-clay">Our Philosophy</a>
            <a href="#protocol" onClick={() => setMenuOpen(false)} className="hover:text-clay">The Protocol</a>
            <a href="#profile" onClick={() => setMenuOpen(false)} className="hover:text-clay">Pathologist</a>
            <button 
              onClick={() => { toggleLanguage(); setMenuOpen(false); }}
              className="flex items-center justify-center gap-2 hover:text-clay transition-colors bg-moss/5 px-4 py-3 rounded-full border border-moss/10 w-full mt-2"
            >
              <Globe className="w-5 h-5" />
              {currentLang === 'mr' ? 'Switch to English' : 'मराठी मध्ये वाचा'}
            </button>
          </div>
        )}
      </nav>      {/* HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-screen lg:h-screen w-full flex items-center pt-28 pb-16 lg:pb-0 px-6 md:px-16 overflow-hidden bg-sage"
        id="home"
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?q=80&w=2000" 
            alt="Suyash laboratory glassware and pathology instrumentation"
            className="w-full h-full object-cover opacity-10 object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage via-sage/90 to-transparent" />
        </div>

        {/* Hero Copy Content & Microscope Grid */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-moss">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-moss/20 bg-moss/5 rounded-full mb-6 backdrop-blur-md self-start">
              <Shield className="w-4 h-4 text-clay" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider">
                25+ Years of Doctor-Supervised Excellence
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-outfit leading-tight mb-8">
              <span ref={title1Ref} className="block font-black text-moss">Diagnostics is the</span>
              <span ref={title2Ref} className="block font-serif italic text-clay font-normal tracking-wide">Precision.</span>
            </h1>
            
            <p className="text-sm md:text-lg text-moss/80 font-sans max-w-xl leading-relaxed mb-8">
              Under direct MBBS, DCP Pathologist governance, Suyash Lab is a trusted laboratory providing medical diagnostic accuracy verified by expert pathologists.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                className="magnetic-btn px-8 py-3.5 bg-clay text-cream hover:bg-clay-dark text-xs md:text-sm font-outfit uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-lg shadow-clay/20 flex items-center gap-2 group"
              >
                <span>Contact Us</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column (Microscope Assembly) */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <MicroscopeAssembly />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (MICRO-UIs) */}
      <section 
        className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto"
        id="features"
      >
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-clay font-bold block mb-3">
            Digital Artifacts
          </span>
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-moss tracking-tight">
            Scientific, Interactive Laboratory Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Diagnostic Shuffler */}
          <div className="bg-cream-light border border-moss/10 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between h-[420px] transition-all hover:shadow-lg">
            <div>
              <span className="w-8 h-8 rounded-full bg-moss/5 border border-moss/10 flex items-center justify-center mb-6">
                <Activity className="w-4 h-4 text-moss" />
              </span>
              <h3 className="text-xl font-outfit font-bold text-moss mb-3">Diagnostic Shuffler</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed font-sans mb-6">
                Explore our full spectrum of pathology offerings. Verified results compiled by specialized doctors.
              </p>
            </div>
            <DiagnosticShuffler />
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="bg-cream-light border border-moss/10 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between h-[420px] transition-all hover:shadow-lg">
            <div>
              <span className="w-8 h-8 rounded-full bg-moss/5 border border-moss/10 flex items-center justify-center mb-6">
                <Cpu className="w-4 h-4 text-moss" />
              </span>
              <h3 className="text-xl font-outfit font-bold text-moss mb-3">Telemetry Feed</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed font-sans mb-6">
                Watch our active laboratory pipeline execute, calibrate, and verify patient metrics in real time.
              </p>
            </div>
            <TelemetryTypewriter />
          </div>

          {/* Card 3: WhatsApp Reports */}
          <div className="bg-cream-light border border-moss/10 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between h-[420px] transition-all hover:shadow-lg">
            <div>
              <span className="w-8 h-8 rounded-full bg-moss/5 border border-moss/10 flex items-center justify-center mb-6">
                <Phone className="w-4 h-4 text-moss" />
              </span>
              <h3 className="text-xl font-outfit font-bold text-moss mb-3">Instant WhatsApp Reports</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed font-sans mb-6">
                Receive verified diagnostic reports directly on WhatsApp for both patients and referring doctors instantly.
              </p>
            </div>
            <WhatsAppReports />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section 
        className="philosophy-section relative py-32 md:py-48 px-6 md:px-16 bg-charcoal text-cream overflow-hidden"
        id="philosophy"
      >
        {/* Parallax texture */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000" 
            alt="Forest moss texture"
            className="w-full h-full object-cover opacity-10 object-center"
          />
          <div className="absolute inset-0 bg-charcoal/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
          <span className="text-xs font-mono uppercase tracking-widest text-clay font-bold block mb-4">
            Laboratory Creed
          </span>
          
          <div className="space-y-8">
            <p className="philosophy-text text-xl md:text-3xl font-outfit font-medium text-cream/40 leading-relaxed">
              Most pathology laboratories focus on: high volume turnover and mechanized output.
            </p>
            <h3 className="philosophy-text text-3xl md:text-6xl font-serif italic text-clay font-normal leading-tight">
              We focus on: direct doctor-led verification, supervised pathology protocols, and absolute patient clarity.
            </h3>
          </div>
        </div>
      </section>

      {/* PROTOCOL (STICKY STACKING ARCHIVE) */}
      <section 
        className="relative py-24 md:py-32 bg-cream-dark px-6 md:px-16"
        id="protocol"
      >
        <div className="max-w-5xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-clay font-bold block mb-3">
            Analytical Pipeline
          </span>
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-moss tracking-tight">
            The Diagnostics Protocol
          </h2>
          <p className="text-sm md:text-base text-moss/70 font-sans mt-2 max-w-lg">
            How we protect test accuracy through every phase of sample processing and verification.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-20">
          
          {/* Card 1: Sample Accessioning */}
          <div className="protocol-card bg-moss text-cream border border-cream/10 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 min-h-[400px]">
            <div className="max-w-md">
              <span className="text-xs font-mono text-clay uppercase tracking-widest block mb-4">Phase 01</span>
              <h3 className="text-2xl md:text-4xl font-outfit font-bold mb-4">Verified Chain-of-Custody</h3>
              <p className="text-sm text-cream/70 leading-relaxed font-sans">
                Each blood draw is systematically labeled and cross-checked against patient records at the point of care. Our strict chain-of-custody protocols prevent pre-analytical mix-ups and ensure the diagnostic viability of your sample.
              </p>
            </div>
            <div className="relative w-48 h-48 flex items-center justify-center bg-cream/5 rounded-[2rem] border border-cream/10 overflow-hidden">
              <Dna className="w-16 h-16 text-clay animate-spin" style={{ animationDuration: '12s' }} />
              <div className="absolute bottom-4 text-[9px] font-mono text-cream/40 tracking-wider">HELIX ROTATION ACTIVE</div>
            </div>
          </div>

          {/* Card 2: Robotic Assays */}
          <div className="protocol-card bg-moss text-cream border border-cream/10 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 min-h-[400px]">
            <div className="max-w-md">
              <span className="text-xs font-mono text-clay uppercase tracking-widest block mb-4">Phase 02</span>
              <h3 className="text-2xl md:text-4xl font-outfit font-bold mb-4">Precision Analysis & Calibration</h3>
              <p className="text-sm text-cream/70 leading-relaxed font-sans">
                Using calibrated analytical analyzers, samples are tested with strict quality control. Controls are run daily to protect accuracy.
              </p>
            </div>
            <div className="relative w-48 h-48 bg-cream/5 rounded-[2rem] border border-cream/10 p-4 flex flex-col justify-between overflow-hidden">
              <div className="grid grid-cols-5 gap-2 opacity-35">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-clay"></div>
                ))}
              </div>
              {/* Scanning red laser line */}
              <div className="absolute left-0 right-0 h-0.5 bg-clay shadow-md shadow-clay/80 animate-[bounce_3s_infinite]" />
              <div className="text-[9px] font-mono text-cream/40 text-center uppercase tracking-wider">SPECTRAL GRID SCAN</div>
            </div>
          </div>

          {/* Card 3: Doctor Verification */}
          <div className="protocol-card bg-moss text-cream border border-cream/10 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 min-h-[400px]">
            <div className="max-w-md">
              <span className="text-xs font-mono text-clay uppercase tracking-widest block mb-4">Phase 03</span>
              <h3 className="text-2xl md:text-4xl font-outfit font-bold mb-4">Supervised Pathologist Approval</h3>
              <p className="text-sm text-cream/70 leading-relaxed font-sans">
                No report is auto-released. Every test value and anomaly is directly reviewed and signed off by an experienced MBBS, DCP Pathologist.
              </p>
            </div>
            <div className="relative w-48 h-48 bg-cream/5 rounded-[2rem] border border-cream/10 p-4 flex flex-col justify-center items-center overflow-hidden">
              {/* SVG Waveform Pulsing Animation */}
              <svg className="w-full h-24 stroke-clay" viewBox="0 0 100 30" fill="none">
                <path 
                  d="M0 15 H20 L25 5 L30 25 L35 15 H50 L53 10 L56 20 L59 15 H100" 
                  strokeWidth="2" 
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  className="animate-[dash_2.5s_linear_infinite]"
                />
              </svg>
              <style>{`
                @keyframes dash {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
              `}</style>
              <div className="text-[9px] font-mono text-cream/40 uppercase tracking-wider mt-2">Doctor Signature Verified</div>
            </div>
          </div>

        </div>
      </section>

      {/* HEALTH PACKAGES & WHATSAPP APPOINTMENT BOOKING FORM */}
      <section 
        className="py-24 md:py-32 px-6 md:px-16 bg-cream"
        id="packages"
      >
        <div className="max-w-6xl mx-auto">
          {/* New Tests Available Section */}
          <div className="mb-24" id="new-tests">
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-clay font-bold block mb-3">
                Now Available
              </span>
              <h2 className="text-3xl md:text-5xl font-outfit font-bold text-moss tracking-tight">
                New Diagnostic Tests
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Test 1 */}
              <div className="bg-white border border-moss/10 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-moss/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-clay/10 transition-colors">
                  <Activity className="w-6 h-6 text-clay" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-moss mb-3">Vitamin D</h3>
                <p className="text-sm font-sans text-charcoal/70 mb-8 leading-relaxed">Essential for bone health, immune support, and metabolic balance. Now available at reasonable rates.</p>
                <a href="https://wa.me/917499753643?text=Hello%20Suyash%20Lab,%20I%20want%20to%20book%20a%20Vitamin%20D%20test." target="_blank" rel="noreferrer" className="text-xs font-outfit uppercase tracking-widest font-bold text-clay hover:text-clay-dark flex items-center gap-2 group-hover:gap-3 transition-all">
                  Book Now <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              
              {/* Test 2 */}
              <div className="bg-white border border-moss/10 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-moss/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-clay/10 transition-colors">
                  <Activity className="w-6 h-6 text-clay" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-moss mb-3">Thyroid Profile</h3>
                <p className="text-sm font-sans text-charcoal/70 mb-8 leading-relaxed">Comprehensive screening (T3, T4, TSH) to ensure optimal thyroid function and hormone regulation.</p>
                <a href="https://wa.me/917499753643?text=Hello%20Suyash%20Lab,%20I%20want%20to%20book%20a%20Thyroid%20Profile%20test." target="_blank" rel="noreferrer" className="text-xs font-outfit uppercase tracking-widest font-bold text-clay hover:text-clay-dark flex items-center gap-2 group-hover:gap-3 transition-all">
                  Book Now <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Test 3 */}
              <div className="bg-white border border-moss/10 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-moss/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-clay/10 transition-colors">
                  <Activity className="w-6 h-6 text-clay" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-moss mb-3">Vitamin B12</h3>
                <p className="text-sm font-sans text-charcoal/70 mb-8 leading-relaxed">Crucial marker for nerve health, energy levels, and preventing macrocytic anemia.</p>
                <a href="https://wa.me/917499753643?text=Hello%20Suyash%20Lab,%20I%20want%20to%20book%20a%20Vitamin%20B12%20test." target="_blank" rel="noreferrer" className="text-xs font-outfit uppercase tracking-widest font-bold text-clay hover:text-clay-dark flex items-center gap-2 group-hover:gap-3 transition-all">
                  Book Now <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Pathologist Profile */}
          <div className="max-w-4xl mx-auto bg-white border border-moss/10 rounded-[3rem] p-8 md:p-12 shadow-xl mb-16 flex flex-col md:flex-row gap-8 items-center" id="profile">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-cream shadow-inner bg-moss/5">
              <img src={doctorImg} alt="Dr. Ajit Chavan" className="w-full h-full object-cover object-top scale-[1.05] -translate-x-3 contrast-125 brightness-105 saturate-110" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-clay font-bold block mb-2">Lead Pathologist</span>
              <h3 className="text-3xl font-outfit font-bold text-moss mb-2">Dr. Ajit Chavan</h3>
              <p className="text-sm font-sans font-medium text-moss/70 mb-4">MBBS, DCP (Pathology)</p>
              <p className="text-sm text-charcoal/70 leading-relaxed font-sans mb-6">
                With over 25 years of experience in clinical pathology, Dr. Ajit Chavan ensures every test result is meticulously verified for accuracy. Our laboratory operates under strict quality control protocols to provide reliable diagnostics you can trust.
              </p>
              <a 
                href="https://wa.me/917499753643"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-moss text-cream text-xs font-outfit uppercase tracking-widest font-bold rounded-full transition-all duration-300 hover:bg-moss/90 shadow-md"
              >
                <Phone className="w-4 h-4" /> Consult on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="max-w-2xl mx-auto bg-cream-light border border-moss/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden" id="contact">
            <div className="absolute top-0 right-0 w-32 h-32 bg-moss/5 rounded-bl-[8rem] pointer-events-none" />
            
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-clay font-bold block mb-2">
                Laboratory Information
              </span>
              <h3 className="text-2xl md:text-3xl font-outfit font-bold text-moss">
                Get in Touch
              </h3>
              <p className="text-xs text-charcoal/60 mt-4 leading-relaxed font-sans">
                For inquiries regarding test availability, specific diagnostic requirements, or home collection scheduling, please contact us directly.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-moss/10 pb-4">
                <div className="w-12 h-12 rounded-full bg-cream border border-moss/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-clay" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-moss/70 mb-1">Direct Line</p>
                  <p className="text-sm font-sans font-medium text-moss">+91 74997 53643</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 border-b border-moss/10 pb-4">
                <div className="w-12 h-12 rounded-full bg-cream border border-moss/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-clay" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-moss/70 mb-1">Operating Hours</p>
                  <p className="text-sm font-sans font-medium text-moss">Open 24/7</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cream border border-moss/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-clay" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-moss/70 mb-1">Location</p>
                  <a href="https://maps.app.goo.gl/mW9qfNMBLCGKTnDK7" target="_blank" rel="noreferrer" className="text-sm font-sans font-medium text-moss hover:text-clay transition-colors underline decoration-moss/30 underline-offset-4">Suyash Pathology Laboratory, Main Clinic</a>
                </div>
              </div>
            </div>
            
            <a 
              href="https://wa.me/917499753643"
              target="_blank"
              rel="noreferrer"
              className="mt-8 magnetic-btn w-full py-4 bg-clay text-cream hover:bg-clay-dark text-xs font-outfit uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-lg shadow-clay/20 flex items-center justify-center gap-2 border border-clay"
            >
              <span>Message on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal text-cream rounded-t-[3rem] md:rounded-t-[4rem] px-6 md:px-16 pt-20 pb-10 border-t border-moss/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-moss/10 pb-16 mb-8">
          <div>
            <div className="flex items-center gap-2 select-none mb-3">
              <Dna className="w-6 h-6 text-clay animate-pulse-slow" />
              <span className="font-outfit font-black tracking-wider text-xl text-cream">SUYASH LAB</span>
            </div>
            <p className="text-xs text-cream/50 max-w-sm font-sans leading-relaxed">
              Supervised pathology and advanced diagnostics, ensuring clinical precision for patients and physicians.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-mono text-cream/40">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39ff14]"></span>
            </span>
            <span>SYSTEM OPERATIONAL — CORE DIAGNOSTIC LIVE</span>
          </div>
          <div>
            © {new Date().getFullYear()} Suyash Pathology Laboratory. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Language Prompt Modal */}
      {showLangPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-moss/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center relative border border-moss/10">
            <Globe className="w-12 h-12 text-clay mx-auto mb-4" />
            <h3 className="text-2xl font-outfit font-bold text-moss mb-2">Welcome to Suyash Lab</h3>
            <p className="text-sm font-sans text-charcoal/70 mb-6">
              Would you like to view the website in Marathi?<br/>
              तुम्हाला ही वेबसाईट मराठीत पाहायची आहे का?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleLangChoice('mr')}
                className="w-full py-3.5 bg-clay text-cream text-sm font-outfit uppercase tracking-widest font-bold rounded-full transition-all hover:bg-clay-dark"
              >
                Yes / होय
              </button>
              <button 
                onClick={() => handleLangChoice('en')}
                className="w-full py-3.5 bg-transparent border border-moss/20 text-moss hover:bg-moss/5 text-sm font-outfit uppercase tracking-widest font-bold rounded-full transition-all"
              >
                No, stay in English
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ad Prompt Modal */}
      {showAdPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-moss/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-moss text-cream rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl text-center relative overflow-hidden border border-moss/20">
            <button 
              onClick={closeAdPrompt}
              className="absolute top-6 right-6 text-cream/50 hover:text-clay transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <Activity className="w-12 h-12 text-clay mx-auto mb-4" />
            <span className="text-[10px] font-mono text-clay uppercase tracking-widest font-bold block mb-2">
              New Tests Available
            </span>
            <h3 className="text-3xl font-outfit font-bold mb-4">
              Vitamin D, Thyroid & B12
            </h3>
            <p className="text-sm font-sans text-cream/70 mb-8 leading-relaxed">
              These essential wellness tests are now available at Suyash Lab at reasonable rates. Ensure your health is on track with our highly accurate, doctor-verified diagnostic profiles.
            </p>
            <a 
              href="https://wa.me/917499753643?text=Hello%20Suyash%20Lab,%20I%20would%20like%20to%20book%20a%20test%20for%20Vitamin%20D/Thyroid/B12."
              target="_blank"
              rel="noreferrer"
              onClick={closeAdPrompt}
              className="w-full block py-4 bg-clay hover:bg-clay-dark text-cream text-xs font-outfit uppercase tracking-widest font-bold rounded-full transition-all shadow-lg"
            >
              Book Now via WhatsApp
            </a>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
