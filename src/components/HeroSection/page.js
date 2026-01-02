'use client';
import React, { useState, useEffect } from 'react';
import { getBeastTheme } from '@/components/Beastmode/page';

export default function HeroSection({ isBeastMode }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const theme = getBeastTheme(isBeastMode);

    const heroSlides = [
        { id: 1, subtitle: "HEAVY DUTY GEAR", title: "BUILD YOUR", highlight: "DREAM GYM", gradient: isBeastMode ? "from-red-900 to-black" : "from-blue-900 to-cyan-900", texture: "https://www.transparenttextures.com/patterns/diagmonds-light.png" },
        { id: 2, subtitle: "PERFORMANCE WEAR", title: "UNLEASH YOUR", highlight: "TRUE POWER", gradient: isBeastMode ? "from-orange-900 to-black" : "from-purple-900 to-pink-900", texture: "https://www.transparenttextures.com/patterns/carbon-fibre.png" },
        { id: 3, subtitle: "HOME ESSENTIALS", title: "TRAIN HARD", highlight: "STAY STRONG", gradient: "from-gray-800 to-black", texture: "https://www.transparenttextures.com/patterns/cubes.png" }
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    return (
        <div className="relative w-full h-[250px] md:h-[400px] 2xl:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-16">
            {/* Slides Content */}
            {heroSlides.map((slide, index) => (
                <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 bg-gradient-to-r ${slide.gradient} flex items-center ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('${slide.texture}')` }}></div>
                    <div className="relative z-10 px-8 md:px-16 w-full">
                        <h3 className={`${theme.text} font-bold text-sm md:text-lg mb-2 uppercase`}>{slide.subtitle}</h3>
                        <h1 className="text-5xl md:text-7xl font-black italic text-white uppercase leading-none">
                            {slide.title} <br />
                            <span className="text-gray-400">{slide.highlight}</span>
                        </h1>
                    </div>
                </div>
            ))}

            {/* RESTORED: Clickable Slide Indicators (Bottom Left) */}
            <div className="absolute bottom-6 left-8 md:left-16 z-20 flex gap-3">
                {heroSlides.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentSlide(index)} 
                        className={`transition-all duration-300 rounded-full shadow-lg ${
                            currentSlide === index 
                            ? `w-8 h-3 ${isBeastMode ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'}` 
                            : "w-3 h-3 bg-white/30 hover:bg-white"
                        }`} 
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}