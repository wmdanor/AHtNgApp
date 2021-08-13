import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GamesComponent} from "./pages/games/games.component";
import {GameComponent} from "./pages/game/game.component";

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: GameComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
