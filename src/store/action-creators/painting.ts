import { Dispatch } from 'redux';

import axios from 'axios';

import { IPainting } from '../../types/painting';
import {
  axiosPaintingErrorReducerAction,
  axiosPaintingReducerAction,
  axiosPaintingSuccessReducerAction,
} from '../reducers/paintingsReducer';

interface AxiosGetPaintingParams {
  q: string;
  authorId: number;
  locationId: number;
  created_gte: string;
  created_lte: string;
  _page: number;
  _limit: number;
}

export const axiosGetPainting = (initialParams: AxiosGetPaintingParams) => {
  return async (dispatch: Dispatch) => {
    try {
      // получаем данные(загрузка)
      dispatch(axiosPaintingReducerAction());
      const params: AxiosGetPaintingParams = {
        q: initialParams.q,
        ...(initialParams.created_gte !== '' && { created_gte: initialParams.created_gte }),
        ...(initialParams.created_lte !== '' && { created_lte: initialParams.created_lte }),
        ...(initialParams.authorId !== 0 && { authorId: initialParams.authorId }),
        ...(initialParams.locationId !== 0 && { locationId: initialParams.locationId }),
      } as AxiosGetPaintingParams;

      const response = await axios.get('https://test-front.framework.team/paintings', {
        params: {
          ...params,
          _page: initialParams._page,
          _limit: initialParams._limit,
        },
      });
      const paintings: IPainting[] = response.data;
      const totalCount: number = Number(response.headers['x-total-count']);

      dispatch(axiosPaintingSuccessReducerAction({ paintings, totalCount: totalCount }));
    } catch (e) {
      dispatch(axiosPaintingErrorReducerAction('Ошибка при загрузке картин'));
    }
  };
};
