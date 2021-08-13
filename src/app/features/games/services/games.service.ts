import { Injectable } from '@angular/core';
import {Game} from "../models";
import {apiBaseUrl} from "@core/constants/api";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly apiUrl = apiBaseUrl + 'games';

  constructor() { }

  // TODO: add filters
  public getGames$():  Observable<Game[]> {
    return of([]);
  }

  public getGame$(id: number): Observable<Game | null> {
    return of(null);
  }
}
