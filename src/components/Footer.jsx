import React from 'react';

export default function Footer({ settings }) {
    const { footer } = settings;

    return (
        <footer className="py-10 px-6 bg-black border-t border-zinc-900 text-center text-gray-600">
            <p className="text-lg">{footer.copyrightText}</p>
        </footer>
    );
}