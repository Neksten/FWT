import React from 'react';
import PictureItem from "../PictureItem/PictureItem";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const PictureList = () => {
	const {painting} = useTypedSelector(state => state.painting);
	// console.log(painting)
	
	return (
		<section className="pictures">
			<div className="container">
				<div className="picturesContent">
					{painting.map(i => (
						<PictureItem key={i.id} {...i}/>
					))}
				</div>
			</div>
		</section>
	);
};

export default PictureList;