import React from 'react';

export default function MarqueeStats({ settings }) {
    const { stats } = settings;

    return (
        <section className="py-8 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-y border-orange-500/20 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(2)].map((_, idx) => (
                    <div key={idx} className="flex items-center gap-16 px-8">
                        {stats.map((stat) => (
                            <span key={stat.id} className="text-3xl font-bold">{stat.text}</span>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}