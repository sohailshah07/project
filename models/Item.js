const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});


const Item = mongoose.model("item", itemSchema);
module.exports = Item;
