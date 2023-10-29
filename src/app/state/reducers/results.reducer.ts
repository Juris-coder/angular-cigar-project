import { createReducer, on } from '@ngrx/store';
import { resultsLoaded } from '../actions/cigarStore.actions';
import { ICigarsDatabase } from 'src/app/utils/types';

export const resultsInitialState: ICigarsDatabase = {
  cigars: [],
  page: 1,
  count: 0,
};

export const resultsLoadedReducer = createReducer(
  resultsInitialState,
  on(resultsLoaded, (state: ICigarsDatabase, { results }) => ({
    ...state,
    cigars: [...results.cigars],
    page: results.page,
    count: results.count,
  }))
);
