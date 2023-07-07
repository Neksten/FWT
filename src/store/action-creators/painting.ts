import {Dispatch} from "redux";
import {IPainting} from "../../types/painting";
import {
	axiosPaintingErrorReducerAction,
	axiosPaintingReducerAction,
	axiosPaintingSuccessReducerAction
} from "../reducers/paintingsReducer";
import axios from "axios";

interface axiosGetPaintingParams {
	q: string;
	authorId: number;
	locationId: number;
	_gte: string;
	_lte: string;
	_page: number;
	_limit:  number;
}

export const axiosGetPainting = (initialParams: axiosGetPaintingParams) => {
	return async (dispatch: Dispatch) => {
		try {
			// получаем данные(загрузка)
			dispatch(axiosPaintingReducerAction());
			const params = <axiosGetPaintingParams>{
				q: initialParams.q,
			}
			
			if (initialParams._gte !== '') {
				params._gte = initialParams._gte;
			}
			if (initialParams._lte  !== '') {
				params._lte = initialParams._lte;
			}
			if (initialParams.authorId !== 0) {
				params.authorId = initialParams.authorId;
			}
			if (initialParams.locationId  !== 0) {
				params.locationId = initialParams.locationId;
			}
			
			const response = await axios.get('https://test-front.framework.team/paintings', {
				params: {
					...params,
					_page: initialParams._page,
					_limit:  initialParams._limit,
				}
			});
			const responseAllPaintings = await axios.get('https://test-front.framework.team/paintings', {params});
			const paintings: IPainting[] = response.data;

			dispatch(axiosPaintingSuccessReducerAction({paintings, totalCount: responseAllPaintings.data.length}));
		} catch (e) {
			dispatch(axiosPaintingErrorReducerAction('Ошибка при загрузке картин'));
		}
	};
};