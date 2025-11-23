const mongoose = require("mongoose");
const slugify = require("slugify");

const ruleSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		severity: {
			type: String,
			enum: ["info", "warn", "remove", "ban"],
			default: "warn",
		},
	},
	{ _id: false }
);

const moderationLogSchema = new mongoose.Schema(
	{
		action: { type: String, required: true },
		moderator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		targetUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		targetPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
		note: { type: String },
		createdAt: { type: Date, default: Date.now },
	},
	{ _id: false }
);

const threadSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			
			trim: true,
			minlength: 3,
			maxlength: 30,
		},
		slug: {
			type: String,
			
			lowercase: true,
		},
		description: { type: String, maxlength: 600 },
		rules: { type: [ruleSchema], default: [] },
		tags: [{ type: String, lowercase: true, trim: true }],
		category: { type: String, trim: true },
		visibility: {
			type: String,
			enum: ["public", "restricted", "private"],
			default: "public",
		},
		iconUrl: { type: String },
		bannerUrl: { type: String },
		color: { type: String, default: "#059669" },
		creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		membershipPolicy: {
			type: String,
			enum: ["open", "approval", "invite"],
			default: "open",
		},
		pinnedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
		joinRequests: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
				message: { type: String, maxlength: 300 },
				createdAt: { type: Date, default: Date.now },
			},
		],
		stats: {
			memberCount: { type: Number, default: 1 },
			postCount: { type: Number, default: 0 },
			commentCount: { type: Number, default: 0 },
			moderatorCount: { type: Number, default: 1 },
		},
		settings: {
			allowImages: { type: Boolean, default: true },
			allowVideos: { type: Boolean, default: true },
			allowLinks: { type: Boolean, default: true },
			allowPolls: { type: Boolean, default: false },
			requirePostApproval: { type: Boolean, default: false },
			archiveAfterDays: { type: Number, default: 180 },
		},
		automod: {
			badWords: [{ type: String }],
			removeLowKarma: { type: Boolean, default: false },
			minAccountAgeDays: { type: Number, default: 0 },
		},
		moderationLog: [moderationLogSchema],
		isArchived: { type: Boolean, default: false },
		archivedAt: { type: Date },
	},
	{ timestamps: true, versionKey: false }
);

threadSchema.index({ slug: 1 }, { unique: true, sparse: true });
threadSchema.index({ name: 1 }, { unique: true });
threadSchema.index({ visibility: 1, "stats.memberCount": -1 });

threadSchema.pre("validate", function assignSlug(next) {
	if (!this.slug && this.name) {
		this.slug = slugify(this.name, { lower: true, strict: true });
	}
	next();
});

threadSchema.methods.isModerator = function isModerator(userId) {
	if (!userId) return false;
	if (this.creator?.toString() === userId.toString()) return true;
	return (this.moderators || []).some((id) => id.toString() === userId.toString());
};

module.exports = mongoose.model("Thread", threadSchema);
