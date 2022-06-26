const { handler } = require("@hapi/hapi/lib/cors");
const { addBooks, getAllBooks, getBooksById } = require("./handler");

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
];

module.exports = routes;