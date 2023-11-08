import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { Subject, takeUntil } from 'rxjs';
import { countries } from './country.model';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss', '../../questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngDestroyed$ = new Subject<boolean>();

  selectedCountry: string | undefined;
  countries = countries;

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(({ country }) => {
        if (country === 'United States of America') {
          this.selectedCountry = 'USA';
          return;
        }
        this.selectedCountry = country;
      });
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next(false);
  }

  emitCountrySelection(name: string): void {
    if (name === 'USA') {
      name = 'United States of America';
    }
    this.store.dispatch(createUpdatePropertyAction('country')(name));
  }
}
