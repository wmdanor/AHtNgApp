import { Injectable } from '@angular/core';
import {FeaturedGame, GamesFilter, GamesPage} from "@core/models/games";
import {apiBaseUrl} from "@core/constants/api";
import {Observable, of} from "rxjs";
import {Pagination} from "@core/models/pagination";
import {FriendsPage} from "@/features/friends/models";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly apiUrl = apiBaseUrl + 'games';

  constructor(
    private readonly http: HttpClient
  ) { }

  // TODO: add filters
  public getGames$(pagination: Pagination, filter: GamesFilter): Observable<GamesPage> {
    // return of({
    //   ...pagination,
    //   count: 1,
    //   games: [
    //     {
    //       id: 1,
    //       name: 'game1',
    //       price: 100,
    //       description: 'description',
    //       tags: ['tag1', 'tag2'],
    //       isInLibrary: false
    //     }
    //   ]
    // });
    return this.http.get<GamesPage>(this.apiUrl, {params: {...pagination, ...filter}});
  }

  public isInLibrary$(id: number, userId: number): Observable<boolean> {
    return this.http.get(apiBaseUrl + `users/${userId}/games/${id}/check`)
      .pipe((res: any) => res.isInLibrary);
  }

  public getGame$(id: number): Observable<FeaturedGame | undefined> {
    // return of({
    //   id: 1,
    //   name: 'game1',
    //   price: 100,
    //   description: '',
    //   tags: ['tag1', 'tag2'],
    //   isInLibrary: false
    // });
    return this.http.get(this.apiUrl + `/${id}`)
      .pipe(map((res: any) => res.game));
  }

  public getTags$(): Observable<string[]> {
    return this.http.get(this.apiUrl + '/tags')
      .pipe(map((res: any) => res.tags));
    // return of(['tag1', 'tag2']);
  }

  public addToLibrary$(id: number): Observable<unknown> {
    const userId = 1;
    return this.http.post(apiBaseUrl + `users/${userId}/games/${id}`, null);
  }
}
