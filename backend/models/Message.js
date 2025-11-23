const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
	{
		url: { type: String, required: true },
		type: { type: String, enum: ["image", "gif", "link"], default: "image" },
		previewText: { type: String },
	},
	{ _id: false }
);

const messageSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		subject: { type: String, maxlength: 140, trim: true },
		body: { type: String, required: true, maxlength: 4000 },
		attachments: [attachmentSchema],
		threadKey: { type: String, index: true },
		seen: { type: Boolean, default: false },
		seenAt: { type: Date },
		status: {
			type: String,
			enum: ["sent", "deleted-sender", "deleted-receiver"],
			default: "sent",
		},
	},
	{ timestamps: true, versionKey: false }
);

messageSchema.pre("validate", function assignThreadKey(next) {
	if (!this.threadKey && this.sender && this.receiver) {
		const ids = [this.sender.toString(), this.receiver.toString()].sort();
		this.threadKey = `${ids[0]}:${ids[1]}`;
	}
	next();
});

messageSchema.methods.markAsRead = function markAsRead() {
	this.seen = true;
	this.seenAt = new Date();
};

module.exports = mongoose.model("Message", messageSchema);
