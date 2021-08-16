import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GamesComponent} from "./pages/games/games.component";
import {GameComponent} from "./pages/game/game.component";
import {GameResolver} from "@/features/games/resolvers/game.resolver";
import {TagsResolver} from "@/features/games/resolvers/tags.resolver";

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
    pathMatch: 'full',
    resolve: {
      tags: TagsResolver
    }
  },
  {
    path: ':id',
    component: GameComponent,
    resolve: {
      game: GameResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
