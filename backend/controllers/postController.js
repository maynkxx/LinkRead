const Post = require('../models/Post')

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content, // Frontend sends content, model expects content
            thread: req.body.threadId, // Frontend sends threadId
            author: req.user.id, // Model expects author
            media: req.body.image ? [{ url: req.body.image, type: 'image' }] : []
        })
        res.json(post)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getThreadPosts = async (req, res) => {
    try {
        const posts = await Post.find({ thread: req.params.threadId })
            .populate('author', 'username')
            .sort({ createdAt: -1 });
        
        // Transform data for frontend
        const response = posts.map(p => ({
            _id: p._id,
            title: p.title,
            content: p.content,
            author: { username: p.author?.username || 'Unknown' },
            createdAt: p.createdAt,
            upvotes: p.metrics?.upvotes || 0,
            commentCount: p.metrics?.commentCount || 0,
            image: p.media?.[0]?.url || null
        }));

        res.json(response)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getPost = async (req, res) => {
    try {
        console.log('getPost called with postId:', req.params.postId);
        const post = await Post.findById(req.params.postId).populate('author', 'username');
        console.log('Post found:', post ? post._id : 'null');
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Transform data for frontend
        const response = {
            _id: post._id,
            title: post.title,
            content: post.content,
            author: { username: post.author?.username || 'Unknown' },
            createdAt: post.createdAt,
            upvotes: post.metrics?.upvotes || 0,
            commentCount: post.metrics?.commentCount || 0,
            image: post.media?.[0]?.url || null
        };

        res.json(response)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.upvote = async (req, res) => {
    try {
        // Simple increment for now, full logic in model
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if already upvoted (simplified)
        const alreadyUpvoted = post.votes?.some(v => v.user.toString() === req.user.id && v.value === 1);
        
        if (!alreadyUpvoted) {
             post.metrics.upvotes += 1;
             post.votes.push({ user: req.user.id, value: 1 });
             await post.save();
        }

        res.json({ message: 'Upvoted', upvotes: post.metrics.upvotes })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.downvote = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.metrics.downvotes += 1;
        await post.save();

        res.json({ message: 'Downvoted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
