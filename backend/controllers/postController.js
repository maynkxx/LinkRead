const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { title, content, tips, learnings, codeSnippet, image, tags } = req.body;

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
            tags: tags || [],
            author: req.user.id
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack, receivedBody: req.body });
    }
}

const getAllPosts = async (req, res) => {
    try {
        const { search, tag } = req.query;
        let query = { isDraft: false }; // Only show published posts

        if (search) {
            query.$text = { $search: search };
        }

        if (tag) {
            query.tags = tag;
        }

        let posts = await Post.find(query)
            .populate('author', 'username profilePic')
            .sort({ createdAt: -1 });

        // Calculate score for sorting if needed, but for now we just return them
        // The frontend requested "Popular Posts" as a separate section, so we might want a separate endpoint or query param
        // For now, let's keep this as chronological (Latest) as per requirement "Normal feed: Latest Posts (chronological)"

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getPopularPosts = async (req, res) => {
    try {
        // We can do this aggregation in DB or fetch and sort in JS. 
        // For Mongoose, aggregation is better for performance.
        const posts = await Post.aggregate([
            {
                $match: { isDraft: false } // Only show published posts
            },
            {
                $addFields: {
                    upvoteCount: { $size: { $ifNull: ["$upvotes", []] } },
                    downvoteCount: { $size: { $ifNull: ["$downvotes", []] } },
                    score: {
                        $subtract: [
                            { $size: { $ifNull: ["$upvotes", []] } },
                            { $size: { $ifNull: ["$downvotes", []] } }
                        ]
                    }
                }
            },
            { $sort: { score: -1 } },
            { $limit: 10 } // Limit to top 10 trending
        ]);

        // Populate author after aggregation
        await Post.populate(posts, { path: 'author', select: 'username profilePic' });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username profilePic');

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const upvotePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Remove from downvotes if present
        if (post.downvotes.includes(req.user.id)) {
            await post.updateOne({ $pull: { downvotes: req.user.id } });
        }

        // Toggle upvote
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

const downvotePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Remove from upvotes if present
        if (post.upvotes.includes(req.user.id)) {
            await post.updateOne({ $pull: { upvotes: req.user.id } });
        }

        // Toggle downvote
        if (post.downvotes.includes(req.user.id)) {
            await post.updateOne({ $pull: { downvotes: req.user.id } });
            res.json({ message: "Downvote removed" });
        } else {
            await post.updateOne({ $addToSet: { downvotes: req.user.id } });
            res.json({ message: "Downvoted" });
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
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Update fields
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.tips = req.body.tips !== undefined ? req.body.tips : post.tips;
        post.learnings = req.body.learnings !== undefined ? req.body.learnings : post.learnings;
        post.codeSnippet = req.body.codeSnippet !== undefined ? req.body.codeSnippet : post.codeSnippet;
        post.image = req.body.image !== undefined ? req.body.image : post.image;
        post.tags = req.body.tags || post.tags;
        post.isDraft = req.body.isDraft !== undefined ? req.body.isDraft : post.isDraft;
        post.lastSavedAt = Date.now();

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getUserDrafts = async (req, res) => {
    try {
        const drafts = await Post.find({
            author: req.user.id,
            isDraft: true
        })
            .sort({ lastSavedAt: -1 })
            .populate('author', 'username profilePic');

        res.json(drafts);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPopularPosts,
    getPostById,
    upvotePost,
    downvotePost,
    deletePost,
    updatePost,
    getUserDrafts
};