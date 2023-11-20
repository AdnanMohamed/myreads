import { Link } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-books-bar">
      <Link className="close-search" to="/"></Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
