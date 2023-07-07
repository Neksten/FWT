import React from 'react';
import styles from './CustomInput.module.scss'
import {useDispatch} from "react-redux";
import {setCurrentPageReducerAction} from "../../store/reducers/paintingsReducer";

interface CustomInputProps {
	value: string;
	placeholder: string;
	setValue: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({value, setValue, placeholder}) => {
	const dispatch = useDispatch();
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setCurrentPageReducerAction(1))
		setValue(e.target.value)
	}
	
	return (
		<input type="text"
		       placeholder={placeholder}
		       value={value}
		       onChange={handleChange}
		       className={styles.input}/>
	);
};

export default CustomInput;
