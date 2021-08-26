import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "@core/models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "@core/services/users.service";
import {LoggedUserService} from "@core/services/logged-user.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  host: {'class': 'container-fluid d-flex flex-grow-1 flex-column align-items-center justify-content-center'}
})
export class EditComponent implements OnInit {
  private user: User | undefined;
  public editForm: FormGroup | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly state: LoggedUserService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;

    this.editForm = new FormGroup({
      id: new FormControl(this.user?.id),
      username: new FormControl(this.user?.username, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      email: new FormControl(this.user?.email, [
        Validators.required,
        Validators.email,
      ]),
      age: new FormControl(this.user?.age, [
        Validators.min(14),
      ]),
    })
  }

  get username() { return this.editForm?.get('username'); }
  get email() { return this.editForm?.get('email'); }
  get age() { return this.editForm?.get('age'); }

  get usernameInvalid() {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched);
  }

  get emailInvalid() {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched);
  }

  get ageInvalid() {
    return this.age?.invalid && (this.age?.dirty || this.age?.touched);
  }

  public submit(): void {
    if (this.editForm?.valid) {
      const data = this.editForm?.value;
      this.usersService.updateUser$(data).subscribe(() => {
        this.state.updateLoggedUser();
        this.router.navigate([
          `/users/${this.user?.id}`
        ]).then();
      });
    }
  }
}
