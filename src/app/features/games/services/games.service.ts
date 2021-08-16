import { Injectable } from '@angular/core';
import {FeaturedGame, Game, GamesFilter, GamesPage} from "../models";
import {apiBaseUrl} from "@core/constants/api";
import {Observable, of} from "rxjs";
import {Pagination} from "@core/models/pagination";
import {FriendStatus} from "@/features/friends/models";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly apiUrl = apiBaseUrl + 'games';

  constructor() { }

  // TODO: add filters
  public getGames$(pagination: Pagination, filter: GamesFilter): Observable<GamesPage> {
    return of({
      ...pagination,
      count: 1,
      games: [
        {
          id: 1,
          name: 'game1',
          price: 100,
          description: 'description',
          tags: ['tag1', 'tag2'],
          isInLibrary: false
        }
      ]
    });
  }

  public getGame$(id: number): Observable<FeaturedGame | undefined> {
    return of({
      id: 1,
      name: 'game1',
      price: 100,
      description: '',
      tags: ['tag1', 'tag2'],
      isInLibrary: false
    });
  }

  public getTags$(): Observable<string[]> {
    return of(['tag1', 'tag2']);
  }

  public addToLibrary$(id: number): Observable<unknown> {
    return of();
  }
}
