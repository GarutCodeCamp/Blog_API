const router = require('express').Router();
const Post = require('../models/Post');

router.post('/', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savePost = await newPost.save();
        res.status(201).json(savePost);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        }
    } catch (error) {
        res.status(401).json(error);
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const deletedPost = await Post.findByIdAndDelete(req.params.id);
                if (!deletedPost) return res.status(404).json('not found');
                res.status(200).json('post hasbeen deleted');
            } catch (err) {
                res.status(500).json(err);
            }
        }
    } catch (error) {
        res.status(401).json(error);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const findIdPost = await Post.findById(req.params.id);
        if (!findIdPost) return res.status(404).json('posts not found');
        res.status(200).json(findIdPost);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/', async (req, res) => {
    try {
        const username = req.query.user;
        const catg = req.query.category;
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catg) {
            posts = await Post.find({
                categories: {
                    $in: [catg],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
