import express from 'express';
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  createProductReview,
  updateProduct,
  getTopProducts,
} from '../Controllers/ProductController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/top').get(getTopProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
