import React from 'react';
import styles from './PictureItem.module.scss'
import {IPainting} from "../../types/painting";

const PictureItem: React.FC<IPainting> = (props) => {
	// console.log(props)
	return (
		<div className={styles.picture}>
			<div className={styles.pictureImage}>
				<img src={`https://test-front.framework.team${props.imageUrl}`} alt={props.name}/>
			</div>
			<div className={styles.pictureInfo}>
				<h5 className={styles.pictureTitle}>{props.name}</h5>
				{/*<div className={styles.pictureInfoItem}>*/}
				{/*	<span>Author:</span>*/}
				{/*	/!*<span>{props.}</span>*!/*/}
				{/*</div>*/}
			</div>
		</div>
	);
};

export default PictureItem;