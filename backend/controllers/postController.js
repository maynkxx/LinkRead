const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { title, content, tips, learnings, codeSnippet, image } = req.body;

        if (!title || !content) {
             return res.status(400).json({ message: "Title and Content are required" });
        }

        const post = await Post.create({
            title,
            content,
            tips: tips || "",
            learnings: learnings || "",
            codeSnippet: codeSnippet || "",
            image: image || "",
            author: req.user.id
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username profilePic')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username profilePic');
        
        if(!post) {
            return res.status(404).json({message: "Post not found"});
        }
        
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const toggleUpvote = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.upvotes.includes(req.user.id)) {
            await post.updateOne({ $pull: { upvotes: req.user.id } });
            res.json({ message: "Upvote removed" });
        } else {
            await post.updateOne({ $addToSet: { upvotes: req.user.id } });
            res.json({ message: "Upvoted" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await post.deleteOne();
        res.json({ message: "Post removed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { 
    createPost, 
    getAllPosts, 
    getPostById, 
    toggleUpvote, 
    deletePost 
};