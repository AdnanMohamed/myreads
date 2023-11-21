import Book from "./Book";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { search } from "../BooksAPI";
const SearchPage = ({ bookStatusOptions, onShelfChange, getShelf }) => {
  const [searchedBooks, setSearchedBooks] = useState([]);

  const addShelfToEach = (books) => {
    return books.map((book) => {
      return {
        ...book,
        shelf: getShelf(book.id),
      };
    });
  };

  const onSearch = async (searchString) => {
    try {
      const result = await search(searchString);
      setSearchedBooks(addShelfToEach(result));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="search-books">
      <SearchBar onSearch={onSearch} />
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks.map((book) => {
            return (
              <Book
                book={book}
                shelfOptions={bookStatusOptions(book.shelf)}
                onShelfChange={onShelfChange}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
