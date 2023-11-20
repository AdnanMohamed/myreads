import Book from "./Book";

const BookCollection = ({ books, shelfOptions, onShelfChange }) => {
  return (
    <ol className="books-grid">
      {books.length > 0 ? (
        books.map((book) => {
          return (
            <Book
              book={book}
              shelfOptions={shelfOptions}
              onShelfChange={onShelfChange}
            />
          );
        })
      ) : (
        <p>This shelf is empty</p>
      )}
    </ol>
  );
};

export default BookCollection;
