import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuestionnaireData } from '../state/selectors/cigarStore.selector';
import { Observable, map, take } from 'rxjs';
import { isAdult } from 'src/app/utils/validators';
import { Router } from '@angular/router';

@Injectable()
export class AgeGuard {
  constructor(private store: Store, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.store.select(selectQuestionnaireData).pipe(
      take(1),
      map(({ dateOfBirth }) => {
        if (!dateOfBirth) {
          this.router.navigate(['/questionnaire']);
          return false;
        }

        if (isAdult(dateOfBirth)) {
          return true;
        }

        this.router.navigate(['/questionnaire/restricted']);
        return false;
      })
    );
  }
}
