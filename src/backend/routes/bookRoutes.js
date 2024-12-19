import express from "express";
import { Book } from "../models/bookModel.js";
import { printRequest } from "../index.js";

const router = express.Router()

// Create new book
router.post("/", async (request, response) => {
    printRequest(request, "POST");
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "Requires a title, author, and publishYear."});
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to create book: ${error.message}`});
    }
});

// Get all books
router.get("/", async (request, response) => {
    printRequest(request, "GET");
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to get books: ${error.message}`});
    }
});

// Get a book by ID
router.get("/:id", async (request, response) => {
    printRequest(request, "GET");
    try {
        const {id} = request.params;

        const books = await Book.findById(id);
        return response.status(200).json(books);
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to get book: ${error.message}`});
    }
});

// Update a book
router.put("/:id", async (request, response) => {
    printRequest(request, "PUT");
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "Requires a title, author, and publishYear."});
        }

        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: "Book not found."});
        }

        return response.status(200).send({ message: `Updated book with id: ${id}`});

    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to update book: ${error.message}`});
    }
});

// Delete a book
router.delete("/:id", async (request, response) => {
    printRequest(request, "DELETE");
    try {
        const {id} = request.params;
    
        const deleteBook = await Book.findByIdAndDelete(id);
        if (!deleteBook) {
            return response.status(404).json({ message: "Book not found."});
        }

        return response.status(200).send({ message: `Deleted book with id: ${id}`});

    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to update book: ${error.message}`});
    }
});

export default router;