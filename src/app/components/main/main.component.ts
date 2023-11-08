import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearState } from 'src/app/state/actions/cigarStore.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  constructor(private store: Store) {}

  clearState(): void {
    this.store.dispatch(clearState());
  }
}
