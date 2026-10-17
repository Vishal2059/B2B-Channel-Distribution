import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import upload from '../config/cloudinary.js'; // <-- Cloudinary multer upload middleware

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('Brand'), upload.single('image'), createProduct) 
  .get(getProducts);

export default router;