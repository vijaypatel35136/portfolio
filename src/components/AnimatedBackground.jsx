import React from 'react';

export default function AnimatedBackground({ mousePos }) {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div
                className="absolute w-96 h-96 bg-orange-600/30 rounded-full blur-3xl transition-all duration-300"
                style={{
                    left: `${mousePos.x * 0.02}px`,
                    top: `${mousePos.y * 0.02}px`,
                }}
            />
            <div
                className="absolute w-96 h-96 bg-yellow-600/30 rounded-full blur-3xl transition-all duration-300"
                style={{
                    right: `${mousePos.x * -0.02}px`,
                    bottom: `${mousePos.y * -0.02}px`,
                }}
            />
            <div
                className="absolute w-96 h-96 bg-amber-600/20 rounded-full blur-3xl transition-all duration-300"
                style={{
                    left: `${50 + mousePos.x * 0.01}%`,
                    top: `${50 + mousePos.y * 0.01}%`,
                }}
            />
        </div>
    );
}
