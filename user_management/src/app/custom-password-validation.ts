import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; // Don't validate empty values, handled by 'required' validator
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    const errors: ValidationErrors = {};
    if (!hasUpperCase) errors['requiresUppercase'] = true;
    if (!hasLowerCase) errors['requiresLowercase'] = true;
    if (!hasNumeric) errors['requiresNumeric'] = true;
    if (!hasSpecial) errors['requiresSpecialChar'] = true;

    return Object.keys(errors).length > 0 ? errors : null;
  };
}

/**
 * Custom cross-field validator to check that password and confirm_password match.
 */
export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirm_password');

    // Don't validate if controls are not yet available or confirm password hasn't been touched
    if (!password || !confirmPassword) {
        return null;
    }

    // The error is applied to the form group.
    // In the template, you can check for this error on the group and show a message when appropriate (e.g., when the confirm_password field is touched).
    return password.value === confirmPassword.value ? null : { passwordsDoNotMatch: true };
}