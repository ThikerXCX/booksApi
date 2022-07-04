const { nanoid } = require("nanoid");
const books = require('./books');

const addBooks = (request,h) =>{
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    const id = nanoid(16);
    insertedAt = new Date().toISOString();
    updatedAt = insertedAt;
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
    const newBooks = {id,name,year,author,summary,publisher,pageCount,readPage,finished,reading,insertedAt,updatedAt};

    books.push(newBooks);

    const isSuccess = books.filter((book)=>book.id === id).length>0;

    if(isSuccess){
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil ditambahkan',
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
const getAllBooks = (request,h) =>{
    const { name,reading,finished} = request.query;
    let book = books
    if(name!=undefined){
        book = books.filter((book)=>book.name.toLowerCase().includes(name.toLowerCase()));
    }
    if(reading == 1 || reading == 0){
        book = books.filter((book)=>book.reading==reading);
    }

    if(finished== 1 || finished == 0){
        book = books.filter((book)=>Number(book.finished) == finished);
    }

    const response = h.response(
        {
            status : "success",
            data : {
                books : book.map((book)=>({
                    id : book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            }
        });
    response.code(200);
    return response;
}
const getBooksById = (request,h) =>{
    const {id} = request.params;
    const index = books.filter((book)=>book.id === id);

    if (index.length == 0){
        const response = h.response({
            status : "fail",
            message : "Buku tidak ditemukan",
        });
        response.code(404);
        return response;
    }else{
        let book = books[0];
        const response = h.response({
            "status": "success",
            "data" : {
                book,
            },
        });
        response.code(200);
        return response;
    }
};
const updateBooksById=(request,h)=>{
    const {id} = request.params;
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    updatedAt = new Date().toISOString();
    finished = pageCount === readPage ? true : false;

    if(name == undefined){
        const response = h.response ({
            status : "fail",
            message : "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }
    if (readPage>pageCount) {
        const response = h.response ({
            status : "fail",
            message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'

        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book)=>book.id===id);

    if(index === -1){
        const response = h.response ({
            status : "fail",
            message : 'Gagal memperbarui buku. Id tidak ditemukan'
        });
        response.code(404);
        return response;
    }else{
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
            finished
        }
        const response = h.response({
            status: 'success',
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    }
}
const deleteBooksById=(request,h)=>{
    const {id} = request.params;
    const index = books.findIndex((book)=>book.id===id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    } 
    const response = h.response({
        status: 'fail',
        message:  'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
}

module.exports = {addBooks,getAllBooks,getBooksById,updateBooksById,deleteBooksById};