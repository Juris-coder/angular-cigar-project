import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { ApiAssistantService } from 'src/app/utils/apiAssistantService';
import {
  loadResultsAction,
  loadResultsError,
  resultsLoaded,
} from '../actions/cigarStore.actions';
import { Store } from '@ngrx/store';
import { selectQuestionnaireData } from '../selectors/cigarStore.selector';

@Injectable()
export class CigarSearchEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private apiService: ApiAssistantService
  ) {}

  loadCigars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadResultsAction),
      withLatestFrom(this.store.select(selectQuestionnaireData)),
      switchMap(([{ page }, { color, country, strength }]) =>
        this.apiService
          .getCigars(page, {
            country,
            color,
            strength,
          })
          .pipe(
            map(({ cigars }) => resultsLoaded({ results: cigars })),
            catchError(() => of(loadResultsError()))
          )
      )
    )
  );
}
