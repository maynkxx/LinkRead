const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		value: { type: Number, enum: [1, -1], required: true },
	},
	{ _id: false, timestamps: true }
);

const commentSchema = new mongoose.Schema(
	{
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		thread: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Thread",
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		parentComment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
			default: null,
		},
		path: { type: String, default: "root" },
		depth: { type: Number, default: 0, min: 0, max: 10 },
		content: {
			type: String,
			required: true,
			maxlength: 2000,
		},
		contentFormat: {
			type: String,
			enum: ["markdown", "rich-text"],
			default: "markdown",
		},
		isEdited: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
		votes: { type: [voteSchema], default: [] },
		metrics: {
			upvotes: { type: Number, default: 0 },
			downvotes: { type: Number, default: 0 },
			score: { type: Number, default: 0 },
			childCount: { type: Number, default: 0 },
		},
		attachments: [
			{
				url: { type: String },
				type: { type: String, enum: ["image", "gif", "link"] },
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

commentSchema.index({ post: 1, createdAt: 1 });
commentSchema.index({ parentComment: 1 });

commentSchema.pre("save", function calculateTreeMetadata(next) {
	if (this.parentComment) {
		this.depth = Math.min((this.depth || 0), 10);
	} else {
		this.depth = 0;
		this.parentComment = null;
	}
	if (!this.path) {
		this.path = this.parentComment ? `${this.parentComment.toString()}` : "root";
	}
	next();
});

commentSchema.methods.applyVote = function applyVote(userId, value) {
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

module.exports = mongoose.model("Comment", commentSchema);
