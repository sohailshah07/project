const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item'
    },
    qty: {
      type: Number,
    }
  }],
  total: {
    type: Number
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});


const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;
