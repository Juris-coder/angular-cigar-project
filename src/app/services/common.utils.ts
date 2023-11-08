import { environment } from 'src/environments/environment.development';

export const API_ENDPOINT: string = `https://${environment.API_HOST}/`;

export const searchKeysDictionary = {
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

export const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': environment.API_KEY,
    'X-RapidAPI-Host': environment.API_HOST,
  },
};
