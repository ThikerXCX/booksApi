const { nanoid } = require("nanoid");
const books = require('./books');

const addBooks = (request,h) =>{
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    const id = nanoid(16);
    insertAt = new Date().toISOString();
    updateAt = insertAt;
    finished = pageCount === readPage ? true : false;

    if(name == undefined){
        const response = h.response ({
            status : "fail",
            message : "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    } else if (readPage>pageCount) {
        const response = h.response ({
            status : "fail",
            message : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }
    const newBooks = {id,name,year,author,summary,publisher,pageCount,readPage,finished,reading,insertAt,updateAt};

    books.push(newBooks);

    const isSuccess = books.filter((book)=>book.id === id).length>0;

    if(isSuccess){
        const response = h.response({
            status : 'success',
            message : "berhasil ditambahkan",
            data : {
                bookId : id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status : 'fail',
        message : "gagal ditambahkan",
    });
    response.code(500)
}
const getAllBooks = () =>({
    status : "success",
    data : {
        books,
    }
});

module.exports = {addBooks,getAllBooks};