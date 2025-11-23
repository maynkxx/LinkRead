const mongoose = require("mongoose");
const slugify = require("slugify");

const attachmentSchema = new mongoose.Schema(
	{
		url: { type: String, required: true },
		type: {
			type: String,
			enum: ["image", "video", "gif", "link"],
			default: "image",
		},
		provider: { type: String },
		metadata: {
			width: Number,
			height: Number,
			duration: Number,
		},
	},
	{ _id: false }
);

const voteSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		value: { type: Number, enum: [1, -1], required: true },
	},
	{ _id: false, timestamps: true }
);

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 150,
		},
		slug: {
			type: String,
			
			lowercase: true,
		},
		excerpt: { type: String, maxlength: 300 },
		content: { type: String, required: true },
		contentFormat: {
			type: String,
			enum: ["markdown", "rich-text", "link"],
			default: "markdown",
		},
		flair: { type: String, trim: true },
		tags: [{ type: String, lowercase: true, trim: true }],
		media: [attachmentSchema],
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		thread: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Thread",
			required: true,
		},
		isPinned: { type: Boolean, default: false },
		isLocked: { type: Boolean, default: false },
		isEdited: { type: Boolean, default: false },
		status: {
			type: String,
			enum: ["published", "draft", "archived", "removed"],
			default: "published",
		},
		visibility: {
			type: String,
			enum: ["public", "members", "moderators"],
			default: "public",
		},
		metrics: {
			upvotes: { type: Number, default: 0 },
			downvotes: { type: Number, default: 0 },
			score: { type: Number, default: 0 },
			commentCount: { type: Number, default: 0 },
			savedCount: { type: Number, default: 0 },
			viewCount: { type: Number, default: 0 },
		},
		votes: [voteSchema],
		savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		lastActivityAt: { type: Date, default: Date.now },
		reportedBy: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				reason: { type: String, trim: true },
				createdAt: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

postSchema.index({ slug: 1 }, { unique: true, sparse: true });
postSchema.index({ thread: 1, createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });

postSchema.pre("validate", function assignSlug(next) {
	if (!this.slug && this.title) {
		this.slug = slugify(`${this.title}-${Date.now()}`, { lower: true, strict: true });
	}
	next();
});

postSchema.methods.applyVote = function applyVote(userId, value) {
	const normalizedValue = value > 0 ? 1 : -1;
	const existingVoteIndex = this.votes.findIndex((vote) => vote.user.toString() === userId.toString());

	if (existingVoteIndex > -1) {
		this.metrics.upvotes -= this.votes[existingVoteIndex].value === 1 ? 1 : 0;
		this.metrics.downvotes -= this.votes[existingVoteIndex].value === -1 ? 1 : 0;
		this.votes.splice(existingVoteIndex, 1);
	}

	this.votes.push({ user: userId, value: normalizedValue });
	if (normalizedValue === 1) this.metrics.upvotes += 1;
	else this.metrics.downvotes += 1;

	this.metrics.score = this.metrics.upvotes - this.metrics.downvotes;
	return this.metrics.score;
};

module.exports = mongoose.model("Post", postSchema);
