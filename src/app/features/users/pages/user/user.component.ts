import { Component, OnInit } from '@angular/core';
import {User} from "@core/models/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
  }

}
