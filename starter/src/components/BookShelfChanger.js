const BookShelfChanger = ({ shelfOptions }) => {
  const createOption = (option) => {
    return (
      <option
        value={option.value}
        disabled={option.disabled}
        selected={option.selected}
      >
        {option.name}
      </option>
    );
  };
  return (
    <div className="book-shelf-changer">
      <select>
        {shelfOptions.map((option) => {
          return createOption(option);
        })}
      </select>
    </div>
  );
};

export default BookShelfChanger;
