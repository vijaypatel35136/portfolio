import React from 'react';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

const iconMap = {
    Mail,
    Github,
    Linkedin
};

export default function ContactSection({ formData, setFormData, onSubmit, setCursorVariant, settings }) {
    const { contact } = settings;

    return (
        <section id="contact" className="py-32 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-7xl md:text-8xl font-black text-center mb-8 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                    {contact.heading}
                </h2>
                <p className="text-2xl text-gray-400 text-center mb-16">{contact.subheading}</p>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                {contact.getInTouchTitle}
                            </h3>
                            <p className="text-gray-400 text-lg mb-8">
                                {contact.getInTouchDescription}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contact.contactInfo.map((contactItem, i) => {
                                const IconComponent = iconMap[contactItem.icon] || Mail;
                                
                                return (
                                    <a
                                        key={i}
                                        href={contactItem.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-orange-500 transition-all"
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    >
                                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <IconComponent className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">{contactItem.label}</div>
                                            <div className="text-lg font-semibold">{contactItem.value}</div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="pt-8">
                            <p className="text-gray-500 mb-4">{contact.availabilityText}</p>
                            <div className="flex gap-2 items-center">
                                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                                <span className="text-orange-400 font-semibold">{contact.statusText}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-3xl blur-xl"></div>
                        <div className="relative bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800">
                            <h3 className="text-2xl font-bold mb-6">{contact.formTitle}</h3>

                            <form onSubmit={onSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        {contact.formFields.name.label}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder={contact.formFields.name.placeholder}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-white placeholder-gray-600"
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        {contact.formFields.email.label}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder={contact.formFields.email.placeholder}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-white placeholder-gray-600"
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        {contact.formFields.phone.label}
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder={contact.formFields.phone.placeholder}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-white placeholder-gray-600"
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        {contact.formFields.description.label}
                                    </label>
                                    <textarea
                                        required
                                        rows="5"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder={contact.formFields.description.placeholder}
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
                                        {contact.submitButtonText}
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
    );
}