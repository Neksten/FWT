import React, {useState} from 'react';
import styles from './DropDownFormTo.module.scss';
import OutsideClickHandler from "../OutsideClickHandler";
import {ArrowDown} from "../../assets/ArrowDown";
import {FilterFromBefore} from "../../types/filters";



interface DropDownFromToProps {
	values: FilterFromBefore;
	setValues: (name: string, value: string) => void;
}

const DropDownFromTo: React.FC<DropDownFromToProps> = ({values, setValues}) => {
	const [isOpen, setIsOpen] = useState(false);
	const {from, before} = values
	
	// Открытие/закрытие dropdown
	const toggleDropdown = (): void => {
		setIsOpen(!isOpen);
	};
	
	const handleChange = (name: string, value: string): void => {
		if (/^\d+$/.test(value) || value === '') {
			setValues(name, value)
		}
	};
	
	return (
		<div className={`${styles.dropdown} ${isOpen && styles.open}`}>
			<OutsideClickHandler onOutsideClick={setIsOpen}>
				<div>
					<div onClick={toggleDropdown} className={styles.dropDownTop}>
						<span>Created</span>
						<ArrowDown/>
					</div>
					{isOpen &&
						<div className={styles.body}>
							<input value={from}
							       onChange={(e) => handleChange('from', e.target.value)}
							       type="text"
							       placeholder="from"/>
							<div className={styles.line}/>
							<input value={before}
							       onChange={(e) => handleChange('before', e.target.value)}
							       type="text"
							       placeholder="before"/>
						</div>
					}
				</div>
			</OutsideClickHandler>
		</div>
	);
};

export default DropDownFromTo;