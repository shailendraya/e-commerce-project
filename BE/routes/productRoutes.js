const express = require('express');
const { getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getProduct, 
    createProductReview,
    getAdminProducts,
    getProductReviews,
    deleteReview
} = require('../controllers/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')
const router = express.Router();

router.route('/products').get( getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)

router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview)

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;