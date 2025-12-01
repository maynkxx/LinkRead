const { generateTitleSuggestions, improveGrammar, suggestTags } = require('../utils/aiService');

const generateTitles = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const titles = await generateTitleSuggestions(content);
        res.json({ titles });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({
            message: error.message || 'Failed to generate titles',
            aiAvailable: false
        });
    }
};

const improveText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const improvedText = await improveGrammar(text);
        res.json({ improvedText });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({
            message: error.message || 'Failed to improve text',
            aiAvailable: false
        });
    }
};

const generateTags = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const tags = await suggestTags(content);
        res.json({ tags });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({
            message: error.message || 'Failed to generate tags',
            aiAvailable: false
        });
    }
};

module.exports = {
    generateTitles,
    improveText,
    generateTags
};
