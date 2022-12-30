import { useMemo, type HTMLAttributes, type FC, type MouseEvent } from 'react';
import { classNames } from '../utils';
import { Config } from '../config';
import Button from './Button';
import styles from './Pagination.module.css';

const Pagination: FC<HTMLAttributes<{}> & {
  page:number;
  itemsCount: number;
  onNavigate?: (payload: number) => void
}> = ({
  className,
  page,
  itemsCount,
  onNavigate,
  ...props
}) => {
  const pagesCount = useMemo<number>(() => Math.ceil(itemsCount / Config.ItemPerPage), [itemsCount]);
  const pageNumbers = useMemo<number[]>(()=> {
    const pages = [1];
    const beforeLastPage = pagesCount - 1;
    if (!pages.includes(page)) {
      pages.push(page);
    }
    if (pagesCount > 1 && !pages.includes(2)) {
      pages.push(2);
    }
    if (!pages.includes(pagesCount) ){
      pages.push(pagesCount);
    }
    if (beforeLastPage > 1 && !pages.includes(beforeLastPage)) {
      pages.push(beforeLastPage);
    }
    for (let i = 1; i <= 2; i++) {
      const prevPage = page - i;
      const nextPage = page + i;

      if (prevPage > 2 && !pages.includes(prevPage)) {
        pages.push(prevPage);
      }
      if (nextPage < pagesCount - 1 && !pages.includes(nextPage)) {
        pages.push(nextPage);
      }
    }
    return pages.sort((a,b) => a-b);
  }, [page, pagesCount]);

  const emitChange = (n: number): void => {
    if (n !== page) {
      onNavigate?.(n);
    }
  };

  const handlePrev = (ev: MouseEvent<HTMLAnchorElement>): void => {
    ev.preventDefault();
    emitChange(page-1);
  }
  const handleNext = (ev: MouseEvent<HTMLAnchorElement>): void => {
    ev.preventDefault();
    emitChange(page+1);
  }

  return (
    <div className={classNames([styles.pagination, className])} {...props}>
      {page === 1
        ? <span className={styles.nav}>Previous</span>
        : <a className={styles.nav} href={`?page=${page - 1}`} title="Previous page" onClick={handlePrev}>Previous</a>
      }
      {pageNumbers.map(
        (val, index) => {

        let hasNext = (pageNumbers?.[index + 1] ?? pagesCount) === val + 1;
        return <div key={val}>
          <Button
            color={page !== val ? 'transparent' : undefined}
            size="small"
            onClick={() => emitChange(val)}
          >{val}</Button>
          {!hasNext && val !== pagesCount ? <span className={styles.empty}></span> : ''}
        </div>
      })}
      {page === pagesCount
        ? <span className={styles.nav}>Next</span>
        : <a className={styles.nav} href={`?page=${page + 1}`} title="Next page" onClick={handleNext}>Next</a>
      }
    </div>
  )
}

export default Pagination