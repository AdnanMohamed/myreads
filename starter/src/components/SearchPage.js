import { Link } from "react-router-dom";
import BookShelfChanger from "./BookShelfChanger";
import { useState } from "react";
const SearchPage = ({ books, bookStatusOptions, onUpdateBookShelf }) => {
  const [searchedBooks, setSearchedBooks] = useState([]);

  const filterBooks = (searchString) => {
    const titleMatch = (title, str) => {
      return title.toUpperCase().includes(str.toUpperCase());
    };
    const cleanStr = searchString.trim().toUpperCase();
    return books.filter((b) => titleMatch(b.title, cleanStr));
  };

  const onSearch = (searchString) => {
    setSearchedBooks(filterBooks(searchString));
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/"></Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks?.map((book) => {
            console.log(book.shelf);
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 188,
                        backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                      }}
                    ></div>
                    <BookShelfChanger
                      shelfOptions={bookStatusOptions(book.shelf)}
                      onChange={(newShelfName) => {
                        onUpdateBookShelf(book.id, newShelfName);
                      }}
                    />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors[0]}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
