const express = require("express");
const portDirection = require("./env");
const { bookRouter } = require("./routers/books/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", bookRouter);
portDirection;

const port = portDirection;

app.listen(port);
