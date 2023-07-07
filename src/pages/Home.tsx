import React, {useCallback, useEffect, useState} from 'react';
import {FilterFromBefore} from "../types/filters";
import DropDownFromTo from "../components/DropDownFormTo/DropDownFormTo";
import CustomInput from "../components/CustomInput/CustomInput";
import PictureList from "../components/PictureList/PictureList";
import {useActions} from "../hooks/useActions";
import axios from "axios";
import {IAuthor, IAuthorState} from "../types/author";
import {ILocation, ILocationState} from "../types/location";
import styles from './Home.module.scss'
import DropDownSelect from "../components/DropDownSelect/DropDownSelect";
import Pagination from "../components/Pagination/Pagination";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Home: React.FC = () => {
	const [author, setAuthor] = useState<IAuthorState>({selected: {id: 0, name: ''}, list: []});
	const [location, setLocation] = useState<ILocationState>({selected: {id: 0, location: ''}, list: []});
	const [inputValue, setInputValue] = useState('')
	const [fromBefore, setFromBefore] = useState<FilterFromBefore>({
		from: '',
		before: '',
	})
	const {loading, currentPage, limit} = useTypedSelector(state => state.painting);
	const {axiosGetPainting} = useActions();
	
	const handleChange = useCallback((name: string, value: string): void => {
		setFromBefore((prev: FilterFromBefore) => ({
			...prev,
			[name]: value,
		}));
	}, []);
	
	useEffect(() => {
		axiosGetPainting({
			q: inputValue,
			authorId: author.selected.id,
			locationId: location.selected.id,
			_gte: fromBefore.from,
			_lte: fromBefore.before,
			_page: currentPage,
			_limit: limit,
		});
	}, [inputValue, author, location, fromBefore, currentPage]);
	
	useEffect(() => {
		async function fetchData() {
			const authorsResponse = await axios.get('https://test-front.framework.team/authors')
			const locationsResponse = await axios.get('https://test-front.framework.team/locations')
			setAuthor(prev => ({ ...prev, list: authorsResponse.data }));
			setLocation(prev => ({ ...prev, list: locationsResponse.data }));
		}
		fetchData()
	}, []);
	
	return (
		<div className="page">
			<section className={styles.filters}>
				<div className="container">
					<div className={styles.filtersContent}>
						<CustomInput placeholder='Name' value={inputValue} setValue={setInputValue}/>
						<DropDownSelect<IAuthor>
							list={author.list}
							selectedOption={author.selected}
							setSelectedOption={(value) => setAuthor(prev => ({ ...prev, selected: value }))}
							placeholder="Author"
							field="name"
						/>
						<DropDownSelect<ILocation>
							list={location.list}
							selectedOption={location.selected}
							setSelectedOption={(value) => setLocation(prev => ({ ...prev, selected: value }))}
							placeholder="Location"
							field="location"
						/>
						<DropDownFromTo values={fromBefore} setValues={handleChange}/>
					</div>
				</div>
			</section>
			{/*<Pagination/>*/}
			{loading
				?
				<h6 className="loading">Загрузка...</h6>
				:
				<>
					<PictureList/>
					<section className="pagination">
						<div className="container">
							<Pagination/>
						</div>
					</section>
				</>
			}
		</div>
	);
};

export default Home;