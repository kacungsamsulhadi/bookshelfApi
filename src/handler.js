const { nanoid } = require("nanoid");
const books = require("./books");

// add book
const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  // name not null  
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  // page count less than read page
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. " + "readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  // declaration
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    insertedAt,
    updatedAt,
  };
  // push new book
  books.push(newBook);
  // filter book
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  // response succes
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  // error to add book
  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};
// get all books detail
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = books;
  // by name
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }
  // by reading categories
  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) => Number(book.reading) === Number(reading));
  }
  // by finished categories
  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((book) => Number(book.finished) === Number(finished));
  }
  // response success
  const response = h.response({
    status: "success",
    data: {
      // response body
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};
// get book by id
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  // filter book by id
  const book = books.filter((n) => n.id === id)[0];
  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  // response failed
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

// edit book by id
const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  // name must be defined
  // if name undefined, response is failed
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  // read page must less than page count
  // if read page more than page count, response is failed
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. " + "readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);

    return response;
  }
  // update date
  const updatedAt = new Date().toISOString();
  // filter book index by id
  const index = books.findIndex((book) => book.id === id);
  // index must not be the same as -1
  if (index !== -1) {
    const finished = pageCount === readPage;
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
      finished,
      updatedAt,
    };

    // if conditions are met
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);

    return response;
  }

  // if conditions not met
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
// delete book by id
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  // filter by id
  const index = books.findIndex((note) => note.id === id);

  // index must not be the same as -1
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// export all module which has been made
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
