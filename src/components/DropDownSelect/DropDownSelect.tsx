import React, {useState} from 'react';
import {ArrowDown} from '../../assets/ArrowDown';
import OutsideClickHandler from '../OutsideClickHandler';
import styles from './DropDownSelect.module.scss';
import {IAuthor, IAuthorState} from "../../types/author";
import {ILocation, ILocationState} from "../../types/location";

interface DropDownSelectProps {
	list: IAuthor[] ,
	selectedOption: IAuthor;
	setSelectedOption: (value: IAuthorState) => void;
}

const DropDownSelect: React.FC<DropDownSelectProps> = ({list, selectedOption, setSelectedOption}) => {
	const [isOpen, setIsOpen] = useState(false);
	
	// Открытие/закрытие dropdown
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	
	// При клике на элемент dropdown
	const handleOptionClick = (option: IAuthor) => {
		// setSelectedOption((prev: IAuthorState) => ({
		// 	...prev,
		// 	selected: option
		// }));
		setSelectedOption({ selected: option, list });
		
		setIsOpen(false);
	};
	
	return (
		<div className={`${styles.dropdown} ${isOpen && styles.open}`}>
			<OutsideClickHandler onOutsideClick={setIsOpen}>
				<div>
					<div onClick={toggleDropdown} className={styles.dropDownTop}>
						<span>{selectedOption.name ? selectedOption.name : 'Author'}</span>
						<ArrowDown/>
					</div>
					<div className={styles.bodyWrap}>
						{isOpen &&
							<div className={styles.body}>
								<ul>
									{list.map((option => (
										<li key={option.id} onClick={() => handleOptionClick(option)}>
											<span>{option.name}</span>
										</li>
									)))}
								</ul>
							</div>
						}
					</div>
				</div>
			</OutsideClickHandler>
		</div>
	);
};

export default DropDownSelect;