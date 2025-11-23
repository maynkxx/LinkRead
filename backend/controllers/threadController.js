const Thread = require('../models/Thread')

exports.createThread = async (req, res) => {
    const thread = await Thread.create({
        name: req.body.name,
        description: req.body.description,
        owner: req.user.id
    })
    res.json(thread)
}

exports.getAllThreads = async (req, res) => {
    const threads = await Thread.find()
    res.json(threads)
}

exports.getThread = async (req, res) => {
    const thread = await Thread.findById(req.params.id)
    res.json(thread)
}

exports.joinThread = async (req, res) => {
    await Thread.findByIdAndUpdate(req.params.id, {
        $addToSet: { members: req.user.id }
    })
    res.json({ message: 'Joined' })
}

exports.leaveThread = async (req, res) => {
    await Thread.findByIdAndUpdate(req.params.id, {
        $pull: { members: req.user.id }
    })
    res.json({ message: 'Left' })
}
