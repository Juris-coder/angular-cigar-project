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
  ): Observable<ICigarsDatabase>;
  getCigarById(cigarId: number): Observable<{ cigar: ICigarSearchResult }>;
}

export interface IBrandsDatabase extends ICommonSearchResult {
  brands: IBrandSearchResult[];
}

export interface ICigarsDatabase extends ICommonSearchResult {
  cigars: ICigarSearchResult[];
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
  | 'Mild'
  | 'Mild-Medium'
  | 'Medium'
  | 'Medium-Full'
  | 'Full';

export type CigarCountry =
  | 'Cuba'
  | 'Dominican Republic'
  | 'Nicaragua'
  | 'United States of America'
  | 'Honduras'
  | 'Guatemala'
  | 'Costa Rica'
  | 'Indonesia'
  | 'Puerto Rico'
  | 'Mexico'
  | 'Peru'
  | 'Brazil'
  | 'Ecuador'
  | 'Spain'
  | 'Jamaica';
