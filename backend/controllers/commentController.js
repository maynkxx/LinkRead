const Comment = require('../models/Comment');
const Post = require('../models/Post');

const createComment = async (req, res) => {
  try {
    const { content, postId, parentCommentId } = req.body;

    if (!content || !postId) {
      return res.status(400).json({ message: "Content and Post ID are required" });
    }

    const comment = await Comment.create({
      content,
      post: postId,
      author: req.user.id,
      parentComment: parentCommentId || null
    });

    const populatedComment = await Comment.findById(comment._id).populate("author", "username profilePic");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username profilePic")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const toggleCommentUpvote = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.upvotes.includes(req.user.id)) {
      await comment.updateOne({ $pull: { upvotes: req.user.id } });
      res.json({ message: "Upvote removed" });
    } else {
      await comment.updateOne({ $addToSet: { upvotes: req.user.id } });
      res.json({ message: "Upvoted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  deleteComment,
  toggleCommentUpvote
};