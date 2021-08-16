import {Component, Input, OnInit} from '@angular/core';
import {FeaturedGame, GamesFilter, GamesPage} from "@/features/games/models";
import {Subscription} from "rxjs";
import {GamesService} from "@/features/games/services/games.service";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  @Input() filter!: GamesFilter;

  public pageData: GamesPage = {offset: 0, limit: 0, count: 0, games: []};

  public page = 1;
  public pageSize = 12;
  private lastSubscription: Subscription = new Subscription();

  constructor(
    private readonly gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.reloadList();
  }

  reloadList() {
    this.lastSubscription.unsubscribe();
    this.lastSubscription = this.gamesService.getGames$({
      offset: this.offset,
      limit: this.pageSize
    }, this.filter)
      .subscribe((gamesPage) => this.pageData = gamesPage);
  }

  private get offset() {
    return (this.page-1)*this.pageSize;
  }

  addToLibrary(game: FeaturedGame) {
    this.gamesService.addToLibrary$(game.id);
    const index = this.pageData.games.findIndex((el) => el.id == game.id);
    this.pageData.games[index] = game;
  }
}
