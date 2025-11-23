const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    res.json(user);
  } catch (e) {
    next(e);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUserAccount = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted" });
  } catch (e) {
    next(e);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    await User.findByIdAndUpdate(req.user.id, { $addToSet: { following: userId } });
    await User.findByIdAndUpdate(userId, { $addToSet: { followers: req.user.id } });

    res.json({ message: "Followed" });
  } catch (e) {
    next(e);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    await User.findByIdAndUpdate(req.user.id, { $pull: { following: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { followers: req.user.id } });

    res.json({ message: "Unfollowed" });
  } catch (e) {
    next(e);
  }
};

exports.getSavedPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("savedPosts");
    res.json(user.savedPosts || []);
  } catch (e) {
    next(e);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.params.userId });
    res.json(posts);
  } catch (e) {
    next(e);
  }
};

exports.getUserComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ user: req.params.userId });
    res.json(comments);
  } catch (e) {
    next(e);
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const query = req.query.q || "";

    const users = await User.find({
      username: { $regex: query, $options: "i" }
    }).select("-password");

    res.json(users);
  } catch (e) {
    next(e);
  }
};
