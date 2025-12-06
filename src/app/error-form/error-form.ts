import { Component, input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-form',
  imports: [],
  templateUrl: './error-form.html',
  styles: ``
})
export class ErrorForm {
control = input<AbstractControl | null>();
 private messages: any = {
    required: '⚠️ Ce champ est obligatoire',
    minlength: (params: any) => `⚠️ Minimum ${params.requiredLength} caractères`,
    maxlength: (params: any) => `⚠️ Maximum ${params.requiredLength} caractères`,
    email: '⚠️ Email invalide',
    min: (params: any) => `⚠️ La valeur doit être ≥ ${params.min}`,
    max: (params: any) => `⚠️ La valeur doit être ≤ ${params.max}`
  };

  get errorMessage(): string | null {
  const control = this.control();
  const errors = control?.errors;
  if (control && errors && (control.dirty || control.touched)) {
    const firstKey = Object.keys(errors)[0];
    const errorValue = errors[firstKey];

    // Si c’est une fonction (paramétrée), on l’exécute
    if (typeof this.messages[firstKey] === 'function') {
      return this.messages[firstKey](errorValue);
    }
    return this.messages[firstKey];
  }
  return null;
}

}
