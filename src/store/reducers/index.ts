import { combineReducers } from 'redux';

import { paintingsReducer } from './paintingsReducer';

export const rootReducer = combineReducers({
  painting: paintingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
