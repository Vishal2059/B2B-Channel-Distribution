import Order from '../models/Order.js';

//  Create new order
export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, totalAmount } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      distributor: req.user._id, // Logged-in user ID from protect middleware
      orderItems,
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged in distributor orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ distributor: req.user._id }).populate(
      'orderItems.product',
      'title price category'
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update order status (Brand / Admin)
// @access  Private
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

//Get all orders (Admin Only)
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