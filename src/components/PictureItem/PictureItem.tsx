import React from 'react';
import styles from './PictureItem.module.scss'
import {IPainting} from "../../types/painting";

const PictureItem: React.FC<IPainting> = (props) => {
	return (
		<div className={styles.picture}>
			<div className={styles.pictureImage}>
				<img src={`https://test-front.framework.team${props.imageUrl}`} alt={props.name}/>
			</div>
			<h5 className={styles.pictureTitle}>{props.name}</h5>
		</div>
	);
};

export default PictureItem;