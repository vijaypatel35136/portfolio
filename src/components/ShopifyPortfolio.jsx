import React, { useState, useEffect } from 'react';
import { Download, Save, CheckCircle } from 'lucide-react';

// Component imports
import CustomCursor from './Customcursor';
import AnimatedBackground from './AnimatedBackground';
import AdminLoginModal from './AdminLoginModal';
import ProjectModal from './ProjectModal';
import MessagesPanel from './MessagesPanel';
import DataViewer from './DataViewer';
import SettingsModal from './SettingsModal';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import MarqueeStats from './MarqueeStats';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

// Data imports
import { initialProjects } from '../data/projects';
import { initialTabs } from '../data/tabs';
import { defaultSettings } from '../data/settings';

// API configuration
// For GitHub Pages: use your deployed backend URL (e.g., Render, Railway, Vercel)
// For local development: use localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function ShopifyPortfolio() {

    /* ===================== STATE ===================== */
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [scrolled, setScrolled] = useState(false);

    const [activeTab, setActiveTab] = useState('shopify');
    const [showMore, setShowMore] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);

    const [editingProject, setEditingProject] = useState(null);
    const [showProjectModal, setShowProjectModal] = useState(false);

    const [showMessages, setShowMessages] = useState(false);
    const [showDataViewer, setShowDataViewer] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showExportNotification, setShowExportNotification] = useState(false);
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const [loading, setLoading] = useState(true);
    const [backendAvailable, setBackendAvailable] = useState(false);

    // Settings state
    const [settings, setSettings] = useState(defaultSettings);

    // Consolidated portfolio data - single source of truth
    const [portfolioData, setPortfolioData] = useState({
        projects: initialProjects,
        tabs: initialTabs,
        messages: []
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: ''
    });

    /* ===================== CHECK BACKEND AVAILABILITY ===================== */
    useEffect(() => {
        const checkBackend = async () => {
            try {
                const response = await fetch(`${API_URL}/health`, { 
                    method: 'GET',
                    timeout: 2000 
                });
                setBackendAvailable(response.ok);
            } catch (error) {
                setBackendAvailable(false);
                console.log('Backend not available - using localStorage only');
            }
        };
        
        checkBackend();
    }, []);

    /* ===================== AUTO-SAVE TO SOURCE FILES ===================== */
    const saveToSourceFiles = async (portfolioData, settings) => {
        if (!backendAvailable) {
            console.log('Backend not available - data saved to localStorage only');
            return false;
        }

        try {
            const response = await fetch(`${API_URL}/save-all`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    portfolioData,
                    settings
                })
            });

            const result = await response.json();
            
            if (result.success) {
                console.log('✅ Data auto-saved to source files!');
                setShowSaveNotification(true);
                setTimeout(() => setShowSaveNotification(false), 3000);
                return true;
            } else {
                console.error('❌ Failed to save:', result.error);
                return false;
            }
        } catch (error) {
            console.error('❌ Error saving to backend:', error);
            setBackendAvailable(false);
            return false;
        }
    };

    /* ===================== LOAD FROM STORAGE ===================== */
    useEffect(() => {
        try {
            // Load admin status
            const admin = localStorage.getItem('admin-logged-in');
            if (admin === 'true') setIsAdmin(true);

            // Load all portfolio data from single storage key
            const storedData = localStorage.getItem('portfolio-data');
            if (storedData) {
                const parsed = JSON.parse(storedData);
                setPortfolioData(parsed);
            }

            // Load settings
            const storedSettings = localStorage.getItem('portfolio-settings');
            if (storedSettings) {
                const parsed = JSON.parse(storedSettings);
                setSettings(parsed);
            }
        } catch (err) {
            console.error('Storage load error:', err);
        } finally {
            setLoading(false);
        }

        // Listen for storage changes (when data is updated in another tab or from admin panel)
        const handleStorageChange = (e) => {
            if (e.key === 'portfolio-settings' && e.newValue) {
                try {
                    const updated = JSON.parse(e.newValue);
                    setSettings(updated);
                    console.log('✅ Settings updated from storage');
                } catch (err) {
                    console.error('Error parsing updated settings:', err);
                }
            }
            if (e.key === 'portfolio-data' && e.newValue) {
                try {
                    const updated = JSON.parse(e.newValue);
                    setPortfolioData(updated);
                    console.log('✅ Portfolio data updated from storage');
                } catch (err) {
                    console.error('Error parsing updated portfolio data:', err);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    /* ===================== SAVE TO STORAGE & FILES ===================== */
    useEffect(() => {
        if (!loading) {
            // Save to localStorage (for immediate use)
            localStorage.setItem('portfolio-data', JSON.stringify(portfolioData));
            
            // Also save to actual source files via backend (if admin)
            if (isAdmin) {
                saveToSourceFiles(portfolioData, settings);
            }
        }
    }, [portfolioData, loading, isAdmin]);

    useEffect(() => {
        if (!loading) {
            // Always save settings to localStorage
            // This ensures changes persist on GitHub Pages and in local development
            localStorage.setItem('portfolio-settings', JSON.stringify(settings));
        }
    }, [settings, loading]);

    /* ===================== CHECK URL FOR ADMIN ROUTE (HASH-BASED) ===================== */
    useEffect(() => {
        const checkAdminRoute = () => {
            // Check hash for admin route (works with GitHub Pages)
            const hash = window.location.hash;
            
            // Check if hash contains admin in any form
            const isAdminRoute = hash === '#/admin' || 
                                 hash === '#admin' || 
                                 hash.includes('/admin');
            
            if (isAdminRoute) {
                const admin = localStorage.getItem('admin-logged-in');
                if (admin !== 'true') {
                    setShowAdminLogin(true);
                } else {
                    setIsAdmin(true);
                }
            }
        };

        checkAdminRoute();

        // Listen for hash changes (primary for GitHub Pages)
        window.addEventListener('hashchange', checkAdminRoute);
        // Listen for popstate (back/forward navigation)
        window.addEventListener('popstate', checkAdminRoute);
        
        return () => {
            window.removeEventListener('hashchange', checkAdminRoute);
            window.removeEventListener('popstate', checkAdminRoute);
        };
    }, []);

    /* ===================== GLOBAL EVENTS ===================== */
    useEffect(() => {
        const handleMouseMove = e => setMousePos({ x: e.clientX, y: e.clientY });
        const handleScroll = () => setScrolled(window.scrollY > 50);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /* ===================== HELPERS ===================== */
    const scrollToSection = id => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAdminLogin = () => {
        setIsAdmin(true);
        setShowAdminLogin(false);
        localStorage.setItem('admin-logged-in', 'true');
        // Use hash-based routing for GitHub Pages compatibility
        window.location.hash = '#/admin';
    };

    const handleLogout = () => {
        setIsAdmin(false);
        localStorage.setItem('admin-logged-in', 'false');
        // Return to home
        window.location.hash = '';
        // Reload to load the latest saved settings from files
        setTimeout(() => window.location.reload(), 500);
    };

    const handleSubmitForm = e => {
        e.preventDefault();

        const newMessage = {
            id: Date.now(),
            ...formData,
            date: new Date().toLocaleString()
        };

        setPortfolioData(prev => ({
            ...prev,
            messages: [newMessage, ...prev.messages]
        }));

        alert('Message sent successfully!');

        setFormData({
            name: '',
            email: '',
            phone: '',
            description: ''
        });
    };

    const deleteProject = (category, projectId) => {
        if (!window.confirm('Delete this project?')) return;

        setPortfolioData(prev => ({
            ...prev,
            projects: {
                ...prev.projects,
                [category]: prev.projects[category].filter(p => p.id !== projectId)
            }
        }));
    };

    const saveProject = (projectData, newTabData) => {
        let category = projectData.category || activeTab;

        // Handle new tab creation
        if (newTabData?.name) {
            const newTabId = newTabData.name.toLowerCase().replace(/\s+/g, '-');

            setPortfolioData(prev => {
                const tabExists = prev.tabs.find(t => t.id === newTabId);
                
                return {
                    ...prev,
                    tabs: tabExists ? prev.tabs : [...prev.tabs, {
                        id: newTabId,
                        name: newTabData.name,
                        icon: newTabData.icon
                    }],
                    projects: {
                        ...prev.projects,
                        [newTabId]: prev.projects[newTabId] || []
                    }
                };
            });

            category = newTabId;
            setActiveTab(newTabId);
        }

        // Save or update project
        setPortfolioData(prev => ({
            ...prev,
            projects: {
                ...prev.projects,
                [category]: editingProject
                    ? prev.projects[category].map(p =>
                        p.id === editingProject.id ? { ...projectData, id: p.id } : p
                    )
                    : [{ ...projectData, id: Date.now() }, ...(prev.projects[category] || [])]
            }
        }));

        setEditingProject(null);
        setShowProjectModal(false);
    };

    const updateMessages = (newMessages) => {
        setPortfolioData(prev => ({
            ...prev,
            messages: newMessages
        }));
    };

    const handleSaveSettings = async (newSettings) => {
        setSettings(newSettings);
        setShowSettings(false);
        
        // Settings are automatically saved to localStorage via the useEffect hook
        // Force a page reload to ensure settings are reflected everywhere
        setTimeout(() => {
            window.location.reload();
        }, 500);
        
        // If backend is available (local dev), also save to settings.js
        if (backendAvailable) {
            const success = await saveToSourceFiles(portfolioData, newSettings);
            if (success) {
                console.log('✅ Settings also saved to settings.js!');
            }
        }
    };

    /* ===================== MANUAL SAVE TO FILES ===================== */
    const handleManualSaveToFiles = async () => {
        const success = await saveToSourceFiles(portfolioData, settings);
        
        if (success) {
            alert('✅ Data saved to source files!\n\nYou can now share your project folder and all changes will be included!');
        } else {
            alert('❌ Backend server is not running!\n\nTo enable auto-save to files:\n1. Create backend/server.js\n2. Run: node backend/server.js\n3. Try saving again\n\nFor now, data is saved to localStorage only.');
        }
    };

    /* ===================== EXPORT FUNCTIONS ===================== */
    const generateProjectsJS = () => {
        const projects = portfolioData.projects;
        return `// Auto-generated from admin panel
// Last updated: ${new Date().toLocaleString()}

export const initialProjects = ${JSON.stringify(projects, null, 4)};`;
    };

    const generateTabsJS = () => {
        const tabs = portfolioData.tabs;
        return `// Auto-generated from admin panel
// Last updated: ${new Date().toLocaleString()}

export const initialTabs = ${JSON.stringify(tabs, null, 4)};`;
    };

    const generateSettingsJS = () => {
        return `// Auto-generated from admin panel
// Last updated: ${new Date().toLocaleString()}

export const defaultSettings = ${JSON.stringify(settings, null, 4)};`;
    };

    const generateMessagesJS = () => {
        const messages = portfolioData.messages || [];
        return `// Auto-generated from admin panel
// Last updated: ${new Date().toLocaleString()}

export const initialMessages = ${JSON.stringify(messages, null, 4)};`;
    };

    const downloadFile = (content, filename) => {
        const blob = new Blob([content], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const exportAllJSFiles = () => {
        // Export projects.js
        downloadFile(generateProjectsJS(), 'projects.js');
        
        setTimeout(() => {
            // Export tabs.js
            downloadFile(generateTabsJS(), 'tabs.js');
        }, 300);

        setTimeout(() => {
            // Export settings.js
            downloadFile(generateSettingsJS(), 'settings.js');
        }, 600);

        setTimeout(() => {
            // Export messages.js
            downloadFile(generateMessagesJS(), 'messages.js');
        }, 900);

        setShowExportNotification(true);
        setTimeout(() => setShowExportNotification(false), 8000);
    };

    /* ===================== COMPUTED ===================== */
    const currentProjects = portfolioData.projects[activeTab] || [];
    const displayedProjects = showMore ? currentProjects : currentProjects.slice(0, 6);

    /* ===================== LOADING ===================== */
    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-2xl animate-pulse">Loading...</div>
            </div>
        );
    }

    /* ===================== RENDER ===================== */
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">

            <CustomCursor mousePos={mousePos} cursorVariant={cursorVariant} />
            <AnimatedBackground mousePos={mousePos} />

            {/* Backend Status Indicator */}
            {isAdmin && (
                <div className="fixed top-24 left-6 z-40 bg-zinc-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-800 text-xs">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${backendAvailable ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                        <span className="text-gray-400">
                            {backendAvailable ? 'Auto-save: ON' : 'Auto-save: OFF (localStorage only)'}
                        </span>
                    </div>
                </div>
            )}

            {/* Save Success Notification */}
            {showSaveNotification && (
                <div className="fixed top-24 right-6 z-50 bg-green-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-2xl animate-pulse">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Saved to source files!</span>
                    </div>
                </div>
            )}

            {/* Export Notification */}
            {showExportNotification && (
                <div className="fixed top-24 right-6 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl">
                    <div className="flex items-center gap-3">
                        <Download className="w-6 h-6" />
                        <div>
                            <p className="font-bold">Files Downloaded!</p>
                            <p className="text-sm">Replace them in src/data/ folder</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Admin Action Buttons - Floating */}
            {isAdmin && (
                <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
                    {/* Manual Save Button (if backend not available) */}
                    {!backendAvailable && (
                        <button
                            onClick={handleManualSaveToFiles}
                            className="group bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all"
                            title="Save to Source Files (Manual)"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>
                    )}
                    
                    {/* Export All Files Button */}
                    <button
                        onClick={exportAllJSFiles}
                        className="group bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all"
                        title="Export All Data as JS Files"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            )}

            {/* Admin Login Modal */}
            {showAdminLogin && (
                <AdminLoginModal
                    onClose={() => {
                        setShowAdminLogin(false);
                        // Go back to home if closing login
                        window.location.hash = '';
                        if (window.location.pathname.includes('/admin')) {
                            window.history.pushState({}, '', window.location.pathname.replace('/admin', ''));
                        }
                    }}
                    onLogin={handleAdminLogin}
                />
            )}

            {/* Project Modal */}
            {showProjectModal && (
                <ProjectModal
                    editingProject={editingProject}
                    onClose={() => {
                        setEditingProject(null);
                        setShowProjectModal(false);
                    }}
                    onSave={saveProject}
                    tabs={portfolioData.tabs}
                    activeTab={activeTab}
                />
            )}

            {/* Messages Panel */}
            {showMessages && (
                <MessagesPanel
                    messages={portfolioData.messages}
                    setMessages={updateMessages}
                    setShowMessages={setShowMessages}
                />
            )}

            {/* Data Viewer */}
            {showDataViewer && (
                <DataViewer 
                    onClose={() => setShowDataViewer(false)} 
                />
            )}

            {/* Settings Modal */}
            {showSettings && (
                <SettingsModal
                    settings={settings}
                    onClose={() => setShowSettings(false)}
                    onSave={handleSaveSettings}
                />
            )}

            {/* Navigation */}
            <Navigation
                scrolled={scrolled}
                isAdmin={isAdmin}
                messages={portfolioData.messages}
                scrollToSection={scrollToSection}
                onLogout={handleLogout}
                onMessagesClick={() => setShowMessages(true)}
                onDataViewerClick={() => setShowDataViewer(true)}
                onSettingsClick={() => setShowSettings(true)}
                setCursorVariant={setCursorVariant}
                settings={settings}
            />

            {/* Hero Section */}
            <HeroSection
                mousePos={mousePos}
                scrollToSection={scrollToSection}
                setCursorVariant={setCursorVariant}
                settings={settings}
            />

            {/* Marquee Stats */}
            <MarqueeStats settings={settings} />

            {/* Projects Section */}
            <ProjectsSection
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={portfolioData.tabs}
                allProjects={portfolioData.projects}
                displayedProjects={displayedProjects}
                showMore={showMore}
                setShowMore={setShowMore}
                currentProjects={currentProjects}
                isAdmin={isAdmin}
                onAddProject={() => setShowProjectModal(true)}
                onEditProject={project => {
                    setEditingProject(project);
                    setShowProjectModal(true);
                }}
                onDeleteProject={deleteProject}
                setCursorVariant={setCursorVariant}
                settings={settings}
            />

            {/* Skills Section */}
            <SkillsSection 
                setCursorVariant={setCursorVariant}
                settings={settings}
            />

            {/* Contact Section */}
            <ContactSection
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmitForm}
                setCursorVariant={setCursorVariant}
                settings={settings}
            />

            {/* Footer */}
            <Footer settings={settings} />
        </div>
    );
}