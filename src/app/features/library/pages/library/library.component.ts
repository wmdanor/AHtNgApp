import { Component, OnInit } from '@angular/core';
import {Game} from "@core/models/games";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public games: Game[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.games = this.activatedRoute.snapshot.data.games;
  }

}
