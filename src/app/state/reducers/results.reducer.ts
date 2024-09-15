import { createReducer, on } from '@ngrx/store';
import {
  clearResults,
  loadResultsAction,
  loadResultsError,
  loadResultsSuccess,
} from '../actions/cigarStore.actions';
import { ICigarsDatabaseState, LoadingStatus } from 'src/app/services/types';

export const resultsInitialState: ICigarsDatabaseState = {
  cigars: [],
  page: 1,
  count: 0,
  loadStatus: LoadingStatus.NOT_LOADED,
  error: null,
};

export const resultsLoadedReducer = createReducer(
  resultsInitialState,
  on(loadResultsAction, (state) => ({
    ...state,
    loadStatus: LoadingStatus.LOADING,
    error: null,
  })),
  on(loadResultsSuccess, (state: ICigarsDatabaseState, { results }) => ({
    ...state,
    cigars: [...results.cigars],
    page: results.page,
    count: results.count,
    loadStatus: LoadingStatus.LOADED,
    error: null,
  })),
  on(loadResultsError, (state, { error }) => ({
    ...state,
    loadStatus: LoadingStatus.LOADED,
    error,
  })),
  on(clearResults, () => resultsInitialState),
);
