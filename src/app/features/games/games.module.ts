import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './pages/game/game.component';
import { GamesComponent } from './pages/games/games.component';
import {GamesRoutingModule} from "@/features/games/games-routing.module";
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesListItemComponent } from './components/games-list-item/games-list-item.component';
import { GamesListFilterComponent } from './components/games-list-filter/games-list-filter.component';
import {SharedModule} from "@shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    GameComponent,
    GamesComponent,
    GamesListComponent,
    GamesListItemComponent,
    GamesListFilterComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
  ]
})
export class GamesModule { }
