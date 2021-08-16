import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {GamesService} from "@/features/games/services/games.service";

@Injectable({
  providedIn: 'root'
})
export class TagsResolver implements Resolve<string[]> {
  constructor(
    private readonly gamesService: GamesService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
    return this.gamesService.getTags$();
  }
}
