const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.username || user.username;
    user.profilePic = req.body.profilePic || user.profilePic;
    
    if (req.body.password) {
      // if we add password update logic later we put it here  
     
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      streak: updatedUser.streak
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserComments = async (req, res) => {
  try {
    const comments = await Comment.find({ author: req.params.userId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const searchUsers = async (req, res) => {
  try {
    const query = req.query.q || "";
    
    const users = await User.find({
      username: { $regex: query, $options: "i" }
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserPosts,
  getUserComments,
  searchUsers
};