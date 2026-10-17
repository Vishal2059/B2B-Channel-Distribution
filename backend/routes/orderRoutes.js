import express from 'express';
import { addOrderItems, getMyOrders, updateOrderStatus, getAllOrders } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('Distributor', 'Brand'), addOrderItems)
  .get(protect, authorizeRoles('Admin'), getAllOrders); 

router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, authorizeRoles('Brand', 'Admin'), updateOrderStatus);

export default router;