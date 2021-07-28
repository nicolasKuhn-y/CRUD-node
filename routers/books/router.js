const express = require("express");
const validateBook = require("./validation");

const router = express.Router();

const getBook = (id) => books.find((book) => book.id === +id);

const getIndexOf = (id) => books.findIndex((book) => book.id === +id);

let books = [];

router.get("/", (_, res) => res.send(JSON.stringify(books)));

router.post("/", (req, res) => {
  const { error, value } = validateBook(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const { title, rating } = value;

  books = [
    ...books,
    {
      id: books.length + 1,
      title,
      rating,
    },
  ];

  res.send("The book has been added.");
});

router.put("/:id", (req, res) => {
  let book = getBook(req.params.id);

  if (!book) {
    res.status(400).send("The book doesn't exists.");
    return;
  }

  const { error, value } = validateBook(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const { title, rating } = value;

  book = {
    id: book.id,
    title,
    rating,
  };

  books[getIndexOf(+req.params.id)] = book;

  res.send(book);
});

router.delete("/:id", (req, res) => {
  const book = getBook(req.params.id);

  if (!book) {
    res.status(400).send("The book doesn't exists");
    return;
  }

  books.splice(getIndexOf(req.params.id), 1);

  res.send(`The book ${book.title} has been deleted.`);
});

module.exports.bookRouter = router;
