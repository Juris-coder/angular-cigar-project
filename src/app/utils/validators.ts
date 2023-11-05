import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const isAdult = (date: Date): boolean | undefined => {
  const inputDate = new Date(date);
  const currentDate = new Date();

  if (isNaN(inputDate.getTime())) {
    return;
  }

  const yearsDifference = currentDate.getFullYear() - inputDate.getFullYear();

  if (yearsDifference > 18) {
    return true;
  }

  if (yearsDifference === 18) {
    if (currentDate.getMonth() > inputDate.getMonth()) {
      return true;
    }

    if (
      currentDate.getMonth() === inputDate.getMonth() &&
      currentDate.getDate() >= inputDate.getDate()
    ) {
      return true;
    }
  }

  return false;
};

export const minMaxValidator =
  (min: number, max: number, maxLength: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const isFull = control.value.length >= maxLength;

    if (!isFull) {
      return { required: true };
    }

    if (Number(control.value) < min) {
      control.setValue(min.toString().padStart(2, '0'));
    }

    if (Number(control.value) > max) {
      control.setValue(max.toString());
    }

    return null;
  };

export const maxLengthValidator =
  (maxLength: number): ValidatorFn =>
  (control: AbstractControl): null => {
    if (control.value.length > maxLength) {
      control.setValue(control.value.slice(0, maxLength));
    }

    return null;
  };

export const numberPatternValidator =
  (): ValidatorFn =>
  (control: AbstractControl): null => {
    if (control.value.length && /[^0-9]/g.test(control.value)) {
      const value = control.value.replace(/[^0-9]/g, '');
      control.setValue(value);
    }

    return null;
  };

export const dateValidator = (): ValidatorFn => {
  return ((form: FormGroup): ValidationErrors | null => {
    const {
      day: dayControl,
      month: monthControl,
      year: yearControl,
    } = form.controls;

    if (dayControl.valid && monthControl.valid && yearControl.valid) {
      const day = Number(dayControl.value);
      const month = Number(monthControl.value);
      const year = Number(yearControl.value);
      const date = new Date(year, month - 1, day);

      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return { invalidDate: true };
      }
    }

    return null;
  }) as ValidatorFn;
};
