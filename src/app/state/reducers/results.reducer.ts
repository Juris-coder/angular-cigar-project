import { createReducer, on } from '@ngrx/store';
import {
  clearResults,
  loadResultsAction,
  loadResultsError,
  loadResultsSuccess,
} from '../actions/cigarStore.actions';
import { ICigarsDatabaseState } from 'src/app/app.types';

export const resultsInitialState: ICigarsDatabaseState = {
  cigars: [],
  page: 1,
  count: 0,
  loading: false,
  error: null,
};

export const resultsLoadedReducer = createReducer(
  resultsInitialState,
  on(loadResultsAction, (state) => ({ ...state, loading: true, error: null })),
  on(loadResultsSuccess, (state: ICigarsDatabaseState, { results }) => ({
    ...state,
    cigars: [...results.cigars],
    page: results.page,
    count: results.count,
    loading: false,
  })),
  on(loadResultsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(clearResults, () => resultsInitialState)
);
