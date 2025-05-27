const jwt = require('jsonwebtoken');
const reviewModel = require('../models/reviewModel')
const adminController = require('../controllers/adminController');
const adminModel = require('../models/adminModel');

const authMiddleWare = {
    //verify jwt token
    verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1]; //get token authorization header
        if(!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        try {
            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(decoded.id_admin) {
                req.admin = { id_admin: decoded.id_admin }; 
            }
            else{
                req.user = { id_user: decoded.id_user };
            }
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            console.error(`Error in verifyToken: ${err}`);
            return res.status(401).json({ message: "Invalid token" });
        }
    },
    //check if the user is the owner of the review
    async isReviewOwner(req, res, next) {
        const { id_review } = req.params;
        const { id_user } = req.user; //get user id from the token
        try {
            //fetch review from database
            const review = await reviewModel.getReviewById(id_review);
            if(!review)
                return res.status(404).json({ message: "No review found" });
            if(review.id_user !== id_user) {
                return res.status(403).json({ message: "You are not authorized to perform this action" });
            }
            next(); 
        } catch (err) {
            console.error(`Error in isReviewOwner: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    //admin privileges check
    async isAdmin(req, res, next) {
        if (!req.admin || !req.admin.id_admin) {
            return res.status(403).json({ message: "Not authorized" });
        }
        const { id_admin } = req.admin;
        try {
            const admin = await adminModel.getAdminById(id_admin);
            if (!admin)
                return res.status(403).json({ message: "Not authorized" });
            next();
        } catch (err) {
            console.error(`Error in isAdmin: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    }    
}

module.exports = authMiddleWare;