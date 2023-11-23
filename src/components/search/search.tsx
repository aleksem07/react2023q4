import styles from '@/styles/search.module.scss';

// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setSearchValue,
//   setSearchLS,
// } from '../../features/search/search-slice';
// import { RootState } from '../../store/store';

export default function Search() {
  let searchValue = '';
  // const dispatch = useDispatch();
  // const searchValue = useSelector(
  //   (state: RootState) => state.search.searchValue
  // );
  // const searchLS = useSelector((state: RootState) => state.search.searchLS);

  const handleSearchClick = () => {
    localStorage.setItem('search', searchValue);
    // dispatch(setSearchLS(searchLS));
  };

  return (
    <>
      <input
        type="text"
        className={styles.search__input}
        placeholder="Please enter a data..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        onChange={(e) => {
          searchValue = e.target.value;
        }}
      />
      <div className="input-group-append">
        <button
          className={styles.search__button}
          type="button"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </>
  );
}
