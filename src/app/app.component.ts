import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUrl } from './state/selectors/cigarStore.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  currentRoute: string | undefined;

  ngOnInit(): void {
    this.store
      .select(selectUrl)
      .subscribe((route) => (this.currentRoute = route));
  }

  isRedBackground(): boolean {
    if (!this.currentRoute) {
      return false;
    }

    return this.currentRoute.startsWith('/questionnaire');
  }
}
