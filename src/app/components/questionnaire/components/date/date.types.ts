import { FormControl } from '@angular/forms';

export interface IDateOfBirthGroup {
  day: FormControl<string | null>;
  month: FormControl<string | null>;
  year: FormControl<string | null>;
}
