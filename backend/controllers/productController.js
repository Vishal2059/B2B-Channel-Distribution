import Product from '../models/Product.js';

//  Create a new product 
export const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, moq, stock } = req.body;
    const product = new Product({
      brand: req.user._id,
      title,
      description,
      category,
      price,
      moq,
      stock
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products catalog
export const getProducts = async (req, res) => {
  try {
    // populate('brand', 'name email') se brand ka Name aur Email bhi response me aayega
    const products = await Product.find().populate('brand', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};