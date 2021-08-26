import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "@core/models/user";
import {LoggedUserService} from "@core/services/logged-user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedUser: User | undefined;

  constructor(
    public readonly route: ActivatedRoute,
    private readonly state: LoggedUserService,
  ) { }

  ngOnInit(): void {
    this.state.getLoggedUser$().subscribe((user) => {
      this.loggedUser = user;
    });
  }
}
