const User = require('../models/User')

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    res.json(user)
}

exports.updateUser = async (req, res) => {
    const updates = req.body
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password')
    res.json(user)
}

exports.follow = async (req, res) => {
    const { id } = req.params
    await User.findByIdAndUpdate(req.user.id, { $push: { following: id } })
    await User.findByIdAndUpdate(id, { $push: { followers: req.user.id } })
    res.json({ message: 'Followed' })
}

exports.unfollow = async (req, res) => {
    const { id } = req.params
    await User.findByIdAndUpdate(req.user.id, { $pull: { following: id } })
    await User.findByIdAndUpdate(id, { $pull: { followers: req.user.id } })
    res.json({ message: 'Unfollowed' })
}
