const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);