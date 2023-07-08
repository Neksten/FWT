import React, { useContext, useState } from 'react';

import { useDispatch } from 'react-redux';

import OutsideClickHandler from '../OutsideClickHandler';
import { ArrowDown } from '../../assets/ArrowDown';
import { FilterFromBefore } from '../../types/filters';
import ThemeContext from '../../context/ThemeContext';
import { setCurrentPageReducerAction } from '../../store/reducers/paintingsReducer';

import styles from './DropDownFormTo.module.scss';

interface DropDownFromToProps {
  values: FilterFromBefore;
  setValues: (name: string, value: string) => void;
}

const DropDownFromTo: React.FC<DropDownFromToProps> = ({ values, setValues }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { isDark } = themeContext;

  const { from, before } = values;

  // Открытие/закрытие dropdown
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleChange = (name: string, value: string): void => {
    if (/^\d+$/.test(value) || value === '') {
      dispatch(setCurrentPageReducerAction(1));
      setValues(name, value);
    }
  };

  return (
    <div className={`${styles.dropdown} ${isOpen && styles.open} ${isDark && styles.dark}`}>
      <OutsideClickHandler onOutsideClick={setIsOpen}>
        <div>
          <div onClick={toggleDropdown} className={styles.dropDownTop}>
            <span>Created</span>
            <ArrowDown color={isDark ? '#fff' : '#000'} />
          </div>
          {isOpen && (
            <div className={styles.body}>
              <input
                value={from}
                onChange={(e) => handleChange('from', e.target.value)}
                type="text"
                placeholder="from"
              />
              <div className={styles.line} />
              <input
                value={before}
                onChange={(e) => handleChange('before', e.target.value)}
                type="text"
                placeholder="before"
              />
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default DropDownFromTo;
