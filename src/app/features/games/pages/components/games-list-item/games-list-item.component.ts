import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FeaturedGame} from "@/features/games/models";

@Component({
  selector: 'app-games-list-item',
  templateUrl: './games-list-item.component.html',
  styleUrls: ['./games-list-item.component.scss']
})
export class GamesListItemComponent implements OnInit {
  @Input() game!: FeaturedGame;
  @Output() gameChange = new EventEmitter<FeaturedGame>();

  private maxDescriptionLength = 100;

  constructor() { }

  ngOnInit(): void {
  }

  public get description() {
    const {description} = this.game;
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength - 5) + '...';
    }

    return description;
  }

  public addToLibrary() {
    // TODO: add to library
  }
}
