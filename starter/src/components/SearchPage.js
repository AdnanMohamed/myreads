import { Link } from "react-router-dom";
import BookListItem from "./BookListItem";
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
              <BookListItem
                book={book}
                shelfOptions={bookStatusOptions(book.shelf)}
                onShelfChange={(newShelfName) => {
                  onUpdateBookShelf(book.id, newShelfName);
                }}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
