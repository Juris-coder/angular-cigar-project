import { Observable } from 'rxjs';
import { CigarColor, CigarStrength } from '../app.types';

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

export interface ILoading {
  loading: boolean;
  error: any;
}

export interface IBrandsDatabase extends ICommonSearchResult {
  brands: IBrandSearchResult[];
}

export interface ICigarsDatabaseState extends ICommonSearchResult, ILoading {
  cigars: ICigarSearchResult[];
}

export interface ICommonSearchResult {
  page: number;
  count: number;
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
