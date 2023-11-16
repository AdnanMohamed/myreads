import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BooksShelves from "./components/BooksShelves";
import SearchPage from "./components/SearchPage";
import * as BookAPI from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);
  const shelfNames = ["currentlyReading", "wantToRead", "read"];
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await BookAPI.getAll();
      setBooks(fetchedBooks);
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
          />
        }
      />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
