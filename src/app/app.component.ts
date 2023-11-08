import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUrl } from './state/selectors/cigarStore.selector';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngDestroyed$ = new Subject<boolean>();

  currentRoute: string | undefined;
  public isQuestionnaireRoute: boolean = false;

  ngOnInit(): void {
    this.store
      .select(selectUrl)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((route) => {
        this.currentRoute = route;
        this.isQuestionnaireRoute = route?.startsWith('/questionnaire');
      });
  }

  ngOnDestroy() {
    this.ngDestroyed$.next(false);
  }
}
