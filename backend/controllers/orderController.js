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

    const allowed = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Brand sirf wahi order badal sakta hai jisme uska product ho
    if (req.user.role === 'Brand') {
      const brandProducts = await Product.find({ brand: req.user._id }).select('_id');
      const ids = brandProducts.map((p) => p._id.toString());
      const owns = order.orderItems.some((i) => ids.includes(i.product.toString()));
      if (!owns) {
        return res.status(403).json({ message: 'Not allowed to update this order' });
      }
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

// Get orders received by the logged in brand (orders containing this brand's products)
export const getBrandOrders = async (req, res) => {
  try {
    const myProducts = await Product.find({ brand: req.user._id }).select('_id');
    const myIds = myProducts.map((p) => p._id.toString());

    const orders = await Order.find({ 'orderItems.product': { $in: myProducts.map((p) => p._id) } })
      .populate('distributor', 'name email')
      .populate('orderItems.product', 'title price imageUrl')
      .sort({ createdAt: -1 });

    // Sirf is brand ke items rakho aur uska total nikalo
    const result = orders.map((order) => {
      const items = order.orderItems.filter(
        (i) => i.product && myIds.includes(i.product._id.toString())
      );
      const brandTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return {
        _id: order._id,
        distributor: order.distributor,
        orderItems: items,
        brandTotal,
        status: order.status,
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt,
      };
    });

    res.json(result);
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