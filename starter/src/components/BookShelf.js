import BookListItem from "./BookListItem";

const BookShelf = ({ books, shelfTitle, shelfOptions, onBookStatusChange }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.length > 0 ? (
            books.map((book) => {
              return (
                <BookListItem
                  book={book}
                  shelfOptions={shelfOptions}
                  onShelfChange={(newShelfName) => {
                    onBookStatusChange(book.id, newShelfName);
                  }}
                />
              );
            })
          ) : (
            <p>This shelf is empty</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
