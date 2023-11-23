import styles from '@/styles/pagination.module.scss';
import { PaginationProps } from './pagination.types';

function Pagination() {

  return (
    <>
      <nav data-testid="pagination">
        <ul className={styles.pagination + "justify-content-center gap-2"}>

            <li className={styles.page_item + "disabled"}>
              <button className="page-link text-dark">Prev</button>
            </li>


          <li className="page-item active-link ">
            <button className="page-link current">1</button>
          </li>


            <li className="page-item disabled">
              <button className="page-link text-dark">Next</button>
            </li>

        </ul>
      </nav>
    </>
  );
}

export default Pagination;
