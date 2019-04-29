import { AbstractControl } from '@angular/forms';


export class DateValidator {
  static dateVaidator(AC: AbstractControl) {
    if (AC && AC.value && new Date(AC.value).getTime() > new Date().getTime() ) {
      return { dateVaidator: true };
    }
    return null;
  }
}
