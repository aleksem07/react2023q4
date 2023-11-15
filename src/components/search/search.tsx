import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setSearchLS } from '../../features/search/searchSlice';
import { RootState } from '../../store/store';

function Search() {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const searchLS = useSelector((state: RootState) => state.search.searchLS);

  const handleSearchClick = () => {
    localStorage.setItem('search', searchValue);
    dispatch(setSearchLS(searchLS));
  };

  return (
    <div className="input-group p-3 gap-4">
      <input
        type="text"
        className="form-control"
        placeholder="Please enter a data..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        defaultValue={searchValue}
        onChange={(e) => {
          dispatch(setSearchValue(e.target.value));
        }}
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
