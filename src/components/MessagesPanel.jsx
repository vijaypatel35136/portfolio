import React from 'react';
import { X, Trash2, MessageSquare } from 'lucide-react';

export default function MessagesPanel({ messages, setMessages, setShowMessages }) {
    const handleDeleteMessage = (msgId) => {
        const updatedMessages = messages.filter((m) => m.id !== msgId);
        setMessages(updatedMessages);
    };

    return (
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
                            <div
                                key={msg.id}
                                className="bg-black/50 border border-zinc-800 rounded-2xl p-6 hover:border-green-500/50 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-green-400">
                                            {msg.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">{msg.date}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteMessage(msg.id)}
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
}