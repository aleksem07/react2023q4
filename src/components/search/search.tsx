import React, { useContext } from 'react';
import { HeaderSearchContext } from '../../util/contextAPI/header-search-value';

function Search() {
  const { headerSearchValue, setHeaderSearchValue } =
    useContext(HeaderSearchContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    localStorage.setItem('search', value);
  };

  const handleSearchClick = () => {
    setHeaderSearchValue(localStorage.getItem('search') || '');
  };

  return (
    <div className="input-group p-3 gap-4">
      <input
        type="text"
        className="form-control"
        placeholder="Please enter a data..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        defaultValue={headerSearchValue}
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
