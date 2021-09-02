import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FeaturedGame} from "@core/models/games";
import {GamesService} from "@/features/games/services/games.service";
import {Subscription} from "rxjs";
import {unsubscribeArray} from "@core/utils/unsubscribeArray";

@Component({
  selector: 'app-games-list-item',
  templateUrl: './games-list-item.component.html',
  styleUrls: ['./games-list-item.component.scss']
})
export class GamesListItemComponent implements OnInit, OnDestroy {
  @Input() game!: FeaturedGame;
  @Output() gameChange = new EventEmitter<FeaturedGame>();

  private maxDescriptionLength = 100;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly gamesService: GamesService
  ) { }

  ngOnInit(): void {
    const subscription = this.gamesService.isInLibrary$(this.game.id).subscribe(
      (isInLibrary: boolean) => {
        this.game.isInLibrary = isInLibrary;
        this.gameChange.emit(this.game);
      }
    );

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    unsubscribeArray(this.subscriptions);
  }

  public get price() {
    const {price} = this.game
    return price === 0 ? 'Free' : `${price} USD`;
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
