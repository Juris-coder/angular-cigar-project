import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUrl } from './state/selectors/cigarStore.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private readonly destroyRef: DestroyRef,
  ) {}

  currentRoute: string | undefined;
  public isQuestionnaireRoute: boolean = false;

  ngOnInit(): void {
    this.store
      .select(selectUrl)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((route) => {
        this.currentRoute = route;
        this.isQuestionnaireRoute = route?.startsWith('/questionnaire');
      });
  }
}
