const express = require('express');
const Favorite = require('../models/Favorite');
const router = express.Router();

// Get all favorites
router.get('/', async (req, res) => {
  try {
    const favs = await Favorite.find().sort({ createdAt: -1 });
    res.json(favs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a favorite
router.post('/', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) return res.status(400).json({ error: 'City required' });
    const existing = await Favorite.findOne({ city });
    if (existing) return res.status(400).json({ error: 'City already saved' });
    const fav = new Favorite({ city });
    await fav.save();
    res.status(201).json(fav);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a favorite by id
router.delete('/:id', async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
