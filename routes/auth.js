const router = require('express').Router();
const { genSalt, hash, compare } = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/register', body('email').isEmail(), body('password').isLength({ min: 7 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const salt = await genSalt(10);
            const hashedPassword = await hash(req.body.password, salt);
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });
            const createUser = await newUser.save();
            res.status(201).json(createUser);
        } catch (err) {
            res.status(500).json(err);
        }
    });

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) res.status(400).json('credential is Wrong');
        const validate = await compare(req.body.password, user.password);
        if (!validate) res.status(400).json('password is Wrong');
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
