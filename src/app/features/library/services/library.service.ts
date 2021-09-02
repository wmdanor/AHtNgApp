import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Game} from "@core/models/games";
import {apiBaseUrl} from "@core/constants/api";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "@core/models/user";
import {LoggedUserService} from "@core/services/logged-user.service";
import {unsubscribeArray} from "@core/utils/unsubscribeArray";

@Injectable({
  providedIn: 'root'
})
export class LibraryService implements OnDestroy {
  private user: User | undefined;
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly state: LoggedUserService,
  ) {
    const subscription = this.state.getLoggedUser$().subscribe((user) => this.user = user);
    this.subscriptions.push(subscription)
  }

  ngOnDestroy(): void {
    unsubscribeArray(this.subscriptions);
  }

  public getGamesInLibrary$(): Observable<Game[]> {
    const id = this.user?.id;
    return this.http.get(apiBaseUrl + `users/${id}/games`)
      .pipe(map((res: any) => res.games));
  }
}
