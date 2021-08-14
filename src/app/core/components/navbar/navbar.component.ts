import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedUserId: number = 1;

  constructor(
    public readonly route: ActivatedRoute
  ) { }

  // TODO: get logged user id normally
  ngOnInit(): void {
  }

  public toggleLoginState(event: any) {
    if (event.target.checked) {
      this.loggedUserId = 1;
    } else {
      this.loggedUserId = 0;
    }
  }

}
