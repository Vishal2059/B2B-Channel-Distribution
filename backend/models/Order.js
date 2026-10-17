import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    distributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
  shippingAddress: {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
}
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);