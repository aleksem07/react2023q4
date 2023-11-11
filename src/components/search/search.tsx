import React from 'react';
import { useSearch } from '../../util/contextAPI/header-search-value';
import { useState } from 'react';

function Search() {
  const { headerSearchValue, setHeaderSearchValue } = useSearch();
  const [value, setValue] = useState(headerSearchValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleSearchClick = () => {
    localStorage.setItem('search', value);
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
