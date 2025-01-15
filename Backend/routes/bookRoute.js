import express from "express";
const router = express.Router();
import { Book } from '../models/bookModel.js';


//Route to Save a new Book
router.post('/', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send('All fields are required');}
            const book = await Book.create(req.body);
            return res.status(201).send(book);
    }catch(err){
        console.log(err.message);
        response.status(500).send(err.message);
    }
});

//Route to get all books
router.get('/', async (req, res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }catch(err){
        console.log(err.message);
        response.status(500).send(err.message);
    }
});
 
//Route to get a single book
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const books = await Book.findById(id);
        return res.status(200).json(books);
    }catch(err){
        console.log(err.message);
        response.status(500).send(err.message);
    }
});

//Route to update a book
router.put('/:id', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send('All fields are required');
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).send('Book not found');
        }
        return res.status(200).send('Book updated successfully');

    }catch(err){
        console.log(err.message);
        response.status(500).send(err.message);
    }
});

//Route to delete a book
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send('Book not found');
        }
        return res.status(200).send('Book deleted successfully');
    }catch(err){
        console.log(err.message);
        response.status(500).send(err.message);
    }
});

export default router;