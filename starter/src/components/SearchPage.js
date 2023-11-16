import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import { useEffect } from "react";
const SearchPage = () => {
  useEffect(async () => {
    const books = await BooksAPI.getAll();
    console.log(books);
  }, []);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/"></Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
};

export default SearchPage;
