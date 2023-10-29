function Search({
  onSearchChange,
}: {
  onSearchChange: (searchValue: string) => void;
}) {
  const getSearchValue: string = localStorage.getItem('search') || '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    localStorage.setItem('search', value);
  };

  const handleSearchClick = () => {
    const searchValue = localStorage.getItem('search') || '';
    onSearchChange(searchValue);
  };

  return (
    <div className="input-group p-3 gap-4">
      <input
        type="text"
        className="form-control"
        placeholder="Please enter a data..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        defaultValue={getSearchValue}
        onChange={handleInputChange}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-dark"
          type="button"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
