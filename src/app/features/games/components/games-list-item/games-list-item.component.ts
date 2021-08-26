import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FeaturedGame} from "@core/models/games";
import {GamesService} from "@/features/games/services/games.service";

@Component({
  selector: 'app-games-list-item',
  templateUrl: './games-list-item.component.html',
  styleUrls: ['./games-list-item.component.scss']
})
export class GamesListItemComponent implements OnInit {
  @Input() game!: FeaturedGame;
  @Output() gameChange = new EventEmitter<FeaturedGame>();

  private maxDescriptionLength = 100;

  constructor(
    private readonly gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gamesService.isInLibrary$(this.game.id).subscribe(
      (isInLibrary: boolean) => {
        this.game = {
          ...this.game,
          isInLibrary,
        }
        this.gameChange.emit(this.game);
      }
    )
  }

  public get description() {
    const {description} = this.game;
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength - 5) + '...';
    }

    return description;
  }

  public addToLibrary() {
    this.gamesService.addToLibrary$(this.game.id).subscribe();
    this.game.isInLibrary = true;
    this.gameChange.emit(this.game);
  }
}
