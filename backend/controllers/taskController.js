const Task = require('../models/Task');
const User = require('../models/User');

exports.createTask = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            created_by: req.user._id
        });
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const match = {};
        if (req.query.overdue === 'true') match.status = 'overdue';
        if (req.query.status) match.status = req.query.status;

        const tasks = await Task.find(match)
            .populate('created_by', 'name phone')
            .populate('assigned_to', 'name phone')
            .sort({ created_at: -1 });
        res.send(tasks);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('created_by', 'name phone')
            .populate('assigned_to', 'name phone');
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name phone role');
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
