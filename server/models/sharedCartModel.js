const mongoose = require('mongoose');

const sharedCartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productName: String,
    quantity: Number,
    imageUrl: String,
    note: String
  }],
  shareId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('SharedCart', sharedCartSchema); 