import styles from '@/styles/search.module.scss';

export default function Search() {
  const handleSearchChange = (e: string) => {
    const currentUrl = window.location.href;
    const baseUrl = window.location.origin;
    window.history.replaceState({}, document.title, baseUrl);
    const url = new URL(currentUrl);
    url.searchParams.set('search', e.toString());
    window.location.href = url.toString();
  };

  return (
    <>
      <input
        type="text"
        className={styles.search__input}
        placeholder="Please enter a data..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <div className="input-group-append">
        <button className={styles.search__button} type="button">
          Search
        </button>
      </div>
    </>
  );
}
