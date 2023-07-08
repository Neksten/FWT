import React, { useContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { ArrowAllPrev } from '../../assets/ArrowAllPrev';
import { ArrowPrev } from '../../assets/ArrowPrev';
import { ArrowAllNext } from '../../assets/ArrowAllNext';
import { ArrowNext } from '../../assets/ArrowNext';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createPages } from '../../pagesCreator';
import { setCurrentPageReducerAction } from '../../store/reducers/paintingsReducer';

import ThemeContext from '../../context/ThemeContext';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { painting, currentPage, limit, totalCount } = useTypedSelector((state) => state.painting);
  const pagesCount = Math.ceil(totalCount / limit);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    setPages(createPages(pagesCount, currentPage));
  }, [pagesCount, currentPage, painting]);

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { isDark } = themeContext;

  const handleClickPrev = () => {
    if (currentPage !== 1) {
      dispatch(setCurrentPageReducerAction(currentPage - 1));
    }
  };
  const handleClickNext = () => {
    if (currentPage < pagesCount) {
      dispatch(setCurrentPageReducerAction(currentPage + 1));
    }
  };

  return (
    <div className={`${styles.pagination} ${isDark && styles.dark}`}>
      <div className={`${styles.paginationArrowsPrev} ${currentPage === 1 && styles.hide}`}>
        <div className={styles.paginationItem} onClick={() => dispatch(setCurrentPageReducerAction(1))}>
          <ArrowAllPrev />
        </div>
        <div className={styles.paginationItem} onClick={handleClickPrev}>
          <ArrowPrev />
        </div>
      </div>
      <div className={styles.paginationPages}>
        {pages.map((i, idx) => (
          <div
            key={idx}
            className={`${styles.paginationItem} ${currentPage === i && styles.currentPage}`}
            onClick={() => dispatch(setCurrentPageReducerAction(i))}
          >
            {i}
          </div>
        ))}
      </div>
      <div className={`${styles.paginationArrowsNext} ${currentPage === pagesCount && styles.hide}`}>
        <div className={styles.paginationItem} onClick={handleClickNext}>
          <ArrowNext />
        </div>
        <div className={styles.paginationItem} onClick={() => dispatch(setCurrentPageReducerAction(pagesCount))}>
          <ArrowAllNext />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
