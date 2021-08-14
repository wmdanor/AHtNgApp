import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Game} from "@/features/games/models";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public game: Game | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.game = this.activatedRoute.snapshot.data.game;
  }

}
