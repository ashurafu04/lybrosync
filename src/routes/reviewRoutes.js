const express = require('express');
const reviewController = require('../controllers/reviewController');
const authMiddleWare = require('../middleware/authMiddleware');

const router = express.Router();

//public routes
router.get('/books/:id_book', reviewController.getBookReviews);
router.get('/:id_review', reviewController.getReviewById);

//private routes
router.post('/', authMiddleWare.verifyToken, reviewController.addReview);
router.put('/:id_book/:id_review',authMiddleWare.verifyToken, authMiddleWare.isReviewOwner, reviewController.updateReview);
router.delete('/:id_book/:id_review', authMiddleWare.verifyToken, authMiddleWare.isReviewOwner, reviewController.deleteBookReview);

module.exports = router;