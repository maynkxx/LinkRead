const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const socialLinkSchema = new mongoose.Schema(
  {
    provider: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => !value || validator.isURL(value, { require_protocol: true }),
        message: "Invalid social link URL",
      },
    },
  },
  { _id: false }
);

const notificationSettingsSchema = new mongoose.Schema(
  {
    messages: { type: Boolean, default: true },
    mentions: { type: Boolean, default: true },
    threadActivity: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: [/^[a-zA-Z0-9_]+$/, "Username may only contain letters, numbers, and underscores"],
    },
    displayName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "https://res.cloudinary.com/demo/image/upload/v1699999999/threaddit/avatar-placeholder.png",
    },
    bannerUrl: { type: String },
    bio: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    location: {
      type: String,
      maxlength: 60,
      trim: true,
    },
    roles: {
      type: [String],
      enum: ["member", "moderator", "admin"],
      default: ["member"],
    },
    karma: {
      posts: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    stats: {
      posts: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      threadsCreated: { type: Number, default: 0 },
    },
    preferences: {
      darkMode: { type: Boolean, default: false },
      language: { type: String, default: "en" },
      contentMaturity: {
        type: String,
        enum: ["general", "mature"],
        default: "general",
      },
      notifications: { type: notificationSettingsSchema, default: () => ({}) },
    },
    socialLinks: [socialLinkSchema],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    threadsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
    threadsModerating: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
    status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    lastLoginAt: Date,
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ slug: 1 }, { unique: true, sparse: true });

userSchema.pre("validate", function handleSlug(next) {
  if (!this.slug && this.username) {
    this.slug = slugify(this.username, { lower: true, strict: true });
  }
  next();
});

userSchema.pre("save", function calculateTotalKarma(next) {
  if (this.isModified("karma")) {
    const posts = this.karma?.posts || 0;
    const comments = this.karma?.comments || 0;
    this.karma.total = posts + comments;
  }
  next();
});

userSchema.methods.canModerateThread = function canModerateThread(threadId) {
  if (!threadId) return false;
  const userRoles = this.roles || [];
  if (userRoles.includes("admin")) return true;
  return (this.threadsModerating || []).some(
    (id) => id.toString() === threadId.toString()
  );
};

module.exports = mongoose.model("User", userSchema);
