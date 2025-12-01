const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini client
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

const getModel = () => {
    if (!genAI) {
        throw new Error('Gemini API key not configured');
    }
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

/**
 * Generate title suggestions based on blog content
 */
const generateTitleSuggestions = async (content) => {
    try {
        const model = getModel();
        const prompt = `You are a creative blog title generator. Generate 5 catchy, engaging blog post titles for the following content. Return only the titles, one per line, without numbering:\n\n${content.substring(0, 500)}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const titles = text
            .trim()
            .split('\n')
            .filter(title => title.trim())
            .slice(0, 5);

        return titles;
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to generate title suggestions');
    }
};

/**
 * Improve grammar and tone of text
 */
const improveGrammar = async (text) => {
    try {
        const model = getModel();
        const prompt = `You are a professional editor. Improve the grammar, clarity, and tone of the following text while maintaining the original meaning and voice. Return only the improved text:\n\n${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to improve text');
    }
};

/**
 * Suggest relevant tags based on content
 */
const suggestTags = async (content) => {
    try {
        const model = getModel();
        const prompt = `You are a content categorization expert. Generate 5-7 relevant tags for the following blog content. Return only the tags, comma-separated, without any additional text:\n\n${content.substring(0, 500)}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const tags = text
            .trim()
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag)
            .slice(0, 7);

        return tags;
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to suggest tags');
    }
};

module.exports = {
    generateTitleSuggestions,
    improveGrammar,
    suggestTags
};
