import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BooksShelves from "./components/BooksShelves";
import SearchPage from "./components/SearchPage";
import * as BookAPI from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  // Return the value of the shelf for the book with give id
  const getShelf = (id) => {
    const shelfName = books.find((book) => book.id === id)?.shelf;
    return shelfName ?? "none";
  };

  const bookStatusOptions = (shelf) => {
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
      {
        value: "none",
        name: "None",
        disabled: false,
        selected: shelf === "none",
      },
    ];
  };

  const addBook = (book) => {
    console.log(`addBook: Hi`);
    setBooks([...books, book]);
  };

  const removeBook = (book) => {
    console.log(`removeBook: Hi`);
    const filteredBooks = books.filter((b) => b.id !== book.id);
    console.log(filteredBooks);
    setBooks(filteredBooks);
  };

  const updateBook = (bookToUpdate) => {
    const updatedBooks = books.map((book) => {
      return book.id === bookToUpdate.id ? bookToUpdate : book;
    });
    setBooks(updatedBooks);
  };

  const onShelfChange = (book, newShelf) => {
    // assumes book.shelf !== newShelf since it should
    // be called only when the book shelf value changes.
    if (book.shelf === "none") {
      addBook({ ...book, shelf: newShelf });
    } else {
      if (newShelf === "none") {
        // changing to none means removing this book.
        removeBook(book);
      } else {
        const bookToUpdate = { ...book, shelf: newShelf };
        updateBook(bookToUpdate);
      }
    }
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
            onShelfChange={onShelfChange}
          />
        }
      />
      <Route
        path="/search"
        element={
          <SearchPage
            books={books}
            bookStatusOptions={bookStatusOptions}
            getShelf={getShelf}
            onShelfChange={onShelfChange}
          />
        }
      />
    </Routes>
  );
}

export default App;
