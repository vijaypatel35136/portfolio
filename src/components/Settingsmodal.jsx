import React, { useState } from 'react';
import { X, Save, Upload, Image as ImageIcon, Ruler } from 'lucide-react';

export default function SettingsModal({ settings, onClose, onSave }) {
    const [editedSettings, setEditedSettings] = useState(settings);
    const [activeSection, setActiveSection] = useState('hero');

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditedSettings(prev => ({
                    ...prev,
                    branding: {
                        ...prev.branding,
                        logoUrl: event.target.result,
                        useImageLogo: true
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const updateHero = (field, value) => {
        setEditedSettings(prev => ({
            ...prev,
            hero: { ...prev.hero, [field]: value }
        }));
    };

    const updateBranding = (field, value) => {
        setEditedSettings(prev => ({
            ...prev,
            branding: { ...prev.branding, [field]: value }
        }));
    };

    const updateStat = (index, value) => {
        setEditedSettings(prev => ({
            ...prev,
            stats: prev.stats.map((stat, i) =>
                i === index ? { ...stat, text: value } : stat
            )
        }));
    };

    const addStat = () => {
        setEditedSettings(prev => ({
            ...prev,
            stats: [...prev.stats, { text: '★ New Stat', id: Date.now() }]
        }));
    };

    const removeStat = (index) => {
        setEditedSettings(prev => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== index)
        }));
    };

    const updateSkill = (index, field, value) => {
        setEditedSettings(prev => ({
            ...prev,
            expertise: {
                ...prev.expertise,
                skills: prev.expertise.skills.map((skill, i) =>
                    i === index ? { ...skill, [field]: value } : skill
                )
            }
        }));
    };

    const addSkill = () => {
        setEditedSettings(prev => ({
            ...prev,
            expertise: {
                ...prev.expertise,
                skills: [...prev.expertise.skills, { name: 'New Skill', level: 80, icon: 'Code' }]
            }
        }));
    };

    const removeSkill = (index) => {
        setEditedSettings(prev => ({
            ...prev,
            expertise: {
                ...prev.expertise,
                skills: prev.expertise.skills.filter((_, i) => i !== index)
            }
        }));
    };

    const updateContactInfo = (index, field, value) => {
        setEditedSettings(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                contactInfo: prev.contact.contactInfo.map((info, i) =>
                    i === index ? { ...info, [field]: value } : info
                )
            }
        }));
    };
    const updateContactFormField = (fieldKey, fieldProp, value) => {
        setEditedSettings(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                formFields: {
                    ...prev.contact.formFields,
                    [fieldKey]: {
                        ...prev.contact.formFields[fieldKey],
                        [fieldProp]: value
                    }
                }
            }
        }));
    };

    const sections = [
        { id: 'hero', label: 'Hero Section' },
        { id: 'branding', label: 'Logo & Branding' },
        { id: 'stats', label: 'Stats Marquee' },
        { id: 'work', label: 'Work Section' },
        { id: 'expertise', label: 'Skills & Expertise' },
        { id: 'contact', label: 'Contact Section' },
        { id: 'footer', label: 'Footer' }
    ];

    // Logo size options with pixel values
    const logoSizeOptions = [
        { value: 'small', label: 'Small (32px)', height: 32 },
        { value: 'medium', label: 'Medium (48px)', height: 48 },
        { value: 'large', label: 'Large (64px)', height: 64 },
        { value: 'extra-large', label: 'Extra Large (80px)', height: 80 }
    ];

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 max-w-6xl w-full max-h-[90vh] flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-black/50 border-r border-zinc-800 p-4 overflow-y-auto">
                    <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Settings</h3>
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all
                            ${activeSection === section.id
                                    ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold'
                                    : 'hover:bg-zinc-800 text-gray-400'
                                }`}
                        >
                            {section.label}
                        </button>
                    ))}

                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                        <h3 className="text-2xl font-bold bg-gradient-to-r bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent bg-clip-text text-transparent">
                            Edit Portfolio Settings
                        </h3>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                            <X className="w-6 h-6 hover:text-red-400" />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeSection === 'hero' && (
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-orange-400 mb-4">Hero Section</h4>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Main Heading</label>
                                    <input
                                        type="text"
                                        value={editedSettings.hero.mainHeading}
                                        onChange={(e) => updateHero('mainHeading', e.target.value)}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Sub Heading</label>
                                    <input
                                        type="text"
                                        value={editedSettings.hero.subHeading}
                                        onChange={(e) => updateHero('subHeading', e.target.value)}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Description</label>
                                    <textarea
                                        value={editedSettings.hero.description}
                                        onChange={(e) => updateHero('description', e.target.value)}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white resize-none"
                                        rows="3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Primary Button Text</label>
                                    <input
                                        type="text"
                                        value={editedSettings.hero.primaryButtonText}
                                        onChange={(e) => updateHero('primaryButtonText', e.target.value)}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Secondary Button Text</label>
                                    <input
                                        type="text"
                                        value={editedSettings.hero.secondaryButtonText}
                                        onChange={(e) => updateHero('secondaryButtonText', e.target.value)}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'branding' && (
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold text-orange-400 mb-4">Logo & Branding</h4>

                                {/* Logo Image Upload */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4" />
                                            Logo Image
                                        </div>
                                    </label>
                                    {editedSettings.branding.useImageLogo && editedSettings.branding.logoUrl && (
                                        <div className="mb-3 p-4 bg-black/50 rounded-xl border border-zinc-800 flex items-center justify-center">
                                            <img
                                                src={editedSettings.branding.logoUrl}
                                                alt="Logo Preview"
                                                style={{ height: `${editedSettings.branding.logoHeight || 48}px` }}
                                                className="w-auto object-contain"
                                            />
                                        </div>
                                    )}
                                    <label className="flex items-center gap-2 px-4 py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl hover:bg-purple-500/30 transition-colors cursor-pointer">
                                        <Upload className="w-5 h-5" />
                                        Upload Logo Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">Upload a logo image or use text below</p>
                                </div>

                                {/* Logo Size Control */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <Ruler className="w-4 h-4" />
                                            Logo Size
                                        </div>
                                    </label>
                                    <select
                                        value={editedSettings.branding.logoSize}
                                        onChange={(e) => {
                                            const selectedOption = logoSizeOptions.find(opt => opt.value === e.target.value);
                                            updateBranding('logoSize', e.target.value);
                                            updateBranding('logoHeight', selectedOption.height);
                                        }}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    >
                                        {logoSizeOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Current size: {editedSettings.branding.logoHeight || 48}px
                                    </p>
                                </div>

                                {/* Custom Logo Height */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        Custom Logo Height (px)
                                    </label>
                                    <input
                                        type="number"
                                        min="20"
                                        max="200"
                                        value={editedSettings.branding.logoHeight || 48}
                                        onChange={(e) => updateBranding('logoHeight', parseInt(e.target.value))}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                    <input
                                        type="range"
                                        min="20"
                                        max="200"
                                        value={editedSettings.branding.logoHeight || 48}
                                        onChange={(e) => updateBranding('logoHeight', parseInt(e.target.value))}
                                        className="w-full mt-2"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Drag slider or enter value (20-200px)
                                    </p>
                                </div>

                                {/* Logo Text */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Logo Text (Fallback)</label>
                                    <input
                                        type="text"
                                        value={editedSettings.branding.logoText}
                                        onChange={(e) => updateBranding('logoText', e.target.value)}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Used when no image is uploaded or if image fails to load
                                    </p>
                                </div>

                                {/* Toggle between image and text */}
                                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        checked={!editedSettings.branding.useImageLogo}
                                        onChange={(e) => updateBranding('useImageLogo', !e.target.checked)}
                                        className="w-5 h-5"
                                    />
                                    <label className="text-sm text-gray-300">Use text logo instead of image</label>
                                </div>
                            </div>
                        )}

                        {activeSection === 'stats' && (
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-orange-400 mb-4">Stats Marquee</h4>

                                {editedSettings.stats.map((stat, index) => (
                                    <div key={stat.id} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={stat.text}
                                            onChange={(e) => updateStat(index, e.target.value)}
                                            className="flex-1 px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                        />
                                        <button
                                            onClick={() => removeStat(index)}
                                            className="px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-xl hover:bg-red-500/30 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    onClick={addStat}
                                    className="w-full px-4 py-3 bg-green-500/20 border border-green-500/50 rounded-xl hover:bg-green-500/30 transition-colors"
                                >
                                    Add Stat
                                </button>
                            </div>
                        )}

                        {activeSection === 'work' && (
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-orange-400 mb-4">Work Section</h4>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Section Heading</label>
                                    <input
                                        type="text"
                                        value={editedSettings.work.heading}
                                        onChange={(e) => setEditedSettings(prev => ({
                                            ...prev,
                                            work: { ...prev.work, heading: e.target.value }
                                        }))}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Subheading</label>
                                    <input
                                        type="text"
                                        value={editedSettings.work.subheading}
                                        onChange={(e) => setEditedSettings(prev => ({
                                            ...prev,
                                            work: { ...prev.work, subheading: e.target.value }
                                        }))}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'expertise' && (
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-orange-400 mb-4">Skills & Expertise</h4>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Section Heading</label>
                                    <input
                                        type="text"
                                        value={editedSettings.expertise.heading}
                                        onChange={(e) => setEditedSettings(prev => ({
                                            ...prev,
                                            expertise: { ...prev.expertise, heading: e.target.value }
                                        }))}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Subheading</label>
                                    <input
                                        type="text"
                                        value={editedSettings.expertise.subheading}
                                        onChange={(e) => setEditedSettings(prev => ({
                                            ...prev,
                                            expertise: { ...prev.expertise, subheading: e.target.value }
                                        }))}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                                <h5 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mt-6 mb-3">Skills</h5>

                                {editedSettings.expertise.skills.map((skill, index) => (
                                    <div key={index} className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-3">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={skill.name}
                                                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                                                placeholder="Skill name"
                                                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none text-white"
                                            />
                                            <button
                                                onClick={() => removeSkill(index)}
                                                className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Level: {skill.level}%</label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={skill.level}
                                                onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <select
                                            value={skill.icon}
                                            onChange={(e) => updateSkill(index, 'icon', e.target.value)}
                                            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none text-white"
                                        >
                                            <option value="Code">Code Icon</option>
                                            <option value="Package">Package Icon</option>
                                            <option value="Zap">Zap Icon</option>
                                            <option value="Sparkles">Sparkles Icon</option>
                                            <option value="TrendingUp">Trending Up Icon</option>
                                            <option value="Award">Award Icon</option>
                                        </select>
                                    </div>
                                ))}

                                <button
                                    onClick={addSkill}
                                    className="w-full px-4 py-3 bg-green-500/20 border border-green-500/50 rounded-xl hover:bg-green-500/30 transition-colors"
                                >
                                    Add Skill
                                </button>
                            </div>
                        )}

                        {activeSection === 'contact' && (
                            <div className="space-y-6">

                                <h4 className="text-xl font-bold text-orange-400 mb-4">
                                    Contact Section
                                </h4>

                                {/* ================= HEADING ================= */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={editedSettings.contact.heading}
                                        onChange={(e) =>
                                            setEditedSettings(prev => ({
                                                ...prev,
                                                contact: {
                                                    ...prev.contact,
                                                    heading: e.target.value
                                                }
                                            }))
                                        }
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                                {/* ================= SUBHEADING ================= */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        Subheading
                                    </label>
                                    <input
                                        type="text"
                                        value={editedSettings.contact.subheading}
                                        onChange={(e) =>
                                            setEditedSettings(prev => ({
                                                ...prev,
                                                contact: {
                                                    ...prev.contact,
                                                    subheading: e.target.value
                                                }
                                            }))
                                        }
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                                {/* ================= CONTACT INFO ================= */}
                                <h5 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mt-6 mb-3">
                                    Contact Information
                                </h5>

                                {editedSettings.contact.contactInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-2"
                                    >
                                        <input
                                            type="text"
                                            value={info.label}
                                            onChange={(e) =>
                                                updateContactInfo(index, 'label', e.target.value)
                                            }
                                            placeholder="Label (e.g., Email)"
                                            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none text-white"
                                        />
                                        <input
                                            type="text"
                                            value={info.value}
                                            onChange={(e) =>
                                                updateContactInfo(index, 'value', e.target.value)
                                            }
                                            placeholder="Value (e.g., hello@example.com)"
                                            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none text-white"
                                        />
                                        <input
                                            type="text"
                                            value={info.link}
                                            onChange={(e) =>
                                                updateContactInfo(index, 'link', e.target.value)
                                            }
                                            placeholder="Link (e.g., mailto:hello@example.com)"
                                            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none text-white"
                                        />
                                    </div>
                                ))}

                                {/* ================= CONTACT FORM ================= */}
                                <h5 className="text-lg font-bold text-green-400 mt-8 mb-3">
                                    Contact Form
                                </h5>

                                {/* Form Title */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        Form Title
                                    </label>
                                    <input
                                        type="text"
                                        value={editedSettings.contact.formTitle}
                                        onChange={(e) =>
                                            setEditedSettings(prev => ({
                                                ...prev,
                                                contact: {
                                                    ...prev.contact,
                                                    formTitle: e.target.value
                                                }
                                            }))
                                        }
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                                {/* ================= FORM FIELDS ================= */}
                                <div className="space-y-4 mt-6">
                                    <h6 className="text-md font-bold text-yellow-400">
                                        Form Fields (Label & Placeholder)
                                    </h6>

                                    {Object.entries(editedSettings.contact.formFields).map(
                                        ([fieldKey, field]) => (
                                            <div
                                                key={fieldKey}
                                                className="grid md:grid-cols-2 gap-4 p-4 bg-black/40 border border-zinc-800 rounded-xl"
                                            >
                                                <div>
                                                    <label className="text-sm text-gray-400 capitalize">
                                                        {fieldKey} Label
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={field.label}
                                                        onChange={(e) =>
                                                            updateContactFormField(
                                                                fieldKey,
                                                                'label',
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none text-white"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm text-gray-400 capitalize">
                                                        {fieldKey} Placeholder
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={field.placeholder}
                                                        onChange={(e) =>
                                                            updateContactFormField(
                                                                fieldKey,
                                                                'placeholder',
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none text-white"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                {/* Submit Button Text */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                                        Submit Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={editedSettings.contact.submitButtonText}
                                        onChange={(e) =>
                                            setEditedSettings(prev => ({
                                                ...prev,
                                                contact: {
                                                    ...prev.contact,
                                                    submitButtonText: e.target.value
                                                }
                                            }))
                                        }
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>

                            </div>
                        )}
                        {activeSection === 'footer' && (
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-orange-400 mb-4">Footer</h4>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-300">Copyright Text</label>
                                    <input
                                        type="text"
                                        value={editedSettings.footer.copyrightText}
                                        onChange={(e) => setEditedSettings(prev => ({
                                            ...prev,
                                            footer: { ...prev.footer, copyrightText: e.target.value }
                                        }))}
                                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-zinc-800 flex gap-4">
                        <button
                            onClick={() => onSave(editedSettings)}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                            <Save className="w-5 h-5" />
                            Save All Settings
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-4 border border-zinc-800 rounded-xl font-bold hover:border-red-500 hover:text-red-500 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}