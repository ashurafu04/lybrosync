const bookModel = require('../models/bookModel');

const bookController = {
    //get all books
    async getAllBooks(req, res) {
        try {
            const books = await bookModel.getAllBooks();
            if(books.length === 0) {
                return res.status(404).json({ message: "No books found" });
            }
            res.status(200).json(books);
        } catch (err) {
            console.error(`Error getAllBooks: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    //get book by id
    async getBookById(req, res) {
        const { id_book } = req.params;
        try{
            const book = await bookModel.getBookById(id_book);
            if(!book)
                return res.status(404).json({ message: "No book found" });
            return res.status(200).json(book);
        }
        catch(err) {
            console.error(`Error getBookById: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    //get book by title
    async getBookByTitle(req, res) {
        const { title } = req.params;
        try{
            const book = await bookModel.getBookByTitle(title);
            if(!book)
                return res.status(404).json({ message: "No book found" });
            return res.status(200).json(book);
        }
        catch(err) {
            console.error(`Error getBookById: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    //add a new book
    async addBook(req, res) {
        const { title, author, pages } = req.body;
        //validate input 
        if(!title || !author || !pages) {
            return res.status(400).json({ message: "Title, author and pages are required" });
        }
        
        try {
            const insertId = await bookModel.addBook(title, author, pages);
            return res.status(201).json({ message: `Book(${insertId}) added successfully!`, bookId: insertId });
        } catch (err) {
            console.error(`Error addBook: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    //delete a book by id
    async deleteBookById(req, res) {
        const { id_book } = req.params; 
        try {
            const result = await bookModel.deleteBookById(id_book);
            if(!result)
                return res.status(200).json({ message: "No book deleted"});
            return res.status(200).json({ message: `Book(${id_book}) deleted successfully!`, deletedBookId: id_book });
        } catch (err) {
            console.error(`Error deleteBookById: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = bookController;