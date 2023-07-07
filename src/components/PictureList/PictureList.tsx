import React from 'react';
import PictureItem from "../PictureItem/PictureItem";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from './PictureList.module.scss'

const PictureList = () => {
	const {painting} = useTypedSelector(state => state.painting);
	
	return (
		<section className={styles.pictures}>
			<div className="container">
				<div className={styles.picturesContent}>
					{painting.map(i => (
						<PictureItem key={i.id} {...i}/>
					))}
				</div>
			</div>
		</section>
	);
};

export default PictureList;