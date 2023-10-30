import { Component, OnInit } from '@angular/core';
import { ICardItem } from '../cards/cards.types';
import { Store } from '@ngrx/store';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { CigarCountry } from 'src/app/app.types';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss', '../../questionnaire.component.scss'],
})
export class CountryComponent implements OnInit {
  constructor(private store: Store) {}

  selectedCountry: string | undefined;

  countries: ICardItem[] = [
    {
      name: 'Cuba',
      url: 'assets/images/cuba.svg',
    },
    {
      name: 'Dominican Republic',
      url: 'assets/images/dominican.svg',
    },
    {
      name: 'Nicaragua',
      url: 'assets/images/nicaragua.svg',
    },
    {
      name: 'USA',
      url: 'assets/images/usa.svg',
    },
    {
      name: 'Honduras',
      url: 'assets/images/honduras.svg',
    },
    {
      name: 'Costa Rica',
      url: 'assets/images/costa-rica.svg',
    },
    {
      name: 'Mexico',
      url: 'assets/images/mexico.svg',
    },
    {
      name: 'Brasil',
      url: 'assets/images/brasil.svg',
    },
    {
      name: 'Ecuador',
      url: 'assets/images/ecuador.svg',
    },
  ];

  ngOnInit(): void {
    this.store.select(selectQuestionnaireData).subscribe(({ country }) => {
      if (country === 'United States of America') {
        this.selectedCountry = 'USA';
        return;
      }
      this.selectedCountry = country;
    });
  }

  emitCountrySelection(name: string): void {
    if (name === 'USA') {
      name = 'United States of America';
    }
    this.store.dispatch(createUpdatePropertyAction('country')(name));
  }
}
