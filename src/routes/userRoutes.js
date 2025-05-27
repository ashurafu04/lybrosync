const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authMiddleWare = require('../middleware/authMiddleware');

const router = express.Router();

//public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

//private routes
//todo: logout route
router.get('/', authMiddleWare.verifyToken, authMiddleWare.isAdmin, userController.getAllUsers);
router.get('/:id_user', authMiddleWare.verifyToken, authMiddleWare.isAdmin, userController.getUserById);
router.delete('/:id_user', authMiddleWare.verifyToken, authMiddleWare.isAdmin, userController.deleteUserById);

module.exports = router;