const router = require('express').Router();
const { genSalt, hash } = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');

router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await genSalt(10);
            req.body.password = await hash(req.body.password, salt);
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                },
            }, { new: true });
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
});
// delete id
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
            } catch (err) {
                res.status(500).json(err);
            }
            res.status(200).json('user hsas been deleted');
        } catch (error) {
            res.status(404).json('user not found');
        }
    } else {
        res.status(401).json('you can delete only your account');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
