import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true // Wholesale price
    },
    moq: { 
      type: Number, 
      required: true, 
      default: 1 // Minimum Order Quantity 
    },
    stock: { 
      type: Number, 
      required: true, 
      default: 0 // Available Stock
    }
  },
  { timestamps: true } 
);

export default mongoose.model('Product', productSchema);