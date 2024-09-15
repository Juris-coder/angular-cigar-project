import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_ENDPOINT, options, searchKeysDictionary } from './common.utils';
import {
  IApiAssistantService,
  IBrandsDatabase,
  IBrandSearchResult,
  IRequestParameters,
  ICigarsDatabaseState,
  ICigarSearchResult,
} from './types';

@Injectable()
export class ApiAssistantService implements IApiAssistantService {
  constructor(private http: HttpClient) {}

  getBrands(page: number, searchString?: string): Observable<IBrandsDatabase> {
    const requestBody = `${searchKeysDictionary.paths.brands}?${searchKeysDictionary.parameters.page}=${page}`;
    if (!searchString) {
      return this.makeRequest<IBrandsDatabase>(requestBody);
    }
    const searchQuery = `&${searchKeysDictionary.parameters.search}=${searchString}`;
    return this.makeRequest<IBrandsDatabase>(requestBody + searchQuery);
  }

  getBrandById(brandId: number): Observable<{ brand: IBrandSearchResult }> {
    const requestBody = `${searchKeysDictionary.paths.brands}/${brandId}`;
    return this.makeRequest<{ brand: IBrandSearchResult }>(requestBody);
  }

  getCigars(
    page: number,
    requestDictionary?: IRequestParameters,
  ): Observable<ICigarsDatabaseState> {
    const requestBody = `${searchKeysDictionary.paths.cigars}?${searchKeysDictionary.parameters.page}=${page}`;
    if (!requestDictionary || !Object.keys(requestDictionary).length) {
      return this.makeRequest<ICigarsDatabaseState>(requestBody);
    }

    const queryStringArray = Object.keys(requestDictionary)
      .filter(
        (key): key is keyof IRequestParameters =>
          key in searchKeysDictionary.parameters &&
          !!requestDictionary[key as keyof IRequestParameters],
      )
      .map(
        (key) =>
          `${searchKeysDictionary.parameters[key]}=${requestDictionary[key]}`,
      )
      .join('&');

    return this.makeRequest<ICigarsDatabaseState>(
      `${requestBody}${queryStringArray ? `&${queryStringArray}` : ''}`,
    );
  }

  getCigarById(cigarId: number): Observable<{ cigar: ICigarSearchResult }> {
    const requestBody = `${searchKeysDictionary.paths.cigars}/${cigarId}`;
    return this.makeRequest<{ cigar: ICigarSearchResult }>(requestBody);
  }

  private makeRequest<T>(requestBody: string): Observable<T> {
    return this.http.get<T>(API_ENDPOINT + requestBody, options);
  }
}
