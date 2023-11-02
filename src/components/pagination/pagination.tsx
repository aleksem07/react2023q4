type PaginationProps = {
  fetchData: FetchData;
  page: number;
};

type FetchData = {
  next: string | null;
  previous: string | null;
};

function Pagination({ fetchData, page }: PaginationProps) {
  const handleClickNextButton = () => {
    const current = localStorage.getItem('page');
    if (current) {
      localStorage.setItem('page', String(Number(current) + 1));
    }
  };
  const handleClickPrevButton = () => {
    const current = localStorage.getItem('page');
    if (current) {
      localStorage.setItem('page', String(Number(current) - 1));
    }
  };

  return (
    <>
      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          {fetchData.previous !== null && page > 1 ? (
            <>
              <li className="page-item bg-light">
                <button
                  onClick={handleClickPrevButton}
                  className="page-link text-dark"
                >
                  Prev
                </button>
              </li>
              <li className="page-item ">
                <button className="page-link text-dark">{page - 1}</button>
              </li>
            </>
          ) : (
            <li className="page-item disabled">
              <button
                onClick={handleClickPrevButton}
                className="page-link text-dark"
              >
                Prev
              </button>
            </li>
          )}

          <li className="page-item active">
            <button className="page-link text-dark">{page}</button>
          </li>

          {fetchData.next !== null ? (
            <>
              <li className="page-item">
                <button className="page-link text-dark">{page + 1}</button>
              </li>
              <li className="page-item">
                <button
                  onClick={handleClickNextButton}
                  className="page-link text-dark"
                >
                  Next
                </button>
              </li>
            </>
          ) : (
            <li className="page-item disabled">
              <button
                onClick={handleClickNextButton}
                className="page-link text-dark"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
