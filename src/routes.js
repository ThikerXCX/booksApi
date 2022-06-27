const { handler } = require("@hapi/hapi/lib/cors");
const { addBooks, getAllBooks, getBooksById, updateBooksById } = require("./handler");

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
];

module.exports = routes;