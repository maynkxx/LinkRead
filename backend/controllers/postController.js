const Post = require('../models/Post')

exports.createPost = async (req, res) => {
    const post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        thread: req.body.thread,
        user: req.user.id,
        image: req.body.image || null
    })
    res.json(post)
}

exports.getThreadPosts = async (req, res) => {
    const posts = await Post.find({ thread: req.params.threadId }).populate('user', 'username')
    res.json(posts)
}

exports.getPost = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user', 'username')
    res.json(post)
}

exports.upvote = async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        $addToSet: { upvotes: req.user.id },
        $pull: { downvotes: req.user.id }
    })
    res.json({ message: 'Upvoted' })
}

exports.downvote = async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        $addToSet: { downvotes: req.user.id },
        $pull: { upvotes: req.user.id }
    })
    res.json({ message: 'Downvoted' })
}
