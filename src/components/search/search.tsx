import getHeroesAll from '../../services/heroes/heroes';

const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  localStorage.setItem('search', e.target.value);
};

const searchButton = () => {
  getHeroesAll(getSearchValue);
};

const getSearchValue: string = localStorage.getItem('search') || '';

function Search() {
  return (
    <div className="input-group p-3 gap-4">
      <input
        type="text"
        className="form-control"
        placeholder="Please enter a data..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        defaultValue={getSearchValue}
        onChange={handleSearch}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-dark"
          type="button"
          onClick={searchButton}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
