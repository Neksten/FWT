import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import { FilterFromBefore } from '../types/filters';
import DropDownFromTo from '../components/DropDownFormTo/DropDownFormTo';
import CustomInput from '../components/CustomInput/CustomInput';
import PictureList from '../components/PictureList/PictureList';
import { useActions } from '../hooks/useActions';
import { IAuthor, IAuthorState } from '../types/author';
import { ILocation, ILocationState } from '../types/location';

import DropDownSelect from '../components/DropDownSelect/DropDownSelect';

import Pagination from '../components/Pagination/Pagination';
import { useTypedSelector } from '../hooks/useTypedSelector';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const [author, setAuthor] = useState<IAuthorState>({ selected: { id: 0, name: '' }, list: [] });
  const [location, setLocation] = useState<ILocationState>({ selected: { id: 0, location: '' }, list: [] });
  const [inputValue, setInputValue] = useState<string>('');
  const [fromBefore, setFromBefore] = useState<FilterFromBefore>({
    from: '',
    before: '',
  });
  const { painting, loading, currentPage, limit } = useTypedSelector((state) => state.painting);
  const { axiosGetPainting } = useActions();

  const handleChange = useCallback((name: string, value: string): void => {
    setFromBefore((prev: FilterFromBefore) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    axiosGetPainting({
      q: inputValue,
      authorId: author.selected.id,
      locationId: location.selected.id,
      created_gte: fromBefore.from,
      created_lte: fromBefore.before,
      _page: currentPage,
      _limit: limit,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, author, location, fromBefore, currentPage, limit]);

  useEffect(() => {
    (async function () {
      const authorsResponse = await axios.get('https://test-front.framework.team/authors');
      const locationsResponse = await axios.get('https://test-front.framework.team/locations');
      setAuthor((prev) => ({ ...prev, list: authorsResponse.data }));
      setLocation((prev) => ({ ...prev, list: locationsResponse.data }));
    })();
  }, []);

  return (
    <div className="page">
      <section className={styles.filters}>
        <div className="container">
          <div className={styles.filtersContent}>
            <CustomInput placeholder="Name" value={inputValue} setValue={setInputValue} />
            <DropDownSelect<IAuthor>
              list={author.list}
              selectedOption={author.selected}
              setSelectedOption={(value) => setAuthor((prev) => ({ ...prev, selected: value }))}
              placeholder="Author"
              field="name"
            />
            <DropDownSelect<ILocation>
              list={location.list}
              selectedOption={location.selected}
              setSelectedOption={(value) => setLocation((prev) => ({ ...prev, selected: value }))}
              placeholder="Location"
              field="location"
            />
            <DropDownFromTo values={fromBefore} setValues={handleChange} />
          </div>
        </div>
      </section>
      {loading ? (
        <h6 className="messageGlobal">Загрузка...</h6>
      ) : painting.length > 0 ? (
        <>
          <PictureList />
          <section className="pagination">
            <div className="container">
              <Pagination />
            </div>
          </section>
        </>
      ) : (
        <h6 className="messageGlobal">Картины не найдены</h6>
      )}
    </div>
  );
};

export default Home;
