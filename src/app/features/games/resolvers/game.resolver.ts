import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {FeaturedGame} from "@core/models/games";
import {GamesService} from "@/features/games/services/games.service";

@Injectable({
  providedIn: 'root'
})
export class GameResolver implements Resolve<FeaturedGame | undefined> {
  constructor(
    private readonly gamesService: GamesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FeaturedGame | undefined> {
    const id = Number(route.params.id);
    return this.gamesService.getGame$(id);
  }
}
