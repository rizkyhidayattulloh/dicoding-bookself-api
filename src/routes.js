const handler = require("./handler");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: handler.addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: handler.getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: handler.getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: handler.editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: handler.deleteBookByIdHandler,
  },
];
