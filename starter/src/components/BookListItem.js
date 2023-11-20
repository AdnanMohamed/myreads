import BookShelfChanger from "./BookShelfChanger";

const BookListItem = ({ book, shelfOptions, onShelfChange }) => {
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
            shelfOptions={shelfOptions}
            onChange={onShelfChange}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    </li>
  );
};

export default BookListItem;
