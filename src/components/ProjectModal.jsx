import React, { useState, useEffect } from 'react';
import { X, Plus, ShoppingBag, FileCode, Blocks, Code, Package, Zap } from 'lucide-react';

const iconMap = {
    ShoppingBag,
    FileCode,
    Blocks,
    Code,
    Package,
    Zap
};

export default function ProjectModal({ editingProject, onClose, onSave, tabs, activeTab }) {
    const [project, setProject] = useState(() =>
        editingProject ? {
            ...editingProject,
            tech: editingProject.tech || []
        } : {
            title: '',
            desc: '',
            tech: [],
            color: 'from-purple-500 to-pink-500',
            gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
            link: '',
            category: activeTab
        }
    );

    const [techInput, setTechInput] = useState('');
    const [showNewTabInput, setShowNewTabInput] = useState(false);
    const [newTabName, setNewTabName] = useState('');
    const [newTabIcon, setNewTabIcon] = useState('Code');

    useEffect(() => {
        if (editingProject) {
            setProject({ ...editingProject, tech: editingProject.tech || [] });
        }
        setTechInput('');
        setShowNewTabInput(false);
        setNewTabName('');
    }, [editingProject]);

    const handleSave = () => {
        if (!project.title || !project.desc) {
            alert('Please fill in all required fields');
            return;
        }

        if (showNewTabInput && !newTabName.trim()) {
            alert('Please enter a category name');
            return;
        }

        onSave(project, showNewTabInput ? { name: newTabName, icon: newTabIcon } : null);
    };

    const removeTech = (index) => {
        setProject(prev => ({
            ...prev,
            tech: prev.tech.filter((_, idx) => idx !== index)
        }));
    };

    const addTech = () => {
        if (techInput.trim()) {
            setProject(prev => ({
                ...prev,
                tech: [...prev.tech, techInput.trim()]
            }));
            setTechInput('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                        {editingProject ? 'Edit Project' : 'Add New Project'}
                    </h3>
                    <button onClick={onClose}>
                        <X className="w-6 h-6 hover:text-red-400 transition-colors" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Category Selection */}
                    <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-300">Select Category *</label>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            {tabs.map(tab => {
                                const IconComponent = iconMap[tab.icon] || Code;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => {
                                            setProject(prev => ({ ...prev, category: tab.id }));
                                            setShowNewTabInput(false);
                                        }}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                                            project.category === tab.id && !showNewTabInput
                                                ? 'bg-orange-500 border-orange-500 text-white'
                                                : 'bg-black/50 border-zinc-800 hover:border-orange-500'
                                        }`}
                                    >
                                        <IconComponent className="w-5 h-5" />
                                        <span className="font-semibold">{tab.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                        
                        <button
                            type="button"
                            onClick={() => setShowNewTabInput(!showNewTabInput)}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                                showNewTabInput
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'bg-black/50 border-zinc-800 hover:border-green-500'
                            }`}
                        >
                            <Plus className="w-5 h-5" />
                            <span className="font-semibold">Add New Category</span>
                        </button>

                        {showNewTabInput && (
                            <div className="mt-3 p-4 bg-black/50 border border-green-500/50 rounded-xl space-y-3">
                                <input
                                    type="text"
                                    value={newTabName}
                                    onChange={(e) => setNewTabName(e.target.value)}
                                    placeholder="Category name (e.g., Mobile Apps)"
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-green-500 focus:outline-none text-white"
                                />
                                <select
                                    value={newTabIcon}
                                    onChange={(e) => setNewTabIcon(e.target.value)}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-green-500 focus:outline-none text-white"
                                >
                                    <option value="Code">Code Icon</option>
                                    <option value="Package">Package Icon</option>
                                    <option value="Zap">Zap Icon</option>
                                    <option value="ShoppingBag">Shopping Bag Icon</option>
                                    <option value="FileCode">File Code Icon</option>
                                    <option value="Blocks">Blocks Icon</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Project Title */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">Project Title *</label>
                        <input
                            type="text"
                            value={project.title}
                            onChange={(e) => setProject(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                            placeholder="Enter project title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">Description *</label>
                        <textarea
                            value={project.desc}
                            onChange={(e) => setProject(prev => ({ ...prev, desc: e.target.value }))}
                            className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white resize-none"
                            rows="3"
                            placeholder="Enter project description"
                        />
                    </div>

                    {/* Technologies */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">Technologies</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTech();
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
                                        onClick={() => removeTech(i)}
                                    />
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Project Link */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">Project Link</label>
                        <input
                            type="url"
                            value={project.link}
                            onChange={(e) => setProject(prev => ({ ...prev, link: e.target.value }))}
                            className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                            placeholder="https://example.com"
                        />
                    </div>

                    {/* Color Gradient */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">Color Gradient</label>
                        <select
                            value={project.color}
                            onChange={(e) => {
                                const color = e.target.value;
                                const colorParts = color.split(' ');
                                const fromColor = colorParts[0]?.replace('from-', '') || 'purple-500';
                                const toColor = colorParts[1]?.replace('to-', '') || 'pink-500';
                                const gradient = `bg-gradient-to-br from-${fromColor}/20 to-${toColor}/20`;
                                setProject(prev => ({ ...prev, color, gradient }));
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
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                    >
                        {editingProject ? 'Update Project' : 'Add Project'}
                    </button>
                </div>
            </div>
        </div>
    );
}