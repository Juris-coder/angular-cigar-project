import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUrl } from './state/selectors/cigarStore.selector';
import { takeUntil } from 'rxjs';
import { DestroyService } from './services/destroy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private readonly destroy$: DestroyService
  ) {}

  currentRoute: string | undefined;
  public isQuestionnaireRoute: boolean = false;

  ngOnInit(): void {
    this.store
      .select(selectUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe((route) => {
        this.currentRoute = route;
        this.isQuestionnaireRoute = route?.startsWith('/questionnaire');
      });
  }
}
