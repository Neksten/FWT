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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      dispatch(setCurrentPageReducerAction(currentPage - 1));
    }
  };
  const handleClickAllPrev = () => {
    if (currentPage !== 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      dispatch(setCurrentPageReducerAction(1));
    }
  };
  const handleClickNext = () => {
    if (currentPage < pagesCount) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      dispatch(setCurrentPageReducerAction(currentPage + 1));
    }
  };
  const handleClickAllNext = () => {
    if (currentPage < pagesCount) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      dispatch(setCurrentPageReducerAction(pagesCount));
    }
  };
  const handleClickPage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(setCurrentPageReducerAction(page));
  };

  return (
    <div className={`${styles.pagination} ${isDark && styles.dark}`}>
      <div className={`${styles.paginationArrowsPrev} ${currentPage === 1 && styles.hide}`}>
        <div className={styles.paginationItem} onClick={handleClickAllPrev}>
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
            onClick={() => handleClickPage(i)}
          >
            {i}
          </div>
        ))}
      </div>
      <div className={`${styles.paginationArrowsNext} ${currentPage === pagesCount && styles.hide}`}>
        <div className={styles.paginationItem} onClick={handleClickNext}>
          <ArrowNext />
        </div>
        <div className={styles.paginationItem} onClick={handleClickAllNext}>
          <ArrowAllNext />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
