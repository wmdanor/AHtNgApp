import {Component, OnInit} from '@angular/core';
import {FilterComponentData, GamesFilter} from "@core/models/games";

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
    this.filter = {
      ...this.filter,
      name: query,
    }
  }

  filterChanged(filter: FilterComponentData) {
    this.filter = {
      ...this.filter,
      ...filter,
    };
  }
}
