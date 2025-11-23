const Message = require('../models/Message')

exports.sendMessage = async (req, res) => {
    const msg = await Message.create({
        from: req.user.id,
        to: req.body.to,
        text: req.body.text
    })
    res.json(msg)
}

exports.getMessages = async (req, res) => {
    const msgs = await Message.find({
        $or: [
            { from: req.user.id, to: req.params.userId },
            { from: req.params.userId, to: req.user.id }
        ]
    }).sort({ createdAt: 1 })
    res.json(msgs)
}
