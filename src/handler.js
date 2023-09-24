const { nanoid } = require("nanoid");
const { validate } = require("./validations/validator");
const filter = require("./filters/filter");
const bookFilter = require("./filters/book-filter");

const bookStoreValidation = require("./validations/book-store-validation");
const bookUpdateValidation = require("./validations/book-update-validation");

const books = require("./books");

const addBookHandler = (request, h) => {
  let errors = validate(bookStoreValidation, request.payload);

  if (errors) {
    return h
      .response({
        status: "fail",
        message: errors,
      })
      .code(400);
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year: parseInt(year),
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    })
    .code(201);
};

const getAllBooksHandler = (request, h) => {
  const filteredBooks = filter(books, bookFilter, request.query) ?? books;

  return h.response({
    status: "success",
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }

  return h.response({
    status: "success",
    data: {
      book,
    },
  });
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }

  const errors = validate(bookUpdateValidation, request.payload);

  if (errors) {
    return h
      .response({
        status: "fail",
        message: errors,
      })
      .code(400);
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year: parseInt(year),
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  return h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  }

  books.splice(bookIndex, 1);

  return h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
