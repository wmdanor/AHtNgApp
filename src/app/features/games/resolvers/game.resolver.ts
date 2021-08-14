import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {Game} from "../models";
import {GamesService} from "@/features/games/services/games.service";

@Injectable({
  providedIn: 'root'
})
export class GameResolver implements Resolve<Game | undefined> {
  constructor(
    private readonly gamesService: GamesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game | undefined> {
    const id = Number(route.params.id);
    return this.gamesService.getGame$(id);
  }
}
