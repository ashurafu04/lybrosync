const reviewModel = require('../models/reviewModel');

const reviewController = {

    async getBookReviews(req, res) {
        const { id_book } = req.params;
        try {
            const bookReviews = await reviewModel.getBookReviews(id_book);
            if(bookReviews.length === 0)
                return res.status(404).json({ message: "No reviews were found" });
            return res.status(200).json(bookReviews);
        } catch (err) {
            console.error(`Error getBookReviews: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getReviewById(req, res) {
        const { id_review } = req.params;
        try {
            const ReviewById = await reviewModel.getReviewById(id_review);
            if(!ReviewById)
                return res.status(404).json({ message: "No review found" });
            return res.status(200).json(ReviewById);
        } catch (err) {
            console.error(`Error getReviewById: ${err}`);
            return res.status(500).json({ message: "Internal server error" }); 
        }
    },

    async getUserBookReview(req, res) {
        const { id_user, id_book } = req.params;
        try {
            const userBookReview = await reviewModel.getUserBookReview(id_user, id_book);
            if(!userBookReview)
                return res.status(404).json({ message: "No review found" });
            return res.status(200).json(userBookReview);
        } catch (err) {
            console.error(`Error getUserBookReview: ${err}`);
            return res.status(500).json({ message: "Internal server error" }); 
        }
    },

    async addReview(req, res) {
        const { id_user, id_book, review, stars } = req.body;
        if(!id_user || !id_book || !review || !stars)
            return res.status(400).json({ message: "id_user, id_book, review and stars are required"});
        try {
            const idAddedReview = await reviewModel.addReview(id_user, id_book, review, stars);
            return res.status(201).json({ message: "Review added successfully!",id_review: idAddedReview });
        } catch (err) {
            console.error(`Error addReview: ${err}`);
            return res.status(500).json({ message: "Internal server error" }); 
        }
    },

    async updateReview(req, res) {
        const { id_user } = req.user;
        const { id_book, id_review } = req.params;
        const { new_review } = req.body;
        if(!id_user || !id_book || !new_review)
            return res.status(400).json({ message: "id_user, id_book,  new_review are required"});
        try {
            const result = await reviewModel.updateReview(id_user, id_book, id_review, new_review);
            if(!result)
                return res.status(404).json({ message: "No review found"});
            return res.status(200).json({ message: "Review updated successfully", id_review : id_review, newReview: new_review});
        } catch (err) {
            console.error(`Error updateReview: ${err}`);
            return res.status(500).json({ message: "Internal server error" }); 
        }
    },

    async deleteBookReview(req, res) {
        const { id_user } = req.user;
        const { id_book } = req.params;
        try {
            const result = reviewModel.deleteBookReview(id_user, id_book);
            if(!result)
                return res.status(404).json({ message: "No review found"});
            return res.status(200).json({ message: "Review deleted successfully"});
        } catch (err) {
            console.error(`Error deleteBookReview: ${err}`);
            return res.status(500).json({ message: "Internal server error" }); 
        }
    }
};

module.exports = reviewController;