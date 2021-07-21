const express = require('express');
const router = express.Router();
const { User, joiSchema } = require('./userModel');

router.post('/', async (req, res) => {
    const { error } = joiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('Email already exists');

    user = new User(req.body);
    user = await user.save();
    res.send(user)
});

router.get('/', async (req, res) => {
    if (!req.query.email) return res.send(await User.find());

    const user = await User.findOne({ email: req.query.email });
    if (!user) return res.status(404).send('User with requested email not found');
    res.send(user);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User with requested Id not found');

    res.send(user);
});

router.put('/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User with requested Id not found');

    const { error } = joiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    for (let key in req.body) {
        user[key] = req.body[key]
    }
    user = await user.save();
    res.send(user);
});

router.put('/', async (req, res) => {
    if (!req.query.email) return res.status(400).send('Send email in query parameter');

    let user = await User.findOne({ email: req.query.email });
    if (!user) return res.status(404).send('User with requested email not found');

    const { error } = joiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    for (let key in req.body) {
        user[key] = req.body[key]
    }
    user = await user.save();
    res.send(user);
});

router.delete('/', async (req, res) => {
    if (!req.query.email) return res.send(await User.find());

    const user = await User.findOneAndDelete({ email: req.query.email });
    if (!user) return res.status(404).send('User with requested email not found');
    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User with requested Id not found');
    res.send(user);
});

module.exports = router;
