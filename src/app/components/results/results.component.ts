import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { loadResultsAction } from 'src/app/state/actions/cigarStore.actions';
import {
  selectCigars,
  selectQuestionnaireData,
} from 'src/app/state/selectors/cigarStore.selector';
import { take, tap } from 'rxjs';
import {
  ALL_RESULTS,
  Flavours,
  getRandom,
  NOT_SPECIFIED,
  Pairings,
} from './constants';
import { ICigarSearchResult, LoadingStatus } from 'src/app/services/types';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ResultsComponent implements OnInit {
  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  questionnaireData$ = this.store.select(selectQuestionnaireData);
  currentPage: number = 1;
  cigars: ICigarSearchResult[] | undefined;
  pagesAmount: number | undefined;
  loading: boolean = true;
  error: any;
  readonly randomFlavours = getRandom(Flavours);
  readonly randomPairings = getRandom(Pairings);
  readonly ALL_RESULTS = ALL_RESULTS;
  readonly NOT_SPECIFIED = NOT_SPECIFIED;

  @ViewChild('cigars_container')
  cigars_container: ElementRef | undefined;

  ngOnInit(): void {
    this.store
      .select(selectCigars)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(({ cigars, loadStatus, count, error, page }) => {
          this.cigars = cigars;
          this.pagesAmount = Math.floor(count / 20);
          this.currentPage = page;
          this.error = error;
          this.loading = loadStatus === LoadingStatus.LOADING;
          this.cd.markForCheck();
          if (!cigars?.length && loadStatus === LoadingStatus.NOT_LOADED) {
            this.store.dispatch(
              loadResultsAction({ page: this.currentPage || 1 }),
            );
          }
        }),
      )
      .subscribe();
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

    this.store.dispatch(loadResultsAction({ page: page < 2 ? 1 : page }));
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
      (_, i) => start + i,
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
