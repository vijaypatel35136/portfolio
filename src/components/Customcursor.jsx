import React from 'react';

export default function CustomCursor({ mousePos, cursorVariant }) {
    return (
        <>
            <div
                className="fixed w-6 h-6 border-2 border-orange-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 2 : 1})`
                }}
            />
            <div
                className="fixed w-2 h-2 bg-orange-400 rounded-full pointer-events-none z-50 mix-blend-difference"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </>
    );
}