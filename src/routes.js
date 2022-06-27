const { handler } = require("@hapi/hapi/lib/cors");
const { addBooks, getAllBooks, getBooksById, updateBooksById, deleteBooksById } = require("./handler");

routes = [
    {
    method : "POST",
    path : '/books',
    handler : addBooks
    },
    {
        method : "GET",
        path : '/books',
        handler : getAllBooks
    },
    {
        method : "GET",
        path : '/books/{id}',
        handler : getBooksById
    },
    {
        method : 'PUT',
        path :  '/books/{id}',
        handler :   updateBooksById
    },
    {
        method : "DELETE",
        path : "/books/{id}",
        handler : deleteBooksById
    }
];

module.exports = routes;