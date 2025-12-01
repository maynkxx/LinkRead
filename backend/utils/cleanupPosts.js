const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('../models/Post');
const connectDB = require('../config/db');

dotenv.config();

const cleanupPosts = async () => {
    try {
        await connectDB();

        console.log('🗑️  Starting database cleanup...');

        const result = await Post.deleteMany({});

        console.log(`✅ Successfully deleted ${result.deletedCount} posts from the database.`);
        console.log('Database is now clean and ready for fresh data.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
};

cleanupPosts();
