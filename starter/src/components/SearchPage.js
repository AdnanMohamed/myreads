import Book from "./Book";
import { useState } from "react";
import SearchBar from "./SearchBar";
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
      <SearchBar onSearch={onSearch} />
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks?.map((book) => {
            return (
              <Book
                book={book}
                shelfOptions={bookStatusOptions(book.shelf)}
                onShelfChange={onUpdateBookShelf}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
