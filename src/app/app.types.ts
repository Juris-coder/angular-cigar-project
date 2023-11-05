import { RouterReducerState } from '@ngrx/router-store';
import { Observable } from 'rxjs';

export interface IRequestParameters {
  name?: string;
  brandId?: number;
  country?: string;
  filler?: string;
  wrapper?: string;
  color?: CigarColor;
  strength?: CigarStrength;
}

export interface IApiAssistantService {
  getBrands(page: number, searchString?: string): Observable<IBrandsDatabase>;
  getBrandById(brandId: number): Observable<{ brand: IBrandSearchResult }>;
  getCigars(
    page: number,
    requestDictionary?: IRequestParameters
  ): Observable<ICigarsDatabaseState>;
  getCigarById(cigarId: number): Observable<{ cigar: ICigarSearchResult }>;
}

export interface IBrandsDatabase extends ICommonSearchResult {
  brands: IBrandSearchResult[];
}

export interface ICigarsDatabaseState extends ICommonSearchResult, ILoading {
  cigars: ICigarSearchResult[];
}

export interface ILoading {
  loading: boolean;
  error: any;
}

export interface IStoreState {
  questionnaire: IQuestionnaireState;
  router: RouterReducerState;
  results: ICigarsDatabaseState;
}

export interface IQuestionnaireState {
  dateOfBirth: Date | undefined;
  name: string;
  email: string;
  country: CigarCountry;
  color: CigarColor;
  strength: CigarStrength;
}

export interface IBrandSearchResult {
  brandId: number;
  name: string;
}

export interface ICigarSearchResult {
  cigarId: number;
  brandId: number;
  name: string;
  length: number;
  ringGauge: number;
  country: string;
  filler: string;
  wrapper: string;
  color: CigarColor;
  strength: CigarStrength;
}

export interface ICommonSearchResult {
  page: number;
  count: number;
}

export type CigarColor =
  | ''
  | 'Colorado Maduro'
  | 'Colorado Claro'
  | 'Colorado'
  | 'Maduro'
  | 'Rosado'
  | 'Naturale'
  | 'Claro'
  | 'Oscuro'
  | 'Double Claro'
  | 'Multiple'
  | 'Barber Pole';

export type CigarStrength =
  | ''
  | 'Mild'
  | 'Mild-Medium'
  | 'Medium'
  | 'Medium-Full'
  | 'Full';

export type CigarCountry =
  | ''
  | 'Cuba'
  | 'Dominican Republic'
  | 'Nicaragua'
  | 'United States of America'
  | 'Honduras'
  | 'Costa Rica'
  | 'Mexico'
  | 'Brazil'
  | 'Ecuador';
