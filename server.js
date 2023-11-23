import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.send("Welcome");
});

app.get('/books', async (req, res) => {
    try {
        const books = await prisma.books.findMany();
        res.json(books);
      } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.get('/books/:id', async (req, res) => {
    //const id = req.params.id;
    try {
        const { id } = req.params;
        const bookDelete = await prisma.books.findUnique({
            where: {
                id: Number(id), // teeb numbriks

            },
        });

        if (!bookDelete) {
            throw new Error('No books found');
        }
        res.status (200).json(bookDelete);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await prisma.books.delete({
            where: {
                id: Number(id),

            },
        });

        if (!book) {
            throw new Error('No books found');
        }
        res.status (201).json(book);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(400).json({ error: 'Something went wrong' });
    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });