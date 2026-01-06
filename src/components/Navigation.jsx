import React from 'react';
import { LogOut, MessageSquare, Database, Settings } from 'lucide-react';

export default function Navigation({
    scrolled,
    isAdmin,
    messages,
    scrollToSection,
    onLogout,
    onMessagesClick,
    onDataViewerClick,
    onSettingsClick,
    setCursorVariant,
    settings = { branding: { logoUrl: '', logoText: 'PORTFOLIO', useImageLogo: false, logoSize: 'medium', logoHeight: 48 } }
}) {
    const menuItems = ['Home', 'Work', 'Skills', 'Contact'];

    // Use logo from settings
    const { branding = { logoUrl: '', logoText: 'PORTFOLIO', useImageLogo: false, logoSize: 'medium', logoHeight: 48 } } = settings;
    const showLogo = branding.useImageLogo && branding.logoUrl;

    // Logo size mapping
    const logoSizeClasses = {
        'small': 'h-8',      // 32px
        'medium': 'h-12',    // 48px
        'large': 'h-16',     // 64px
        'extra-large': 'h-20' // 80px
    };

    // Get logo height (use custom height if set, otherwise use size class)
    const getLogoStyle = () => {
        if (branding.logoHeight && branding.logoHeight !== 48) {
            return { height: `${branding.logoHeight}px` };
        }
        return {};
    };

    const logoClass = logoSizeClasses[branding.logoSize] || logoSizeClasses['medium'];

    return (
        <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                <div
                    className="hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    onClick={() => scrollToSection('home')}
                >
                    {showLogo ? (
                        <img 
                            src={branding.logoUrl} 
                            alt="Logo" 
                            className={`${logoClass} w-auto object-contain transition-all duration-300`}
                            style={getLogoStyle()}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                    ) : null}
                    <span 
                        className={`text-3xl font-black bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent ${showLogo ? 'hidden' : ''}`}
                    >
                        {branding.logoText}
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    {/* Show menu items only when NOT admin */}
                    {!isAdmin && menuItems.map(item => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="relative group text-lg font-semibold"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <span className="relative z-10">{item}</span>
                            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </button>
                    ))}
                    
                    {/* Show admin controls only when IS admin */}
                    {isAdmin && (
                        <>
                            <button
                                onClick={onSettingsClick}
                                className="p-2 hover:text-purple-400 transition-colors"
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                title="Edit Settings"
                            >
                                <Settings className="w-6 h-6" />
                            </button>
                            <button
                                onClick={onDataViewerClick}
                                className="p-2 hover:text-blue-400 transition-colors"
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                title="View All Data"
                            >
                                <Database className="w-6 h-6" />
                            </button>
                            <button
                                onClick={onMessagesClick}
                                className="relative p-2 hover:text-orange-400 transition-colors"
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <MessageSquare className="w-6 h-6" />
                                {messages.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                                        {messages.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={onLogout}
                                className="p-2 hover:text-red-400 transition-colors"
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <LogOut className="w-6 h-6" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}