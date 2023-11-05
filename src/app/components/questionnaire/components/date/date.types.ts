import { AbstractControl } from '@angular/forms';

export interface IDateOfBirthGroup {
  day: AbstractControl<string>;
  month: AbstractControl<string>;
  year: AbstractControl<string>;
}
