const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  city: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
