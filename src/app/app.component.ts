import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUrl } from './state/selectors/cigarStore.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {}
  title = 'cigar-project';

  route$: Observable<string> = this.store.select(selectUrl);
}
