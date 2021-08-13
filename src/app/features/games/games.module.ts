import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './pages/game/game.component';
import { GamesComponent } from './pages/games/games.component';
import {GamesRoutingModule} from "@/features/games/games-routing.module";

@NgModule({
  declarations: [
    GameComponent,
    GamesComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
