import { Component } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageSize: 5,
    };
  }
  getBooksPage(offset, nextPageoffset) {
    console.log(offset, nextPageoffset);
    return this.props.books
      .map((b) => {
        return (
          <tr key={b.id}>
            <td>{b.name}</td>
            <td>{b.category}</td>
            <td>
              {b.author.name} {b.author.surname}
            </td>
            <td>{b.availableCopies}</td>
            <td className="d-flex justify-content-end">
              <Link
                className="btn btn-primary mx-2"
                onClick={() => this.props.onEdit(b)}
                to={`/books/edit/${b.id}`}
              >
                Edit
              </Link>
              <span
                title="Delete"
                className="btn btn-danger mx-2"
                onClick={() => {
                  this.props.onDelete(b.id);
                }}
              >
                Delete
              </span>
              <span
                title="Rent"
                className="btn btn-info mx-2"
                onClick={() => {
                  this.props.onRent(b.id);
                }}
              >
                Rent
              </span>
            </td>
          </tr>
        );
      })
      .filter((book, index) => {
        return index >= offset && index < nextPageoffset;
      });
  }
  handleChange(data) {
    this.setState({
      page: data.selected,
    });
  }
  render() {
    const offset = this.state.pageSize * this.state.page;
    const nextPageoffset = offset + this.state.pageSize;
    const books = this.getBooksPage(offset, nextPageoffset);
    const pageCount = Math.ceil(this.props.books.length / this.state.pageSize);
    return (
      <div className="container mm-4 mt-5">
        <div className="row">
          <div className="row">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope={"col"}> Name</th>
                  <th scope={"col"}> Category</th>
                  <th scope={"col"}> Author</th>
                  <th scope={"col"}> Available Copies</th>
                </tr>
              </thead>
              <tbody>{books}</tbody>
            </table>

            <Link className="btn btn-dark" to="/books/add">
              Add book
            </Link>
          </div>
        </div>
        <ReactPaginate
          previousLabel={"back"}
          nextLabel={"next"}
          breakLabel={<a href="/#">...</a>}
          pageClassName={"mx-2"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName={"pagination m-4 justify-content-center"}
          activeClassName="active"
          pageCount={pageCount}
          onPageChange={(data) => this.handleChange(data)}
        />
      </div>
    );
  }
}
export default BookList;
