import Product from '../models/Product.js';

// Create a new product (With Cloudinary Image Support)
export const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, moq, stock } = req.body;

    // Cloudinary se image URL req.file.path me milta hai, 
    // ya phir direct link hone par req.body.imageUrl me hoga
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Product image is required' });
    }

    const product = new Product({
      brand: req.user._id,
      title,
      description,
      category,
      price,
      moq,
      stock,
      imageUrl,
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
    const products = await Product.find().populate('brand', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};