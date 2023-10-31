import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuestionnaireData } from '../selectors/cigarStore.selector';
import { Observable, map, take } from 'rxjs';
import { isAdult } from 'src/app/utils/ageValidator';
import { Router } from '@angular/router';

@Injectable()
export class AgeGuard {
  constructor(private store: Store, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.store.select(selectQuestionnaireData).pipe(
      take(1),
      map(({ dateOfBirth }) => {
        if (!dateOfBirth) {
          return false;
        }

        const date = isAdult(dateOfBirth);
        if (date === undefined) {
          this.router.navigate(['/questionnaire']);
          return false;
        }

        if (date) {
          return true;
        }

        this.router.navigate(['/questionnaire/restricted']);
        return false;
      })
    );
  }
}
