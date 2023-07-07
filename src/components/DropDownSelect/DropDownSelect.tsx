import React, {useContext, useState} from 'react';
import { ArrowDown } from '../../assets/ArrowDown';
import OutsideClickHandler from '../OutsideClickHandler';
import styles from './DropDownSelect.module.scss';
import ThemeContext from "../../context/ThemeContext";
import {Cross} from "../../assets/Cross";
import {useDispatch} from "react-redux";
import {setCurrentPageReducerAction} from "../../store/reducers/paintingsReducer";

interface DropDownSelectCombinedProps<T> {
	list: T[];
	selectedOption: T;
	setSelectedOption: (value: T) => void;
	placeholder: string;
	field: keyof T;
}

const DropDownSelect = <T extends Record<string, any>>(
	{
		list,
		selectedOption,
		setSelectedOption,
		placeholder,
		field,
	}: DropDownSelectCombinedProps<T>) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const themeContext = useContext(ThemeContext)
	
	if (!themeContext) {
		return null;
	}
	
	const { isDark} = themeContext;
	
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	
	const handleOptionClick = (option: T) => {
		dispatch(setCurrentPageReducerAction(1))
		setSelectedOption(option);
		setIsOpen(false);
	};
	const handleDeleteClick = (field: string | number | symbol) => {
		dispatch(setCurrentPageReducerAction(1))
		const initialSelected: any = {id: 0}
		initialSelected[field as string] = ''
		setSelectedOption(initialSelected);
	};
	
	return (
		<div className={`${styles.dropdown} ${isOpen && styles.open} ${isDark && styles.dark}`}>
			<OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
				<div>
					<div onClick={toggleDropdown} className={styles.dropDownTop}>
						<span>{selectedOption[field] ? selectedOption[field] : placeholder}</span>
						<div className={styles.dropDownTopManagement}>
							{selectedOption[field] &&
								<span onClick={() => handleDeleteClick(field)}>
									<Cross color={isDark ? '#fff' : '#000'}/>
								</span>
							}
							<ArrowDown color={isDark ? '#fff' : '#000'}/>
						</div>
					</div>
					<div className={styles.bodyWrap}>
						{isOpen && (
							<div className={styles.body}>
								<ul>
									{list.map((option) => (
										<li key={option.id} onClick={() => handleOptionClick(option)}>
											<span>{option[field]}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</OutsideClickHandler>
		</div>
	);
};

export default DropDownSelect;
