import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BooksShelves from "./components/BooksShelves";
import SearchPage from "./components/SearchPage";
import * as BookAPI from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);

  // Return the book that has the give id, or null if no match.
  const findBook = (id) => {
    return books.find((b) => b.id === id);
  };

  const bookStatusOptions = (shelf) => {
    console.log(`bookStatusOptions: shelf=${shelf}`);
    return [
      { value: "", name: "Move to...", disabled: true, selected: false },
      {
        value: "currentlyReading",
        name: "Currently Reading",
        disabled: false,
        selected: shelf === "currentlyReading",
      },
      {
        value: "wantToRead",
        name: "Want To Read",
        disabled: false,
        selected: shelf === "wantToRead",
      },
      {
        value: "read",
        name: "Read",
        disabled: false,
        selected: shelf === "read",
      },
      { value: "none", name: "None", disabled: false, selected: false },
    ];
  };

  const updateBookShelf = (bookId, shelf) => {
    console.log(`updateBookShelf: book = ${bookId}`);
    console.log(`updateBookShelf: shelf = ${shelf}`);
    const updatedBooks = books.map((book) => {
      const newShelf = bookId === book.id ? shelf : book.shelf;
      return { ...book, shelf: newShelf };
    });
    setBooks(updatedBooks);
  };
  const shelfNames = ["currentlyReading", "wantToRead", "read"];
  const mapBooks = (books) => {
    return books.map((book) => {
      const {
        id,
        title,
        subtitle,
        authors,
        averageRating,
        categories,
        imageLinks,
        pageCount,
        publishedDate,
        shelf,
      } = book;

      return {
        id,
        title,
        subtitle,
        authors,
        averageRating,
        categories,
        imageLinks,
        pageCount,
        publishedDate,
        shelf,
      };
    });
  };
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await BookAPI.getAll();
      const mappedBooks = mapBooks(fetchedBooks);
      setBooks(mappedBooks);
    };

    fetchBooks();
  }, []);
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <BooksShelves
            books={books}
            setBooks={setBooks}
            shelfNames={shelfNames}
            bookStatusOptions={bookStatusOptions}
            onUpdateBookShelf={updateBookShelf}
          />
        }
      />
      <Route
        path="/search"
        element={
          <SearchPage
            books={books}
            bookStatusOptions={bookStatusOptions}
            onUpdateBookShelf={updateBookShelf}
          />
        }
      />
    </Routes>
  );
}

export default App;
