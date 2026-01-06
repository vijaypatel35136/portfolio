import React from 'react';
import { Code, Package, Zap, Sparkles, TrendingUp, Award } from 'lucide-react';

const iconMap = {
    Code,
    Package,
    Zap,
    Sparkles,
    TrendingUp,
    Award
};

export default function SkillsSection({ setCursorVariant, settings }) {
    const { expertise } = settings;

    return (
        <section id="skills" className="py-32 px-6 bg-zinc-900/30 relative">
            <h2 className="text-6xl md:text-7xl font-black text-center mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                {expertise.heading}
            </h2>
            <p className="text-center text-gray-500 text-xl mb-20">{expertise.subheading}</p>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {expertise.skills.map((skill, i) => {
                    const SkillIcon = iconMap[skill.icon] || Code;
                    
                    return (
                        <div
                            key={i}
                            className="group relative bg-black/50 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800 hover:border-orange-500 transition-all duration-500 overflow-hidden"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <SkillIcon className="w-12 h-12 text-orange-400 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all" />

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
                    );
                })}
            </div>
        </section>
    );
}