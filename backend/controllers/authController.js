const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, phone, password, role } = req.body;
        const user = new User({ name, phone, password, role });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};
