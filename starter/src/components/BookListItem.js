import React from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

const BookListItem = ({ book, shelfOptions, onShelfChange }) => {
  // Function to render stars based on the rating
  const renderRating = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star-filled" : "star-empty"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`,
            }}
          ></div>
          <BookShelfChanger
            book={book}
            shelfOptions={shelfOptions}
            onShelfChange={onShelfChange}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
        {/* Rating display */}
        {book.averageRating && (
          <div className="book-rating">{renderRating(book.averageRating)}</div>
        )}
      </div>
    </li>
  );
};

BookListItem.propTypes = {
  book: PropTypes.object.isRequired,
  shelfOptions: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default BookListItem;
