const pool = require('../config/db');

const reviewModel = {
    async getBookReviews(id_book) {
        try{
            const [bookReviews] = await pool.query("SELECT * FROM reviews WHERE id_book = ?", [id_book]);
            return bookReviews;
        }catch(err) {
            console.error(`Error fetching book(${id_book}) reviews: ${err}`);
            throw err;
        }
    },

    async getReviewById(id_review) {
        try{
            const [review] = await pool.query("SELECT * FROM reviews where id_review = ?",[id_review]);
            return review[0] || null;
        }catch(err) {
            console.error(`Error fetching review with the id(${id_review}): ${err}`);
            throw err;
        }
    },

    async getUserBookReview(id_user, id_book) {
        try{
            const [userBookReview] = await pool.query("SELECT * FROM reviews where id_user = ? AND id_book = ?",[id_user, id_book]);
            return userBookReview[0] || null;
        }catch(err) {
            console.error(`Error fetching review for user(${id_user}) and book(${id_book}): ${err}`);
            throw err;
        }
    },

    async addReview(id_user, id_book, review, stars) {
        try{
            const [result] = await pool.query("INSERT INTO reviews (id_user, id_book, review, stars) VALUES(?, ?, ?, ?)", [id_user, id_book, review, stars]);
            return result.insertId;
        }catch(err) {
            console.error(`Error adding review for user(${id_user}) and book(${id_book}): ${err}`);
            throw err;
        }
    },

    async updateReview(id_user, id_book, id_review, new_review) {
        try{
            const [result] = await pool.query("UPDATE reviews SET review = ? WHERE id_user = ? AND id_book = ?",[new_review, id_user, id_book]);
            if(result.affectedRows === 0)
                return false;
            return true;
        }catch(err) {
            console.error(`Error updating  user(${id_user}) book(${id_book}) review ${id_review}: ${err}`);
            throw err;
        }
    },

    async deleteBookReview(id_user, id_book) {
        try{
            const [result] = await pool.query("DELETE FROM reviews WHERE id_user = ? AND id_book = ?", [id_user, id_book]);
            if(result.affectedRows === 0)
                return false;
            return true;
        }catch(err) {
            console.error(`Error deleting review for user(${id_user}) and book(${id_book}): ${err}`);
            throw err;
        }
    }
};

module.exports = reviewModel;