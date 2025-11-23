const Message = require('../models/Message')

exports.sendMessage = async (req, res) => {
    const msg = await Message.create({
        from: req.user.id,
        to: req.body.to,
        text: req.body.text
    })
    res.json(msg)
}

exports.getConversation = async (req, res) => {
    const msgs = await Message.find({
        $or: [
            { from: req.user.id, to: req.params.receiverId },
            { from: req.params.receiverId, to: req.user.id }
        ]
    }).sort({ createdAt: 1 })
    res.json(msgs)
}

exports.getInbox = async (_req, res) => {
    // stub implementation
    res.json({ message: 'Inbox not implemented' });
}

exports.markAsSeen = async (_req, res) => {
    // stub implementation
    res.json({ message: 'Mark as seen not implemented' });
}

exports.deleteMessage = async (_req, res) => {
    // stub implementation
    res.json({ message: 'Delete message not implemented' });
}

exports.editMessage = async (_req, res) => {
    // stub implementation
    res.json({ message: 'Edit message not implemented' });
}
