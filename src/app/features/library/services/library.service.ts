import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Game} from "@core/models/games";
import {apiBaseUrl} from "@core/constants/api";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "@core/models/user";
import {LoggedUserService} from "@core/services/logged-user.service";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private user: User | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly state: LoggedUserService,
  ) {
    this.state.getLoggedUser$().subscribe((user) => this.user = user);
  }

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
    const id = this.user?.id;
    return this.http.get(apiBaseUrl + `users/${id}/games`)
      .pipe(map((res: any) => res.games));
  }
}
