import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IBrandSearchResult,
  IBrandsDatabase,
  ICigarSearchResult,
  ICigarsDatabaseState,
  IRequestParameters,
} from '../app.types';
import { IApiAssistantService } from '../app.types';
import { Injectable } from '@angular/core';
import { API_ENDPOINT, options, searchKeysDictionary } from './common.utils';

@Injectable()
export class ApiAssistantService implements IApiAssistantService {
  constructor(private http: HttpClient) {}

  getBrands(page: number, searchString?: string): Observable<IBrandsDatabase> {
    const requestBody = `${searchKeysDictionary.paths.brands}?${searchKeysDictionary.parameters.page}=${page}`;
    if (!searchString) {
      return this.makeRequest(requestBody);
    }
    const searchQuery = `&${searchKeysDictionary.parameters.search}=${searchString}`;
    return this.makeRequest(requestBody + searchQuery);
  }

  getBrandById(brandId: number): Observable<{ brand: IBrandSearchResult }> {
    const requestBody = `${searchKeysDictionary.paths.brands}/${brandId}`;
    return this.makeRequest(requestBody);
  }

  getCigars(
    page: number,
    requestDictionary?: IRequestParameters
  ): Observable<ICigarsDatabaseState> {
    const requestBody = `${searchKeysDictionary.paths.cigars}?${searchKeysDictionary.parameters.page}=${page}`;
    if (!requestDictionary || !Object.keys(requestDictionary).length) {
      return this.makeRequest(requestBody);
    }

    const queryStringArray = Object.keys(requestDictionary)
      .filter(
        (key) =>
          key in searchKeysDictionary.parameters &&
          !!requestDictionary[key as keyof IRequestParameters]
      )
      .map(
        (key) =>
          `${
            searchKeysDictionary.parameters[key as keyof IRequestParameters]
          }=${requestDictionary[key as keyof IRequestParameters]}`
      )
      .join('&');

    return this.makeRequest(`${requestBody}&${queryStringArray}`);
  }

  getCigarById(cigarId: number): Observable<{ cigar: ICigarSearchResult }> {
    const requestBody = `${searchKeysDictionary.paths.cigars}/${cigarId}`;
    return this.makeRequest(requestBody);
  }

  private makeRequest(requestBody: string): Observable<any> {
    return this.http.get(API_ENDPOINT + requestBody, options);
  }
}
