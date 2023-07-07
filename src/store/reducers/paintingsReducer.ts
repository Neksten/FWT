import {
	AxiosPaintingAction, AxiosPaintingErrorAction,
	AxiosPaintingSuccessAction, IPainting,
	PaintingAction,
	PaintingActionTypes,
	PaintingState
} from "../../types/painting";

const initialState: PaintingState = {
	painting: [],
	loading: false,
	error: null,
};

export const paintingsReducer = (state = initialState, action: PaintingAction): PaintingState => {
	switch (action.type) {
		case PaintingActionTypes.AXIOS_PAINTING:
			return {...state, loading: true}; // запрос
		case PaintingActionTypes.AXIOS_PAINTING_SUCCESS:
			return {...state, loading: false, painting: action.payload};
		case PaintingActionTypes.AXIOS_PAINTING_ERROR:
			return {...state, loading: false, error: action.payload};
		default:
			return state
	}
}

export const axiosPaintingReducerAction = (): AxiosPaintingAction => ({type: PaintingActionTypes.AXIOS_PAINTING});
export const axiosPaintingSuccessReducerAction = (payload: IPainting[]): AxiosPaintingSuccessAction => ({
	type: PaintingActionTypes.AXIOS_PAINTING_SUCCESS, payload
});
export const axiosPaintingErrorReducerAction = (payload: string): AxiosPaintingErrorAction => ({
	type: PaintingActionTypes.AXIOS_PAINTING_ERROR, payload
});