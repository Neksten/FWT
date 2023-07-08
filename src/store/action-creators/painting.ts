import { Dispatch } from 'redux';

import axios from 'axios';

import { IPainting } from '../../types/painting';
import {
  axiosPaintingErrorReducerAction,
  axiosPaintingReducerAction,
  axiosPaintingSuccessReducerAction,
} from '../reducers/paintingsReducer';

interface axiosGetPaintingParams {
  q: string;
  authorId: number;
  locationId: number;
  created_gte: string;
  created_lte: string;
  _page: number;
  _limit: number;
}

export const axiosGetPainting = (initialParams: axiosGetPaintingParams) => {
  return async (dispatch: Dispatch) => {
    try {
      // получаем данные(загрузка)
      dispatch(axiosPaintingReducerAction());
      const params = {
        q: initialParams.q,
      } as axiosGetPaintingParams;

      if (initialParams.created_gte !== '') {
        params.created_gte = initialParams.created_gte;
      }
      if (initialParams.created_lte !== '') {
        params.created_lte = initialParams.created_lte;
      }
      if (initialParams.authorId !== 0) {
        params.authorId = initialParams.authorId;
      }
      if (initialParams.locationId !== 0) {
        params.locationId = initialParams.locationId;
      }

      const response = await axios.get('https://test-front.framework.team/paintings', {
        params: {
          ...params,
          _page: initialParams._page,
          _limit: initialParams._limit,
        },
      });
      const responseAllPaintings = await axios.get('https://test-front.framework.team/paintings', { params });
      const paintings: IPainting[] = response.data;

      dispatch(axiosPaintingSuccessReducerAction({ paintings, totalCount: responseAllPaintings.data.length }));
    } catch (e) {
      dispatch(axiosPaintingErrorReducerAction('Ошибка при загрузке картин'));
    }
  };
};
