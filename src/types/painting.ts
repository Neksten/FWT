export interface PaintingState {
	painting: IPainting[];
	loading: boolean;
	error: string | null;
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
}

// запрос
export interface AxiosPaintingAction {
	type: PaintingActionTypes.AXIOS_PAINTING;
}

// если запрос успешен
export interface AxiosPaintingSuccessAction {
	type: PaintingActionTypes.AXIOS_PAINTING_SUCCESS;
	payload: IPainting[];
}

// если произошла ошибка
export interface AxiosPaintingErrorAction {
	type: PaintingActionTypes.AXIOS_PAINTING_ERROR;
	payload: string;
}

export type PaintingAction =
	AxiosPaintingAction
	| AxiosPaintingSuccessAction
	| AxiosPaintingErrorAction