import { Component, OnInit } from '@angular/core';
import {User} from "@core/models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {LoggedUserService} from "@core/services/logged-user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User | undefined;
  public loggedUser: User | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly state: LoggedUserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    this.state.getLoggedUser$().subscribe((user) => this.loggedUser = user);
  }

  public logOut() {
    this.router.navigate(['/sign-in']).then();
  }
}
