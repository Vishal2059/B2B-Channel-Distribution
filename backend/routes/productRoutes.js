import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('Brand'), createProduct) // only Brand role
  .get(getProducts);           

export default router;