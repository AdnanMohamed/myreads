import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BooksShelves from "./components/BooksShelves";
import SearchPage from "./components/SearchPage";
import * as BookAPI from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  // Return the book that has the give id, or null if no match.
  const findBook = (id) => {
    return books.find((b) => b.id === id);
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
            onUpdateBookShelf={updateBookShelf}
          />
        }
      />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
