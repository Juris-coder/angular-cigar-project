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

@Injectable()
export class ApiAssistantService implements IApiAssistantService {
  constructor(private http: HttpClient) {}

  private readonly API_HOST: string = 'cigars.p.rapidapi.com';
  private readonly API_ENDPOINT: string = `https://${this.API_HOST}/`;
  private readonly API_KEY: string =
    'e22f14257fmsh4abd6503a233916p16b6e7jsn833b32e30f04';

  private readonly searchKeysDictionary = {
    paths: {
      brands: 'brands',
      cigars: 'cigars',
    },
    parameters: {
      page: 'page',
      search: 'search',
      name: 'name',
      brandId: 'brandId',
      country: 'country',
      filler: 'filler',
      wrapper: 'wrapper',
      color: 'color',
      strength: 'strength',
    },
  };

  private readonly options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': this.API_KEY,
      'X-RapidAPI-Host': this.API_HOST,
    },
  };

  getBrands(page: number, searchString?: string): Observable<IBrandsDatabase> {
    const requestBody = `${this.searchKeysDictionary.paths.brands}?${this.searchKeysDictionary.parameters.page}=${page}`;
    if (!searchString) {
      return this.makeRequest(requestBody);
    }
    const searchQuery = `&${this.searchKeysDictionary.parameters.search}=${searchString}`;
    return this.makeRequest(requestBody + searchQuery);
  }

  getBrandById(brandId: number): Observable<{ brand: IBrandSearchResult }> {
    const requestBody = `${this.searchKeysDictionary.paths.brands}/${brandId}`;
    return this.makeRequest(requestBody);
  }

  getCigars(
    page: number,
    requestDictionary?: IRequestParameters
  ): Observable<ICigarsDatabaseState> {
    const requestBody = `${this.searchKeysDictionary.paths.cigars}?${this.searchKeysDictionary.parameters.page}=${page}`;
    if (!requestDictionary || !Object.keys(requestDictionary).length) {
      return this.makeRequest(requestBody);
    }

    const queryStringArray = Object.keys(requestDictionary)
      .filter(
        (key) =>
          key in this.searchKeysDictionary.parameters &&
          !!requestDictionary[key as keyof IRequestParameters]
      )
      .map(
        (key) =>
          `${
            this.searchKeysDictionary.parameters[
              key as keyof IRequestParameters
            ]
          }=${requestDictionary[key as keyof IRequestParameters]}`
      )
      .join('&');

    return this.makeRequest(`${requestBody}&${queryStringArray}`);
  }

  getCigarById(cigarId: number): Observable<{ cigar: ICigarSearchResult }> {
    const requestBody = `${this.searchKeysDictionary.paths.cigars}/${cigarId}`;
    return this.makeRequest(requestBody);
  }

  private makeRequest(requestBody: string): Observable<any> {
    return this.http.get(this.API_ENDPOINT + requestBody, this.options);
  }
}
