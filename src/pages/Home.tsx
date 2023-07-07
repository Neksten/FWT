import React, {useCallback, useEffect, useState} from 'react';
import DropDownSelect from "../components/DropDownSelect/DropDownSelect";
import {FilterFromBefore} from "../types/filters";
import DropDownFromTo from "../components/DropDownFormTo/DropDownFormTo";
import CustomInput from "../components/CustomInput/CustomInput";
import PictureList from "../components/PictureList/PictureList";
import {useActions} from "../hooks/useActions";
import axios from "axios";
import {IAuthorState} from "../types/author";
import {ILocationState} from "../types/location";
import DropDownSelectLocation from "../components/DropDownSelect/DropDownSelectLocation";

const Home: React.FC = () => {
	const [author, setAuthor] = useState<IAuthorState>({selected: {id: 0, name: ''}, list: []});
	const [location, setLocation] = useState<ILocationState>({selected: {id: 0, location: ''}, list: []});
	const [inputValue, setInputValue] = useState('')
	const [fromBefore, setFromBefore] = useState<FilterFromBefore>({
		from: '',
		before: '',
	})
	const [pagination, setPagination] = useState({_page: 1, _limit: 9})
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
			_page: pagination._page,
			_limit: pagination._limit,
		});
	}, [inputValue, author, location, fromBefore, pagination]);
	
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
			<section className="filters">
				<div className="container">
					<div className="filtersContent">
						<CustomInput placeholder='Name' value={inputValue} setValue={setInputValue}/>
						<DropDownSelect list={author.list} selectedOption={author.selected} setSelectedOption={setAuthor}/>
						<DropDownSelectLocation list={location.list} selectedOption={location.selected} setSelectedOption={setLocation}/>
						<DropDownFromTo values={fromBefore} setValues={handleChange}/>
					</div>
					<button onClick={() => setPagination(prev => ({...prev, _page: prev._page - 1}))}>Prev</button>
					<button onClick={() => setPagination(prev => ({...prev, _page: prev._page + 1}))}>Next</button>
				</div>
			</section>
			<PictureList/>
		</div>
	);
};

export default Home;