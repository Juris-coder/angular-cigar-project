import { Pipe, PipeTransform } from '@angular/core';

const USA_COUNTRY_NAME = 'United States of America';
const USA_COUNTRY_CODE = 'USA';

@Pipe({
  name: 'countryName',
  standalone: true,
})
export class CountryNamePipe implements PipeTransform {
  transform(countryName: string | null): string {
    return countryName === USA_COUNTRY_NAME
      ? USA_COUNTRY_CODE
      : (countryName ?? '');
  }
}
