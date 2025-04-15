import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value?.replace(/[^\d]/g, '');

    if (!cpf || cpf.length !== 11) {
      return { cpfInvalido: true };
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return { cpfInvalido: true };
    }

    const calcCheckDigit = (cpf: string, factor: number): number => {
      let total = 0;
      for (let i = 0; i < factor - 1; i++) {
        total += parseInt(cpf.charAt(i)) * (factor - i);
      }
      const rest = (total * 10) % 11;
      return rest === 10 ? 0 : rest;
    };

    const digit1 = calcCheckDigit(cpf, 10);
    const digit2 = calcCheckDigit(cpf, 11);

    if (digit1 !== parseInt(cpf.charAt(9)) || digit2 !== parseInt(cpf.charAt(10))) {
      return { cpfInvalido: true };
    }

    return null;
  };
}
