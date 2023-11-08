import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { loadResultsAction } from 'src/app/state/actions/cigarStore.actions';
import {
  selectCigars,
  selectQuestionnaireData,
  selectResultsFeature,
} from 'src/app/state/selectors/cigarStore.selector';
import { ICigarSearchResult, IQuestionnaireState } from 'src/app/app.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  ngDestroyed$ = new Subject<boolean>();

  questionnaireData: IQuestionnaireState | undefined;
  currentPage: number | undefined;
  cigars: ICigarSearchResult[] | undefined;
  pagesAmount: number | undefined;
  loading: boolean | undefined;
  error: any;

  get randomFlavours(): { name: string; applied: boolean }[] {
    const flavours = [
      'Fruity',
      'Spicy',
      'Sweet',
      'Acid',
      'Coffee',
      'Creamy',
      'Chocolate',
      'Honey',
      'Earthy',
      'Herbal',
    ];
    return flavours.map((name) => ({
      name,
      applied: Math.random() < 0.5,
    }));
  }

  get randomPairings(): { name: string; applied: boolean }[] {
    const pairings = ['Scotch', 'Whisky', 'Cognac', 'Rum'];
    return pairings.map((name) => ({
      name,
      applied: Math.random() < 0.5,
    }));
  }

  @ViewChild('cigars_container')
  cigars_container: ElementRef | undefined;

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((data) => (this.questionnaireData = data));

    this.store
      .select(selectCigars)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((cigars) => {
        this.cigars = cigars;
        this.cd.markForCheck();
        if (!cigars || !cigars.length) {
          this.store.dispatch(
            loadResultsAction({ page: this.currentPage || 1 })
          );
        }
      });

    this.store
      .select(selectResultsFeature)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(({ page, count, loading, error }) => {
        this.pagesAmount = Math.floor(count / 20);
        this.currentPage = page;
        this.error = error;
        this.loading = loading;
      });
  }

  ngOnDestroy() {
    this.ngDestroyed$.next(false);
  }

  loadPage(page: number): void {
    if (
      !page ||
      !this.pagesAmount ||
      page === this.currentPage ||
      page > this.pagesAmount
    ) {
      return;
    }

    if (page < 2) {
      page = 1;
    }

    this.store.dispatch(loadResultsAction({ page }));
  }

  scrollTo() {
    this.cigars_container?.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }

  getPagesToShow(): number[] {
    if (!this.currentPage || !this.pagesAmount) {
      return [];
    }
    const range = 2;

    const start = Math.max(1, this.currentPage - range);
    const end = Math.min(this.pagesAmount, this.currentPage + range);

    const pageNumbers: number[] = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );

    if (!pageNumbers.includes(1)) {
      pageNumbers.unshift(1);
    }
    if (!pageNumbers.includes(this.pagesAmount)) {
      pageNumbers.push(this.pagesAmount);
    }

    return pageNumbers;
  }
}
