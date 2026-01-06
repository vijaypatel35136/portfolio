import React, { useState, useEffect } from 'react';
import { X, Database, Download, Trash2, RefreshCw, Upload, FileCode, Copy, Check, AlertCircle, FolderOpen } from 'lucide-react';

export default function DataViewer({ onClose, onImport }) {
    const [portfolioData, setPortfolioData] = useState(null);
    const [formatted, setFormatted] = useState('');
    const [copied, setCopied] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        try {
            const data = localStorage.getItem('portfolio-data');
            const settings = localStorage.getItem('portfolio-settings');

            if (data || settings) {
                const fullData = {
                    portfolioData: data ? JSON.parse(data) : null,
                    settings: settings ? JSON.parse(settings) : null,
                    exportedAt: new Date().toISOString(),
                    version: '1.0'
                };
                setPortfolioData(fullData);
                setFormatted(JSON.stringify(fullData, null, 2));
            }
        } catch (err) {
            console.error('Error loading data:', err);
        }
    };

    // Generate JavaScript file content
    const generateProjectsJS = () => {
        const projects = portfolioData.portfolioData.projects;
        return `// Auto-generated from admin panel
// Last updated: ${new Date().toLocaleString()}
// Replace the content of src/data/projects.js with this file

export const initialProjects = ${JSON.stringify(projects, null, 4)};`;
    };

    const generateTabsJS = () => {
        const tabs = portfolioData.portfolioData.tabs;
        return `// Auto-generated from admin panel
// Last updated: ${new Date().toLocaleString()}
// Replace the content of src/data/tabs.js with this file

export const initialTabs = ${JSON.stringify(tabs, null, 4)};`;
    };

    const generateSettingsJS = () => {
        const settings = portfolioData.settings;
        return `// Auto-generated from admin panel
// Last updated: ${new Date().toLocaleString()}
// Replace the content of src/data/settings.js with this file

export const defaultSettings = ${JSON.stringify(settings, null, 4)};`;
    };

    const generateMessagesJS = () => {
        const messages = portfolioData.portfolioData.messages || [];
        return `// Auto-generated from admin panel
// Last updated: ${new Date().toLocaleString()}
// This file stores contact form messages
// Create this as src/data/messages.js if it doesn't exist

export const initialMessages = ${JSON.stringify(messages, null, 4)};`;
    };

    // Download individual JS files
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
        if (!portfolioData) {
            alert('No data to export!');
            return;
        }

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

        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 8000);
    };

    const downloadSingleBackupJSON = () => {
        const dataStr = JSON.stringify(portfolioData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = async (content, type) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(type);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            alert('Failed to copy. Please select and copy manually.');
        }
    };

    const clearAllData = () => {
        const confirmMsg = `⚠️ WARNING: This will permanently delete:

• All projects
• All categories
• All messages
• All settings
• Admin login status

This action CANNOT be undone!

Type 'DELETE' to confirm:`;

        const userInput = window.prompt(confirmMsg);

        if (userInput === 'DELETE') {
            localStorage.removeItem('portfolio-data');
            localStorage.removeItem('portfolio-settings');
            localStorage.removeItem('admin-logged-in');
            alert('✅ All data cleared!\n\nPage will reload with default data.');
            window.location.reload();
        } else if (userInput !== null) {
            alert('❌ Deletion cancelled. You must type exactly "DELETE" to confirm.');
        }
    };

    const getStats = () => {
        if (!portfolioData?.portfolioData) return null;

        const data = portfolioData.portfolioData;
        const totalProjects = Object.values(data.projects || {})
            .reduce((sum, arr) => sum + arr.length, 0);

        return {
            totalProjects,
            totalTabs: data.tabs?.length || 0,
            totalMessages: data.messages?.length || 0,
            hasSettings: !!portfolioData.settings
        };
    };

    const stats = getStats();

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Database className="w-8 h-8 text-blue-400" />
                        <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Portfolio Data Exporter
                            </h3>
                            <p className="text-sm text-gray-400">Export as source code files to share your whole project</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                        <X className="w-6 h-6 hover:text-red-400" />
                    </button>
                </div>

                {/* Export Success Notification */}
                {exportSuccess && (
                    <div className="mx-6 mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                        <div className="flex items-start gap-3">
                            <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-green-400 mb-1">✅ Files Downloaded Successfully!</div>
                                <div className="text-sm text-green-300 space-y-1">
                                    <p>4 files downloaded: projects.js, tabs.js, settings.js, messages.js</p>
                                    <p className="font-semibold">📁 Next Steps:</p>
                                    <ol className="list-decimal list-inside ml-2 space-y-0.5">
                                        <li>Go to your project folder: <code className="bg-black/30 px-2 py-0.5 rounded">src/data/</code></li>
                                        <li>Replace the old files with the downloaded files</li>
                                        <li>Now you can share your whole project folder!</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                {stats && (
                    <div className="p-6 grid grid-cols-4 gap-4 border-b border-zinc-800">
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-500/30">
                            <div className="text-sm text-gray-400 mb-1">Total Projects</div>
                            <div className="text-3xl font-bold text-purple-400">{stats.totalProjects}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 p-4 rounded-xl border border-green-500/30">
                            <div className="text-sm text-gray-400 mb-1">Categories</div>
                            <div className="text-3xl font-bold text-green-400">{stats.totalTabs}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-4 rounded-xl border border-orange-500/30">
                            <div className="text-sm text-gray-400 mb-1">Messages</div>
                            <div className="text-3xl font-bold text-orange-400">{stats.totalMessages}</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-500/30">
                            <div className="text-sm text-gray-400 mb-1">Settings</div>
                            <div className="text-3xl font-bold text-blue-400">{stats.hasSettings ? '✓' : '✗'}</div>
                        </div>
                    </div>
                )}

                {/* Additional Actions */}
                <div className="p-6 flex gap-3 border-b border-zinc-800 flex-wrap">
                    <button
                        onClick={loadData}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-xl hover:bg-blue-500/30 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                    <button
                        onClick={downloadSingleBackupJSON}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-xl hover:bg-purple-500/30 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Backup as JSON
                    </button>
                    <button
                        onClick={clearAllData}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-xl hover:bg-red-500/30 transition-colors ml-auto"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear All Data
                    </button>
                </div>

                {/* File Preview Tabs */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                        {/* Projects Preview */}
                        <div className="bg-black/50 rounded-xl border border-zinc-800 overflow-hidden">
                            <div className="p-4 bg-purple-500/10 border-b border-purple-500/30 flex justify-between items-center">
                                <h4 className="font-bold text-purple-400">projects.js Preview</h4>

                                <button
                                    onClick={() => copyToClipboard(generateProjectsJS(), 'projects')}
                                    className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
                                >
                                    {copied === 'projects' ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                    {copied === 'projects' ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            {/* Scrollable full content */}
                            <pre className="p-4 text-xs text-gray-300 overflow-x-auto overflow-y-auto max-h-[400px]">
                                {portfolioData && generateProjectsJS()}
                            </pre>
                        </div>


                        {/* Tabs Preview */}
                        <div className="bg-black/50 rounded-xl border border-zinc-800 overflow-hidden">
                            <div className="p-4 bg-green-500/10 border-b border-green-500/30 flex justify-between items-center">
                                <h4 className="font-bold text-green-400">tabs.js Preview</h4>
                                <button
                                    onClick={() => copyToClipboard(generateTabsJS(), 'tabs')}
                                    className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                                >
                                    {copied === 'tabs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied === 'tabs' ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <pre className="p-4 text-xs text-gray-300 overflow-x-auto">
                                {portfolioData && generateTabsJS()}
                            </pre>
                        </div>

                        {/* Settings Preview */}
                        <div className="bg-black/50 rounded-xl border border-zinc-800 overflow-hidden">
                            <div className="p-4 bg-blue-500/10 border-b border-blue-500/30 flex justify-between items-center">
                                <h4 className="font-bold text-blue-400">settings.js Preview</h4>
                                <button
                                    onClick={() => copyToClipboard(generateSettingsJS(), 'settings')}
                                    className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                                >
                                    {copied === 'settings' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied === 'settings' ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <pre className="p-4 text-xs text-gray-300 overflow-x-auto">
                                {portfolioData && generateSettingsJS()}
                            </pre>
                        </div>

                        {/* Messages Preview */}
                        <div className="bg-black/50 rounded-xl border border-zinc-800 overflow-hidden">
                            <div className="p-4 bg-orange-500/10 border-b border-orange-500/30 flex justify-between items-center">
                                <h4 className="font-bold text-orange-400">messages.js Preview</h4>
                                <button
                                    onClick={() => copyToClipboard(generateMessagesJS(), 'messages')}
                                    className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 transition-colors text-sm"
                                >
                                    {copied === 'messages' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied === 'messages' ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <pre className="p-4 text-xs text-gray-300 overflow-x-auto">
                                {portfolioData && generateMessagesJS()}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}