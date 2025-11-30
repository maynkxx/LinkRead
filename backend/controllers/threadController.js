const Thread = require('../models/Thread')

exports.createThread = async (req, res) => {
    try {
        const thread = await Thread.create({
            name: req.body.title, 
            description: req.body.description,
            creator: req.user.id 
        })
        res.json(thread)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getAllThreads = async (req, res) => {
    try {
        const threads = await Thread.find().sort({ createdAt: -1 });
        
        const response = threads.map(t => ({
            _id: t._id,
            title: t.name, 
            description: t.description,
            postCount: t.stats?.postCount || 0, 
            createdAt: t.createdAt
        }));

        res.json(response)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getThread = async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.threadId);
        if (!thread) return res.status(404).json({ message: 'Thread not found' });
        const response = {
            _id: thread._id,
            title: thread.name, 
            description: thread.description,
            postCount: thread.stats?.postCount || 0,
            createdAt: thread.createdAt
        };

        res.json(response)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.joinThread = async (req, res) => {
    try {
        await Thread.findByIdAndUpdate(req.params.threadId, {
            $addToSet: { members: req.user.id }
        })
        res.json({ message: 'Joined' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.leaveThread = async (req, res) => {
    try {
        await Thread.findByIdAndUpdate(req.params.threadId, {
            $pull: { members: req.user.id }
        })
        res.json({ message: 'Left' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateThread = async (req, res) => {
    try {
        const updated = await Thread.findByIdAndUpdate(req.params.threadId, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteThread = async (req, res) => {
    try {
        await Thread.findByIdAndDelete(req.params.threadId);
        res.json({ message: 'Deleted thread' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
