import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUrl } from './state/selectors/cigarStore.selector';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngDestroyed$ = new Subject<boolean>();

  currentRoute: string | undefined;

  ngOnInit(): void {
    this.store
      .select(selectUrl)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((route) => (this.currentRoute = route));
  }

  ngOnDestroy() {
    this.ngDestroyed$.next(false);
  }

  isRedBackground(): boolean {
    if (!this.currentRoute) {
      return false;
    }

    return this.currentRoute.startsWith('/questionnaire');
  }
}
