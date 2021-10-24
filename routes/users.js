const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const createUser = await newUser.save();
        console.log(createUser);
        res.status(201).json(createUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
