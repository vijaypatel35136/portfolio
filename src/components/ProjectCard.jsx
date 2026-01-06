import React from 'react';
import { Code, Edit, Trash2, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, isAdmin, activeTab, onEdit, onDelete, setCursorVariant }) {
    return (
        <div
            className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-500"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
        >
            <div className={`absolute inset-0 ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            <div className="relative z-10 p-8">
                {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={onEdit}
                            className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500 transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onDelete}
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
    );
}
