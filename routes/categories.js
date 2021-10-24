const router = require('express').Router();
const Category = require('../models/Category');

router.post('/', async (req, res) => {
    try {
        const newCat = new Category(req.body);
        const saveCat = await newCat.save();
        res.status(201).json(saveCat);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
