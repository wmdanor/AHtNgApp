import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignInService} from "@/features/sign-in/services/sign-in.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  host: {'class': 'container-fluid d-flex flex-grow-1 flex-column align-items-center justify-content-center'}
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup | undefined;

  constructor(
    private readonly signInService: SignInService
  ) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    })
  }

  get email() { return this.signInForm?.get('email'); }
  get password() { return this.signInForm?.get('password'); }

  get emailValid() {
    return this.email?.valid && (this.email?.dirty || this.email?.touched);
  }

  get emailInvalid() {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched);
  }

  get passwordValid() {
    return this.password?.valid && (this.password?.dirty || this.password?.touched);
  }

  get passwordInvalid() {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched);
  }

  public submit(): void {
    if (this.signInForm?.valid) {
      const data = this.signInForm?.value;

      const response = this.signInService.signIn$(data).subscribe((response) => {
        // TODO: add data to localstorage, cookies and global state
      });

      // ...
    }
  }
}
