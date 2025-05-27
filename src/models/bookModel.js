const pool = require('../config/db');

const bookModel = {
    async getAllBooks() {
        try{
            const [books] = await pool.query("SELECT * FROM books"); // Extracts the useful data directly, the data in the first element of the array
            return books;
        }
        catch(err) {
            console.error(`Error fetching all books: ${err}`);
            throw err; // re throw the error for the caller to handle
        }
    },

    async getBookById(id) {
        try{
            const [book] = await pool.query("SELECT * FROM books WHERE id_book = ?",[id]);
            return book[0] || null;
        }
        catch(err) {
            console.error(`Error fetching the book with the id ${id}: ${err}`);
            throw err;
        }
    },

    async getBookByTitle(title) {
        try{
            const [book] = await pool.query("SELECT * FROM books WHERE title = ?",[title]);
            return book[0] || null;
        }
        catch(err) {
            console.error(`Error fetching the book with the id ${id}: ${err}`);
            throw err;
        }
    },

    async addBook(title, author, pages) {
        try{
        //to do: verification with middleware or controller
        const [result] = await pool.query("INSERT INTO books (title, author, pages) VALUES (?, ?, ?)",[title, author, pages]); //parse?? verify??
        return result.insertId; // returning the id of the newly inserted book
        }
        catch(err) {
            console.error(`Error while adding a new book : ${err}`);
            throw err;
        }
    },

    async deleteBookById(id) {
        try{
            const [result] = await pool.query("DELETE FROM books WHERE id_book = ?",[id]);
            if(result.affectedRows === 0)
                return false; // no book was deleted
            return true; // success
        }
        catch(err) {
            console.log(`Error while deleting the book with id (${id}), error: ${err}`);
            throw err;
        }
    }
};

module.exports = bookModel;