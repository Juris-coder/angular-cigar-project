import { FormControl } from '@angular/forms';
import { CigarColor, CigarCountry, CigarStrength } from 'src/app/app.types';

export enum QuestionnaireStep {
  DateOfBirth = 'dateOfBirthInput',
  Name = 'nameInput',
  Country = 'countrySelection',
  Color = 'colorSelection',
  Strength = 'strengthSelection',
}

export interface IQuestionnaireGroup {
  dateOfBirth: FormControl<Date | undefined | null>;
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  country: FormControl<CigarCountry | null>;
  color: FormControl<CigarColor | null>;
  strength: FormControl<CigarStrength | null>;
}
