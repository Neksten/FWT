import {
  AxiosPaintingAction,
  AxiosPaintingErrorAction,
  AxiosPaintingSuccessAction,
  IPainting,
  PaintingAction,
  PaintingActionTypes,
  PaintingState,
  SetCurrentPageAction,
  SetLimitPageAction,
} from '../../types/painting';

const initialState: PaintingState = {
  painting: [],
  loading: false,
  error: null,
  currentPage: 1,
  limit: 12,
  totalCount: 0,
};

export const paintingsReducer = (state = initialState, action: PaintingAction): PaintingState => {
  switch (action.type) {
    case PaintingActionTypes.AXIOS_PAINTING:
      return { ...state, loading: true }; // запрос
    case PaintingActionTypes.AXIOS_PAINTING_SUCCESS:
      return {
        ...state,
        loading: false,
        painting: action.payload.paintings,
        totalCount: action.payload.totalCount,
      };
    case PaintingActionTypes.AXIOS_PAINTING_ERROR:
      return { ...state, loading: false, error: action.payload };
    case PaintingActionTypes.SET_CURRENT_PAGE:
      return { ...state, loading: false, currentPage: action.payload };
    case PaintingActionTypes.SET_LIMIT_PAGE:
      return { ...state, loading: false, limit: action.payload };
    default:
      return state;
  }
};

export const axiosPaintingReducerAction = (): AxiosPaintingAction => ({ type: PaintingActionTypes.AXIOS_PAINTING });
export const axiosPaintingSuccessReducerAction = (payload: {
  paintings: IPainting[];
  totalCount: number;
}): AxiosPaintingSuccessAction => ({
  type: PaintingActionTypes.AXIOS_PAINTING_SUCCESS,
  payload,
});
export const axiosPaintingErrorReducerAction = (payload: string): AxiosPaintingErrorAction => ({
  type: PaintingActionTypes.AXIOS_PAINTING_ERROR,
  payload,
});
export const setCurrentPageReducerAction = (payload: number): SetCurrentPageAction => ({
  type: PaintingActionTypes.SET_CURRENT_PAGE,
  payload,
});
export const setLimitPageReducerAction = (payload: number): SetLimitPageAction => ({
  type: PaintingActionTypes.SET_LIMIT_PAGE,
  payload,
});
