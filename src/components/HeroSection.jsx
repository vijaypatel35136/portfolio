import React from 'react';
import { ShoppingBag, ChevronDown } from 'lucide-react';

export default function HeroSection({ mousePos, scrollToSection, setCursorVariant, settings }) {
    const { hero } = settings;

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative px-6 pt-20">
            <div className="relative z-10 text-center max-w-6xl">
                <div className="mb-8">
                    <div className="relative inline-block">
                        <ShoppingBag className="w-28 h-28 text-orange-400 animate-pulse" />
                        <div className="absolute inset-0 bg-orange-400/20 blur-2xl"></div>
                    </div>
                </div>

                <h1
                    className="text-8xl md:text-9xl font-black mb-8 leading-none transition-all duration-200"
                    style={{
                        background: 'linear-gradient(135deg, #fb923c, #fbbf24, #fcd34d)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 80px rgba(251, 146, 60, 0.5)',
                        transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`,
                    }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    {hero.mainHeading}
                </h1>

                <div
                    className="text-5xl md:text-6xl font-bold mb-8 tracking-wider transition-all duration-200"
                    style={{
                        transform: `translate(${mousePos.x * -0.008}px, ${mousePos.y * -0.008}px)`,
                    }}
                >
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                        {hero.subHeading}
                    </span>
                </div>

                <p
                    className="text-2xl md:text-3xl text-gray-400 mb-12 font-light max-w-3xl mx-auto transition-all duration-200"
                    style={{
                        transform: `translate(${mousePos.x * 0.005}px, ${mousePos.y * 0.005}px)`,
                    }}
                >
                    {hero.description}
                </p>

                <div className="flex gap-6 justify-center flex-wrap">
                    <button
                        onClick={() => scrollToSection('work')}
                        className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 px-10 py-4 rounded-full font-bold text-lg overflow-hidden"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <span className="relative z-10">{hero.primaryButtonText}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="group relative border-2 border-orange-400 px-10 py-4 rounded-full font-bold text-lg overflow-hidden"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <span className="relative z-10">{hero.secondaryButtonText}</span>
                        <div className="absolute inset-0 bg-orange-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </button>
                </div>

                <div className="mt-16 animate-bounce">
                    <ChevronDown className="w-10 h-10 mx-auto text-orange-400" />
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-orange-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>
        </section>
    );
}