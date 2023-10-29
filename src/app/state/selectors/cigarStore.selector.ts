import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IQuestionnaireState } from '../reducers/index';
import { getRouterSelectors } from '@ngrx/router-store';
import { ICigarSearchResult, ICigarsDatabase } from 'src/app/utils/types';

export const selectQuestionnaireFeature =
  createFeatureSelector<IQuestionnaireState>('questionnaire');

export const selectResultsFeature =
  createFeatureSelector<ICigarsDatabase>('results');

export const selectCigars = createSelector(
  selectResultsFeature,
  ({ cigars }) => cigars
);

export const selectPage = createSelector(
  selectResultsFeature,
  ({ page }) => page
);

export const selectCount = createSelector(
  selectResultsFeature,
  ({ count }) => count
);

export const selectQuestionnaireData = createSelector(
  selectQuestionnaireFeature,
  (data) => data
);

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectRouteDataParam, // factory function to select a route data param
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getRouterSelectors();
