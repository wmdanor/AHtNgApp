import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "@core/models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {LoggedUserService} from "@core/services/logged-user.service";
import {Subscription} from "rxjs";
import {unsubscribeArray} from "@core/utils/unsubscribeArray";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public user: User | undefined;
  public loggedUser: User | undefined;

  private subscriptions: Subscription[] = []

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly state: LoggedUserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    const subscription = this.state.getLoggedUser$().subscribe((user) => this.loggedUser = user);
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    unsubscribeArray(this.subscriptions);
  }

  public logOut() {
    this.router.navigate(['/sign-in']).then();
  }
}
