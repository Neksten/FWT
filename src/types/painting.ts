export interface PaintingState {
	painting: IPainting[];
	loading: boolean;
	error: string | null;
	currentPage: number;
	limit: number;
	totalCount: number;
}
export interface IPainting {
	authorId: number;
	created: string;
	id: number;
	imageUrl: string;
	locationId: number;
	name: string;
}
export enum PaintingActionTypes {
	AXIOS_PAINTING = 'AXIOS_PAINTING',
	AXIOS_PAINTING_SUCCESS = 'AXIOS_PAINTING_SUCCESS',
	AXIOS_PAINTING_ERROR = 'AXIOS_PAINTING_ERROR',
	SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
}

// запрос
export interface AxiosPaintingAction {
	type: PaintingActionTypes.AXIOS_PAINTING;
}

// если запрос успешен
export interface AxiosPaintingSuccessAction {
	type: PaintingActionTypes.AXIOS_PAINTING_SUCCESS;
	payload: {
		paintings: IPainting[],
		totalCount: number,
	};
}

// если произошла ошибка
export interface AxiosPaintingErrorAction {
	type: PaintingActionTypes.AXIOS_PAINTING_ERROR;
	payload: string;
}

// переключить страницу
export interface SetCurrentPageAction {
	type: PaintingActionTypes.SET_CURRENT_PAGE;
	payload: number;
}

export type PaintingAction =
	AxiosPaintingAction
	| AxiosPaintingSuccessAction
	| AxiosPaintingErrorAction
	| SetCurrentPageAction