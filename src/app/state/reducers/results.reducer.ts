import { createReducer, on } from '@ngrx/store';
import { resultsLoaded } from '../actions/cigarStore.actions';
import { ICigarSearchResult } from 'src/app/utils/types';

export const resultsInitialState: Partial<ICigarSearchResult>[] = [];

export const resultsLoadedReducer = createReducer(
  resultsInitialState,
  on(resultsLoaded, (state: Partial<ICigarSearchResult>[], { results }) => [
    ...state,
    ...results,
  ])
);
