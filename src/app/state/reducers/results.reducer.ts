import { createReducer, on } from '@ngrx/store';
import { resultsLoaded } from '../actions/cigarStore.actions';
import { ICigarsDatabaseState } from 'src/app/app.types';

export const resultsInitialState: ICigarsDatabaseState = {
  cigars: [],
  page: 1,
  count: 0,
};

export const resultsLoadedReducer = createReducer(
  resultsInitialState,
  on(resultsLoaded, (state: ICigarsDatabaseState, { results }) => ({
    ...state,
    cigars: [...results.cigars],
    page: results.page,
    count: results.count,
  }))
);
