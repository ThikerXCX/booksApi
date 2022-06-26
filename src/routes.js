const { addBooks, getAllBooks } = require("./handler");

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
];

module.exports = routes;