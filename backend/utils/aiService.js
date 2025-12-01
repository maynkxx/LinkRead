const OpenAI = require('openai');

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}) : null;

/**
 * Generate title suggestions based on blog content
 */
const generateTitleSuggestions = async (content) => {
    if (!openai) {
        throw new Error('OpenAI API key not configured');
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a creative blog title generator. Generate catchy, engaging blog titles.'
                },
                {
                    role: 'user',
                    content: `Generate 5 catchy, engaging blog post titles for the following content. Return only the titles, one per line, without numbering:\n\n${content.substring(0, 500)}`
                }
            ],
            max_tokens: 200,
            temperature: 0.8
        });

        const titles = response.choices[0].message.content
            .trim()
            .split('\n')
            .filter(title => title.trim())
            .slice(0, 5);

        return titles;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to generate title suggestions');
    }
};

/**
 * Improve grammar and tone of text
 */
const improveGrammar = async (text) => {
    if (!openai) {
        throw new Error('OpenAI API key not configured');
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional editor. Improve the grammar, clarity, and tone of the text while maintaining the original meaning and voice.'
                },
                {
                    role: 'user',
                    content: `Improve the following text:\n\n${text}`
                }
            ],
            max_tokens: 1000,
            temperature: 0.3
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to improve text');
    }
};

/**
 * Suggest relevant tags based on content
 */
const suggestTags = async (content) => {
    if (!openai) {
        throw new Error('OpenAI API key not configured');
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a content categorization expert. Generate relevant, concise tags for blog posts.'
                },
                {
                    role: 'user',
                    content: `Generate 5-7 relevant tags for the following blog content. Return only the tags, comma-separated, without any additional text:\n\n${content.substring(0, 500)}`
                }
            ],
            max_tokens: 100,
            temperature: 0.5
        });

        const tags = response.choices[0].message.content
            .trim()
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag)
            .slice(0, 7);

        return tags;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to suggest tags');
    }
};

module.exports = {
    generateTitleSuggestions,
    improveGrammar,
    suggestTags
};
