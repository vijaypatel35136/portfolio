import React from 'react';
import { Plus, ShoppingBag, FileCode, Blocks, Code, Package, Zap } from 'lucide-react';
import ProjectCard from './ProjectCard';

const iconMap = {
    ShoppingBag,
    FileCode,
    Blocks,
    Code,
    Package,
    Zap
};

export default function ProjectsSection({
    activeTab,
    setActiveTab,
    tabs,
    allProjects,
    displayedProjects,
    showMore,
    setShowMore,
    currentProjects,
    isAdmin,
    onAddProject,
    onEditProject,
    onDeleteProject,
    setCursorVariant,
    settings
}) {
    const { work } = settings;

    return (
        <section id="work" className="py-32 px-6 relative">
            <div className="flex justify-between items-center max-w-7xl mx-auto mb-12">
                <div className="w-full">
                    <h2 className="text-center text-6xl md:text-7xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                        {work.heading}
                    </h2>
                    <p className="text-center text-gray-500 text-xl mt-2">{work.subheading}</p>
                </div>
                {isAdmin && (
                    <button
                        onClick={onAddProject}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all whitespace-nowrap ml-4"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <Plus className="w-5 h-5" />
                        {work.addButtonText}
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="max-w-4xl mx-auto flex justify-center gap-4 mb-16 flex-wrap">
                {tabs.map(tab => {
                    const IconComponent = iconMap[tab.icon] || Code;
                    const count = allProjects[tab.id]?.length || 0;
                    
                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setShowMore(false);
                            }}
                            className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 ${
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                                    : 'bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50'
                            }`}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <IconComponent className="w-6 h-6" />
                            <span>{tab.name}</span>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                                activeTab === tab.id ? 'bg-white/20' : 'bg-orange-500/20 text-orange-400'
                            }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        isAdmin={isAdmin}
                        activeTab={activeTab}
                        onEdit={() => onEditProject(project)}
                        onDelete={() => onDeleteProject(activeTab, project.id)}
                        setCursorVariant={setCursorVariant}
                    />
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
                            {showMore 
                                ? work.showLessText 
                                : `${work.showMoreText} (${currentProjects.length - 6} more projects)`
                            }
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    </button>
                </div>
            )}
        </section>
    );
}