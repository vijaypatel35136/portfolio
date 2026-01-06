// backend/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const DATA_DIR = path.join(__dirname, '../src/data');

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Save all data at once
app.post('/api/save-all', async (req, res) => {
    try {
        const { portfolioData, settings } = req.body;
        
        // Save projects
        const projectsContent = `// Auto-saved from admin panel\n// Last updated: ${new Date().toLocaleString()}\n\nexport const initialProjects = ${JSON.stringify(portfolioData.projects, null, 4)};`;
        await fs.writeFile(path.join(DATA_DIR, 'projects.js'), projectsContent);
        
        // Save tabs
        const tabsContent = `// Auto-saved from admin panel\n// Last updated: ${new Date().toLocaleString()}\n\nexport const initialTabs = ${JSON.stringify(portfolioData.tabs, null, 4)};`;
        await fs.writeFile(path.join(DATA_DIR, 'tabs.js'), tabsContent);
        
        // Save settings
        const settingsContent = `// Auto-saved from admin panel\n// Last updated: ${new Date().toLocaleString()}\n\nexport const defaultSettings = ${JSON.stringify(settings, null, 4)};`;
        await fs.writeFile(path.join(DATA_DIR, 'settings.js'), settingsContent);
        
        // Save messages
        const messagesContent = `// Auto-saved from admin panel\n// Last updated: ${new Date().toLocaleString()}\n\nexport const initialMessages = ${JSON.stringify(portfolioData.messages || [], null, 4)};`;
        await fs.writeFile(path.join(DATA_DIR, 'messages.js'), messagesContent);
        
        res.json({ success: true, message: 'All data saved to files!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
    console.log(`📁 Saving data to: ${DATA_DIR}`);
});