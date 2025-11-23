const Comment = require('../models/Comment')

exports.addComment = async (req, res) => {
    const comment = await Comment.create({
        post: req.body.post,
        user: req.user.id,
        content: req.body.content
    })
    res.json(comment)
}

exports.getPostComments = async (req, res) => {
    const comments = await Comment.find({ post: req.params.postId }).populate('user', 'username')
    res.json(comments)
}

exports.deleteComment = async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
}
