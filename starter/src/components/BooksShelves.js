import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as BookAPI from "../BooksAPI";
import BookShelf from "./BookShelf";

const BooksShelves = ({ books, setBooks, shelfNames, onUpdateBookShelf }) => {
  console.log(books);

  const onBookStatusChange = (book, status) => {
    // Implement
    return;
  };

  const booksByShelf = (shelfName) => {
    return books.filter((b) => b.shelf === shelfName);
  };

  // Summary: Group the books by their shelves.
  // Returns an object with the shelf names as keys
  // and the values are an array of books that belong to that shelf.
  const groupByShelf = (books) => {
    const bookShelves = shelfNames.reduce((acc, shelfName) => {
      return Object.assign(acc, { [shelfName]: booksByShelf(shelfName) });
    }, {});
    return bookShelves;
  };
  const shelves = groupByShelf(books);
  console.log(shelves);
  const currentlyReadingBooks = shelves["currentlyReading"];
  const wantToReadBooks = shelves["wantToRead"];
  const readBooks = shelves["read"];
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
      { value: "none", name: "None", disabled: false, selected: false },
    ];
  };
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            books={currentlyReadingBooks}
            shelfTitle={"Currently Reading"}
            shelfOptions={bookStatusOptions("currentlyReading")}
            onBookStatusChange={onUpdateBookShelf}
          />
          <BookShelf
            books={wantToReadBooks}
            shelfTitle={"Want To Read"}
            shelfOptions={bookStatusOptions("wantToRead")}
            onBookStatusChange={onUpdateBookShelf}
          />
          <BookShelf
            books={readBooks}
            shelfTitle={"Read"}
            shelfOptions={bookStatusOptions("read")}
            onBookStatusChange={onUpdateBookShelf}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to={"/search"} />
      </div>
    </div>
  );
};

export default BooksShelves;
