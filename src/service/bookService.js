import axios from "../custom-axios/axios";

const BookService = {
  fetchBooks: () => {
    return axios.get("/books");
  },
  addBook: (book) => {
    return axios.post("/books/add", {
      ...book,
    });
  },
  editBook: (book) => {
    return axios.post("/books/edit", {
      ...book,
    });
  },
  getBook: (id) => {
    return axios.get(`/books/${id}`);
  },
  deleteBook: (id) => {
    return axios.delete(`/books/delete/${id}`);
  },
  getCategories: () => {
    return axios.get("/books/categories");
  },
  getAuthors: () => {
    return axios.get("books/authors");
  },
  rentBook: (id) => {
    return axios.put(`/books/rent/${id}`);
  },
};
export default BookService;
