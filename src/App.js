import "./App.css";
import BookList from "./components/BookList";
import React, { Component } from "react";
import BookService from "./service/bookService";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Categories from "./components/Categories";
import Header from "./components/Header";
import BookForm from "./components/BookForm";
import EditForm from "./components/EditForm";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      authors: [],
      categories: [],
      selectedBook: {},
    };
  }
  loadBooks = () => {
    BookService.fetchBooks().then((data) => {
      this.setState({
        books: data.data,
      });
    });
  };
  loadCategories() {
    BookService.getCategories().then((data) => {
      this.setState({
        categories: data.data,
      });
    });
  }
  loadAuthors() {
    BookService.getAuthors().then((data) => {
      this.setState({
        authors: data.data,
      });
    });
  }
  addBook = (book) => {
    BookService.addBook(book).then(() => this.loadBooks());
    console.log(this.state.books);
  };

  deleteBook = (id) => {
    BookService.deleteBook(id).then(() => this.loadBooks());
  };
  editBook = (book) => {
    this.setState({
      selectedBook: book,
    });
  };
  onEdit = (book) => {
    BookService.editBook(book).then(() => this.loadBooks());
  };
  componentDidMount() {
    this.loadBooks();
    this.loadCategories();
    this.loadAuthors();
  }
  rentBook = (id) => {
    BookService.rentBook(id).then(() => this.loadBooks());
  };
  render() {
    return (
      <Router>
        <Header></Header>
        <main>
          <div className="container">
            <Routes>
              <Route
                path="books/add"
                element={
                  <BookForm
                    addBook={this.addBook}
                    categories={this.state.categories}
                    authors={this.state.authors}
                  />
                }
              />
              <Route
                path="books/edit/:id"
                element={
                  <EditForm
                    onEdit={this.onEdit}
                    categories={this.state.categories}
                    authors={this.state.authors}
                    book={this.state.selectedBook}
                  />
                }
              />
              <Route
                path="books"
                element={
                  <BookList
                    books={this.state.books}
                    onDelete={this.deleteBook}
                    onEdit={this.editBook}
                    onRent={this.rentBook}
                  />
                }
              />
              <Route
                path="categories"
                element={<Categories categories={this.state.categories} />}
              />
              <Route
                path="*"
                element={
                  <BookList
                    books={this.state.books}
                    onDelete={this.deleteBook}
                    onEdit={this.editBook}
                    onRent={this.rentBook}
                  />
                }
              />
            </Routes>
          </div>
        </main>
      </Router>
    );
  }
}
export default App;
