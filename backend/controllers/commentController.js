const Comment = require('../models/Comment')

exports.createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      post: req.body.post,
      user: req.user.id,
      content: req.body.content
    });
    res.json(comment);
  } catch (e) {
    next(e);
  }
};

exports.getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('user', 'username');
    res.json(comments);
  } catch (e) {
    next(e);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    next(e);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

exports.likeComment = async (req, res, next) => {
  try {
    // Implement liking logic here, stub for now
    res.json({ message: 'Liked comment (stub)' });
  } catch (e) {
    next(e);
  }
};

exports.replyToComment = async (req, res, next) => {
  try {
    // Implement reply logic here, stub for now
    res.json({ message: 'Reply to comment (stub)' });
  } catch (e) {
    next(e);
  }
};

exports.getSingleComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate('user', 'username');
    res.json(comment);
  } catch (e) {
    next(e);
  }
};
