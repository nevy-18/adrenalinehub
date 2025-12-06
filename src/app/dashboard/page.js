'use client';
import React, { useState, useRef, useEffect } from "react";
import LoginForm from '@/app/login/LoginForm';

// --- ICONS ---
const CheckCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const Users = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Zap = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const Mail = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;

// --- BEFORE/AFTER SLIDER COMPONENT ---
const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50); 
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize group"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
         <span className="text-white opacity-20 text-9xl font-black">AFTER</span>
      </div>
      <div 
        className="absolute inset-0 bg-gray-200 flex items-center justify-center border-r-4 border-white"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: isDragging ? 'none' : 'clip-path 0.1s ease-out' 
        }}
      >
        <span className="text-black opacity-20 text-9xl font-black">BEFORE</span>
      </div>
      <div 
        className="absolute inset-y-0"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute inset-y-0 -left-px w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600">
           <Zap className="w-4 h-4 fill-current" />
        </div>
      </div>
    </div>
  );
};


const KeyFeatures = () => {
  const features = [
    {
      title: "Personalized Plans",
      desc: "AI-driven workout routines tailored specifically to your body type and goals.",
      icon: <Zap className="w-8 h-8 text-cyan-400" />
    },
    {
      title: "Expert Community",
      desc: "Join thousands of athletes sharing tips, progress, and motivation daily.",
      icon: <Users className="w-8 h-8 text-cyan-400" />
    },
    {
      title: "Real-time Tracking",
      desc: "Visualize your progress with advanced analytics and before/after comparisons.",
      icon: <CheckCircle className="w-8 h-8 text-cyan-400" />
    }
  ];

  return (
    <section className="bg-[#0f172a] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16 uppercase italic">
          Why <span className="text-cyan-400">Adrenaline</span> Hub?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-cyan-400 transition-colors">
              <div className="mb-4 bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center border border-gray-700">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand / About */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-black italic uppercase mb-4 text-cyan-400">Adrenaline Hub</h3>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            We are dedicated to transforming lives through fitness. Our platform connects you with the tools, knowledge, and community you need to reach your peak performance.
          </p>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-bold text-lg mb-4 uppercase tracking-wider">Help & Support</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-lg mb-4 uppercase tracking-wider">Contact Us</h4>
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <Mail className="w-5 h-5" />
            <a href="mailto:support@adrenalinehub.com" className="hover:text-cyan-400 transition-colors">
              support@adrenalinehub.com
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Available Mon-Fri<br/>9AM - 6PM EST
          </p>
        </div>
      </div>
      
      <div className="text-center text-gray-600 text-sm pt-8 border-t border-gray-900">
        &copy; {new Date().getFullYear()} Adrenaline Hub. All rights reserved.
      </div>
    </footer>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  // If login is shown, we render just the login form centered
  if (showLogin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center animate-in fade-in duration-500">
        <LoginForm />
        {/* Optional: Button to go back to home */}
        <button 
          onClick={() => setShowLogin(false)}
          className="absolute top-8 left-8 text-gray-400 hover:text-white underline"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Otherwise, render the Landing Page
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION (Slider + CTA) */}
      <div className="relative h-screen w-full">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <BeforeAfterSlider />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col justify-end items-center pb-20 px-4 text-center pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-black text-white italic mb-4 drop-shadow-2xl uppercase tracking-tighter">
            Transform Your Body
          </h1>
          <p className="text-gray-200 mb-8 max-w-lg drop-shadow-md text-lg">
            Drag the slider to see the results. Join Adrenaline Hub today to start your journey.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="pointer-events-auto bg-[#6C90A7] hover:bg-[#5a7d91] text-white text-xl font-bold px-12 py-4 rounded-full shadow-[0_0_20px_rgba(108,144,167,0.5)] transition-all active:scale-95 hover:scale-105"
          >
            Get Started
          </button>
          
          {/* Scroll Indicator */}
          <div className="mt-12 animate-bounce text-gray-400">
            <span className="text-sm uppercase tracking-widest">Scroll for more</span>
            <svg className="w-6 h-6 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </div>
        </div>
      </div>

      {/* 2. KEY FEATURES */}
      <KeyFeatures />

      {/* 3. FOOTER (About, Help, Email) */}
      <Footer />

    </div>
  );
}