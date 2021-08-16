import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Game} from "@core/models/games";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() { }

  public getGamesInLibrary$(): Observable<Game[]> {
    return of([
      {
        id: 1,
        name: 'game1',
        price: 100,
        description: 'description',
        tags: ['tag1', 'tag2']
      }
    ])
  }
}
