import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GamesFilter, GamesPage} from "@/features/games/models";
import {GamesService} from "@/features/games/services/games.service";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public filter: GamesFilter = {name: '', maxPrice: -1, tags: []};

  constructor(
  ) { }

  ngOnInit(): void {

  }

  queryChanged(query: string) {
    this.filter.name = query;
  }
}
