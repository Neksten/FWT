import React from 'react';
import styles from './CustomInput.module.scss'

interface CustomInputProps {
	value: string;
	placeholder: string;
	setValue: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({value, setValue, placeholder}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
