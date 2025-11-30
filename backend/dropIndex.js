const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');

dotenv.config();

const dropIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");

        await Post.collection.dropIndex('slug_1');
        console.log("Dropped slug_1 index");

        process.exit();
    } catch (error) {
        console.error("Error dropping index:", error.message);
        process.exit(1);
    }
};

dropIndex();
