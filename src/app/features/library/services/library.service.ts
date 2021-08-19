import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Game} from "@core/models/games";
import {apiBaseUrl} from "@core/constants/api";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getGamesInLibrary$(): Observable<Game[]> {
    // return of([
    //   {
    //     id: 1,
    //     name: 'game1',
    //     price: 100,
    //     description: 'description',
    //     tags: ['tag1', 'tag2']
    //   }
    // ]);
    const id = 1;
    return this.http.get(apiBaseUrl + `users/${id}/games`)
      .pipe(map((res: any) => res.games));
  }
}
