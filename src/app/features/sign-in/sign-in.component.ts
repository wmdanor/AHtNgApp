import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignInService} from "@/features/sign-in/services/sign-in.service";
import {LoggedUserService} from "@core/services/logged-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  host: {'class': 'container-fluid d-flex flex-grow-1 flex-column align-items-center justify-content-center'}
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup | undefined;
  public errorMessage: string = '';

  constructor(
    private readonly router: Router,
    private readonly signInService: SignInService,
    private readonly state: LoggedUserService
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
      this.errorMessage = '';
      const data = this.signInForm?.value;

      this.signInService.signIn$(data).subscribe(() => {
        this.state.updateLoggedUser();
        this.router.navigate(['/']).then();
      }, (error => {
        this.errorMessage = error.error.message;
      }));
    }
  }
}
