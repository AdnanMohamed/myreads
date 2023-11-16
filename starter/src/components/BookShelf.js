import BookShelfChanger from "./BookShelfChanger";

const BookShelf = ({ books, shelfTitle, shelfOptions }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.length > 0 ? (
            books.map((book) => {
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
                      <BookShelfChanger shelfOptions={shelfOptions} />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors[0]}</div>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Loading books...</p> // Display a loading message or spinner
          )}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
