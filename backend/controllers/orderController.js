import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Create new order with stock deduction & calculated total amount
export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    let totalAmount = 0;
    const processedItems = [];

    // Loop through items to verify stock, calculate total, and update stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      // Check if stock is sufficient
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.title}. Available stock: ${product.stock}` 
        });
      }

      // Calculate total amount securely using database price
      const itemPrice = product.price;
      totalAmount += itemPrice * item.quantity;

      // Push item with verified price from DB
      processedItems.push({
        product: item.product,
        quantity: item.quantity,
        price: itemPrice
      });

      // Deduct stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create and save the order with processed items
    const order = new Order({
      distributor: req.user._id, // Logged-in distributor ID from protect middleware
      orderItems: processedItems,
      shippingAddress,
      totalAmount,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      message: 'Order placed successfully and stock updated',
      createdOrder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged in distributor orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ distributor: req.user._id }).populate(
      'orderItems.product',
      'title price category imageUrl'
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (Brand / Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // New status (e.g., Processing, Delivered, Cancelled)

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status || order.status;
    const updatedOrder = await order.save();

    res.json({
      message: 'Order status updated successfully',
      updatedOrder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin Only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('distributor', 'name email')
      .populate('orderItems.product', 'title price');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};