const Report = require("../models/Report");

const createReport = async (req, res) => {
    try {
        const { targetId, targetModel, reason } = req.body;

        if (!targetId || !targetModel || !reason) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const report = await Report.create({
            reporter: req.user.id,
            targetId,
            targetModel,
            reason,
        });

        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createReport };
