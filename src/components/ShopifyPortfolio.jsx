import React, { useState, useEffect, useRef } from 'react';
import { Code, ShoppingBag, Zap, Award, Mail, Github, Linkedin, ExternalLink, ChevronDown, Sparkles, TrendingUp, Package, FileCode, Blocks, Settings, Trash2, Edit, Plus, X, LogOut, LayoutDashboard, MessageSquare } from 'lucide-react';

export default function ShopifyPortfolio() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('shopify');
    const [showMore, setShowMore] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [editingProject, setEditingProject] = useState(null);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [messages, setMessages] = useState([]);
    const [showMessages, setShowMessages] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: ''
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        const handleScroll = () => setScrolled(window.scrollY > 50);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAdminLogin = () => {
        const ADMIN_USERNAME = 'VijayBhesaniya';
        const ADMIN_PASSWORD = 'VijayBhesaniya35136';

        if (adminUsername === ADMIN_USERNAME && adminPassword === ADMIN_PASSWORD) {
            setIsAdmin(true);
            setShowAdminLogin(false);
            setAdminPassword('');
            setAdminUsername('');
        } else {
            alert('Invalid username or password!');
        }
    };


    const handleSubmitForm = (e) => {
        e.preventDefault();
        const newMessage = {
            id: Date.now(),
            ...formData,
            date: new Date().toLocaleString()
        };
        setMessages([newMessage, ...messages]);
        setFormData({ name: '', email: '', phone: '', description: '' });
        alert('Message sent successfully!');
    };

    const [allProjects, setAllProjects] = useState({
        shopify: [
            {
                id: 1,
                title: "Luxury Fashion Store",
                desc: "Custom Shopify theme with advanced filtering and AR try-on",
                tech: ["Liquid", "React", "Shopify API"],
                color: "from-purple-500 to-pink-500",
                gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
                link: "https://example.com/luxury-fashion"
            },
            {
                id: 2,
                title: "Eco-Friendly Marketplace",
                desc: "Multi-vendor platform with sustainability metrics",
                tech: ["Shopify Plus", "Node.js", "GraphQL"],
                color: "from-green-500 to-teal-500",
                gradient: "bg-gradient-to-br from-green-500/20 to-teal-500/20",
                link: "https://example.com/eco-marketplace"
            },
            {
                id: 3,
                title: "Subscription Box Service",
                desc: "Automated recurring billing with custom portal",
                tech: ["Recharge API", "Liquid", "Vue.js"],
                color: "from-orange-500 to-red-500",
                gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
                link: "https://example.com/subscription-box"
            },
            {
                id: 4,
                title: "B2B Wholesale Platform",
                desc: "Tiered pricing and bulk order management",
                tech: ["Shopify Plus", "Custom Apps", "Webhooks"],
                color: "from-blue-500 to-indigo-500",
                gradient: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20",
                link: "https://example.com/wholesale"
            },
            {
                id: 5,
                title: "Beauty & Cosmetics Store",
                desc: "Quiz-based product recommendations with custom checkout",
                tech: ["Shopify Scripts", "React", "Storefront API"],
                color: "from-pink-500 to-rose-500",
                gradient: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
                link: "https://example.com/beauty"
            },
            {
                id: 6,
                title: "Sports Equipment Shop",
                desc: "Real-time inventory sync across multiple locations",
                tech: ["Liquid", "Shopify POS", "Custom Apps"],
                color: "from-cyan-500 to-blue-500",
                gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
                link: "https://example.com/sports"
            }
        ],
        wordpress: [
            {
                id: 7,
                title: "Corporate Business Site",
                desc: "Full-stack WordPress with custom post types",
                tech: ["WordPress", "PHP", "Advanced CF"],
                color: "from-blue-500 to-cyan-500",
                gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
                link: "https://example.com/corporate"
            },
            {
                id: 8,
                title: "Restaurant Website",
                desc: "Online menu with reservation system integration",
                tech: ["WordPress", "WooCommerce", "REST API"],
                color: "from-orange-500 to-red-500",
                gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
                link: "https://example.com/restaurant"
            }
        ],
        react: [
            {
                id: 9,
                title: "SaaS Dashboard",
                desc: "Analytics platform with real-time data visualization",
                tech: ["React", "D3.js", "Node.js"],
                color: "from-cyan-500 to-blue-500",
                gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
                link: "https://example.com/saas-dashboard"
            },
            {
                id: 10,
                title: "Social Media App",
                desc: "Real-time chat and content sharing platform",
                tech: ["React", "Socket.io", "MongoDB"],
                color: "from-pink-500 to-rose-500",
                gradient: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
                link: "https://example.com/social"
            }
        ]
    });

    const skills = [
        { name: "Shopify Liquid", level: 95, icon: Code },
        { name: "Theme Development", level: 90, icon: Package },
        { name: "Shopify Apps", level: 85, icon: Zap },
        { name: "React/Vue.js", level: 88, icon: Sparkles },
        { name: "GraphQL/REST APIs", level: 82, icon: TrendingUp },
        { name: "Performance Optimization", level: 90, icon: Award }
    ];

    const currentProjects = allProjects[activeTab];
    const displayedProjects = showMore ? currentProjects : currentProjects.slice(0, 6);

    const tabs = [
        { id: 'shopify', name: 'Shopify', icon: ShoppingBag, count: allProjects.shopify.length },
        { id: 'wordpress', name: 'WordPress', icon: FileCode, count: allProjects.wordpress.length },
        { id: 'react', name: 'React', icon: Blocks, count: allProjects.react.length }
    ];

    const deleteProject = (category, projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setAllProjects({
                ...allProjects,
                [category]: allProjects[category].filter(p => p.id !== projectId)
            });
        }
    };

    const saveProject = (projectData) => {
        if (editingProject) {
            setAllProjects({
                ...allProjects,
                [activeTab]: allProjects[activeTab].map(p =>
                    p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p
                )
            });
        } else {
            const newProject = {
                ...projectData,
                id: Date.now()
            };
            setAllProjects({
                ...allProjects,
                [activeTab]: [...allProjects[activeTab], newProject]
            });
        }
        setShowProjectModal(false);
        setEditingProject(null);
    };

    const ProjectModal = () => {
        const [project, setProject] = useState(editingProject || {
            title: '',
            desc: '',
            tech: [],
            color: 'from-purple-500 to-pink-500',
            gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
            link: ''
        });

        const [techInput, setTechInput] = useState('');

        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                <div className="bg-zinc-900 rounded-3xl border border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            {editingProject ? 'Edit Project' : 'Add New Project'}
                        </h3>
                        <button onClick={() => { setShowProjectModal(false); setEditingProject(null); }}>
                            <X className="w-6 h-6 hover:text-red-400 transition-colors" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Project Title</label>
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value })}
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                placeholder="Enter project title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Description</label>
                            <textarea
                                value={project.desc}
                                onChange={(e) => setProject({ ...project, desc: e.target.value })}
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white resize-none"
                                rows="3"
                                placeholder="Enter project description"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Technologies</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && techInput.trim()) {
                                            setProject({ ...project, tech: [...project.tech, techInput.trim()] });
                                            setTechInput('');
                                        }
                                    }}
                                    className="flex-1 px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    placeholder="Type and press Enter"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm flex items-center gap-2">
                                        {tech}
                                        <X
                                            className="w-3 h-3 cursor-pointer hover:text-red-400"
                                            onClick={() => setProject({ ...project, tech: project.tech.filter((_, idx) => idx !== i) })}
                                        />
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Project Link</label>
                            <input
                                type="url"
                                value={project.link}
                                onChange={(e) => setProject({ ...project, link: e.target.value })}
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Color Gradient</label>
                            <select
                                value={project.color}
                                onChange={(e) => {
                                    const color = e.target.value;
                                    const gradient = `bg-gradient-to-br ${color.replace('from', 'from')}/20 ${color.split(' ')[2]}/20`;
                                    setProject({ ...project, color, gradient });
                                }}
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                            >
                                <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                                <option value="from-green-500 to-teal-500">Green to Teal</option>
                                <option value="from-orange-500 to-red-500">Orange to Red</option>
                                <option value="from-blue-500 to-indigo-500">Blue to Indigo</option>
                                <option value="from-pink-500 to-rose-500">Pink to Rose</option>
                                <option value="from-cyan-500 to-blue-500">Cyan to Blue</option>
                            </select>
                        </div>

                        <button
                            onClick={() => saveProject(project)}
                            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                        >
                            {editingProject ? 'Update Project' : 'Add Project'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const MessagesPanel = () => (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Contact Messages ({messages.length})
                    </h3>
                    <button onClick={() => setShowMessages(false)}>
                        <X className="w-6 h-6 hover:text-red-400 transition-colors" />
                    </button>
                </div>

                {messages.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No messages yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className="bg-black/50 border border-zinc-800 rounded-2xl p-6 hover:border-green-500/50 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-green-400">{msg.name}</h4>
                                        <p className="text-sm text-gray-500">{msg.date}</p>
                                    </div>
                                    <button
                                        onClick={() => setMessages(messages.filter(m => m.id !== msg.id))}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-2 text-gray-300">
                                    <p><strong>Email:</strong> {msg.email}</p>
                                    <p><strong>Phone:</strong> {msg.phone}</p>
                                    <p><strong>Message:</strong> {msg.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Custom Cursor */}
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

            {/* Animated Background */}
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

            {/* Admin Login Modal */}
            {showAdminLogin && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                            Admin Login
                        </h3>
                        <input
                            type="text"
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                            placeholder="Enter admin username"
                            className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-green-500 focus:outline-none text-white mb-4"
                        />
                        <input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                            placeholder="Enter admin password"
                            className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-green-500 focus:outline-none text-white mb-4"
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={handleAdminLogin}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setShowAdminLogin(false)}
                                className="flex-1 border border-zinc-800 px-6 py-3 rounded-xl font-bold hover:border-red-500 hover:text-red-500 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showProjectModal && <ProjectModal />}
            {showMessages && <MessagesPanel />}

            {/* Navigation */}
            <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                    <div
                        className="text-3xl font-black bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent hover:scale-110 transition-transform cursor-pointer"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        onClick={() => scrollToSection('home')}
                    >
                        &lt;SHOPIFY/&gt;
                    </div>
                    <div className="flex items-center gap-10">
                        {['Home', 'Work', 'Skills', 'Contact'].map(item => (
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
                        {isAdmin ? (
                            <>
                                <button
                                    onClick={() => setShowMessages(true)}
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
                                    onClick={() => setIsAdmin(false)}
                                    className="p-2 hover:text-red-400 transition-colors"
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    <LogOut className="w-6 h-6" />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setShowAdminLogin(true)}
                                className="p-2 hover:text-orange-400 transition-colors"
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <Settings className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
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
                        SHOPIFY
                    </h1>

                    <div
                        className="text-5xl md:text-6xl font-bold mb-8 tracking-wider transition-all duration-200"
                        style={{
                            transform: `translate(${mousePos.x * -0.008}px, ${mousePos.y * -0.008}px)`,
                        }}
                    >
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                            DEVELOPER
                        </span>
                    </div>

                    <p
                        className="text-2xl md:text-3xl text-gray-400 mb-12 font-light max-w-3xl mx-auto transition-all duration-200"
                        style={{
                            transform: `translate(${mousePos.x * 0.005}px, ${mousePos.y * 0.005}px)`,
                        }}
                    >
                        Transforming visions into high-converting e-commerce experiences
                    </p>

                    <div className="flex gap-6 justify-center flex-wrap">
                        <button
                            onClick={() => scrollToSection('work')}
                            className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 px-10 py-4 rounded-full font-bold text-lg overflow-hidden"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <span className="relative z-10">Explore My Work</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="group relative border-2 border-orange-400 px-10 py-4 rounded-full font-bold text-lg overflow-hidden"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <span className="relative z-10">Let's Talk</span>
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

            {/* Marquee Stats */}
            <section className="py-8 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-y border-orange-500/20 overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="flex items-center gap-16 px-8">
                            <span className="text-3xl font-bold">★ 50+ Projects</span>
                            <span className="text-3xl font-bold">★ 30+ Happy Clients</span>
                            <span className="text-3xl font-bold">★ 5+ Years Experience</span>
                            <span className="text-3xl font-bold">★ 15+ Custom Apps</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section id="work" className="py-32 px-6 relative">
                <div className="flex justify-between items-center max-w-7xl mx-auto mb-12">
                    <div>
                        <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            FEATURED WORK
                        </h2>
                        <p className="text-gray-500 text-xl mt-2">Projects that make an impact</p>
                    </div>
                    {isAdmin && (
                        <button
                            onClick={() => {
                                setEditingProject(null);
                                setShowProjectModal(true);
                            }}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <Plus className="w-5 h-5" />
                            Add Project
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="max-w-4xl mx-auto flex justify-center gap-4 mb-16 flex-wrap">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setShowMore(false);
                            }}
                            className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                                    : 'bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50'
                                }`}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <tab.icon className="w-6 h-6" />
                            <span>{tab.name}</span>
                            <span className={`px-2 py-1 rounded-full text-sm ${activeTab === tab.id ? 'bg-white/20' : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProjects.map((project, i) => (
                        <div
                            key={project.id}
                            className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-500"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <div className={`absolute inset-0 ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            <div className="relative z-10 p-8">
                                {isAdmin && (
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingProject(project);
                                                setShowProjectModal(true);
                                            }}
                                            className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteProject(activeTab, project.id)}
                                            className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-2xl mb-4 flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all`}>
                                    <Code className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 mb-4 text-sm">{project.desc}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((tech, j) => (
                                        <span
                                            key={j}
                                            className="px-3 py-1 bg-black/50 border border-zinc-800 rounded-full text-xs text-orange-400 hover:border-orange-400/50 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-orange-400 font-semibold text-sm group-hover:gap-4 transition-all"
                                >
                                    View Project
                                    <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                                </a>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                {currentProjects.length > 6 && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 px-12 py-4 rounded-full font-bold text-lg overflow-hidden"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <span className="relative z-10">
                                {showMore ? 'Show Less' : `Show More (${currentProjects.length - 6} more projects)`}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
                        </button>
                    </div>
                )}
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-32 px-6 bg-zinc-900/30 relative">
                <h2 className="text-6xl md:text-7xl font-black text-center mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    EXPERTISE
                </h2>
                <p className="text-center text-gray-500 text-xl mb-20">Technologies I master</p>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {skills.map((skill, i) => (
                        <div
                            key={i}
                            className="group relative bg-black/50 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800 hover:border-orange-500 transition-all duration-500 overflow-hidden"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <skill.icon className="w-12 h-12 text-orange-400 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all" />

                            <h3 className="text-2xl font-bold mb-4">{skill.name}</h3>

                            <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-orange-500/50"
                                    style={{ width: `${skill.level}%` }}
                                ></div>
                            </div>

                            <div className="mt-3 text-right text-orange-400 font-bold text-lg">
                                {skill.level}%
                            </div>

                            <div className="absolute top-4 right-4 w-20 h-20 bg-orange-400/5 rounded-full blur-xl group-hover:bg-orange-400/20 transition-all"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-7xl md:text-8xl font-black text-center mb-8 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                        LET'S CREATE
                    </h2>
                    <p className="text-2xl text-gray-400 text-center mb-16">Ready to elevate your Shopify store?</p>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                    Get In Touch
                                </h3>
                                <p className="text-gray-400 text-lg mb-8">
                                    Have a project in mind? Let's discuss how we can transform your e-commerce vision into reality.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { icon: Mail, label: "Email", value: "hello@shopifydev.com", link: "mailto:hello@shopifydev.com" },
                                    { icon: Github, label: "GitHub", value: "@yourusername", link: "https://github.com/yourusername" },
                                    { icon: Linkedin, label: "LinkedIn", value: "/in/yourusername", link: "https://linkedin.com/in/yourusername" }
                                ].map((contact, i) => (
                                    <a
                                        key={i}
                                        href={contact.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-orange-500 transition-all"
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    >
                                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <contact.icon className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">{contact.label}</div>
                                            <div className="text-lg font-semibold">{contact.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="pt-8">
                                <p className="text-gray-500 mb-4">Available for freelance work</p>
                                <div className="flex gap-2 items-center">
                                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                                    <span className="text-orange-400 font-semibold">Currently accepting new projects</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-3xl blur-xl"></div>
                            <div className="relative bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800">
                                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                                <form onSubmit={handleSubmitForm} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-300">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-white placeholder-gray-600"
                                            onMouseEnter={() => setCursorVariant('hover')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-300">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-white placeholder-gray-600"
                                            onMouseEnter={() => setCursorVariant('hover')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-300">Contact Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-white placeholder-gray-600"
                                            onMouseEnter={() => setCursorVariant('hover')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-300">Project Description</label>
                                        <textarea
                                            required
                                            rows="5"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Tell me about your project..."
                                            className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-white placeholder-gray-600 resize-none"
                                            onMouseEnter={() => setCursorVariant('hover')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="group relative w-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 rounded-xl text-lg font-bold overflow-hidden"
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Send Message
                                            <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-6 bg-black border-t border-zinc-900 text-center text-gray-600">
                <p className="text-lg">© 2024 Shopify Developer. Crafted with passion.</p>
            </footer>
        </div>
    );
}