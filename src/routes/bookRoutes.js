const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleWare = require('../middleware/authMiddleware');

const router = express.Router();

//public routes
router.get('/', bookController.getAllBooks);
router.get('/:id_book', bookController.getBookById);

//protected routes (admin only)

router.post('/', authMiddleWare.verifyToken, authMiddleWare.isAdmin, bookController.addBook);
router.delete('/:id_book', authMiddleWare.verifyToken, authMiddleWare.isAdmin, bookController.deleteBookById);

module.exports = router;