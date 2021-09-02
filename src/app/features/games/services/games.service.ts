import {Injectable, OnDestroy} from '@angular/core';
import {FeaturedGame, GamesFilter, GamesPage} from "@core/models/games";
import {apiBaseUrl} from "@core/constants/api";
import {Observable, Subscription} from "rxjs";
import {Pagination} from "@core/models/pagination";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {LoggedUserService} from "@core/services/logged-user.service";
import {User} from "@core/models/user";
import {unsubscribeArray} from "@core/utils/unsubscribeArray";

@Injectable({
  providedIn: 'root'
})
export class GamesService implements OnDestroy {
  private readonly apiUrl = apiBaseUrl + 'games';
  private user: User | undefined;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly state: LoggedUserService
  ) {
    const subscription = this.state.getLoggedUser$().subscribe((user) => this.user = user);
    this.subscriptions.push(subscription)
  }

  ngOnDestroy(): void {
    unsubscribeArray(this.subscriptions);
  }

  public getGames$(pagination: Pagination, filter: GamesFilter): Observable<GamesPage> {
    return this.http.get<GamesPage>(this.apiUrl, {params: {...pagination, ...filter}});
  }

  public isInLibrary$(id: number): Observable<boolean> {
    const userId = this.user?.id;
    const url = apiBaseUrl + `users/${userId}/games/${id}/check`;
    return this.http.get(url)
      .pipe(map((res: any) => res.isInLibrary));
  }

  public getGame$(id: number): Observable<FeaturedGame | undefined> {
    return this.http.get(this.apiUrl + `/${id}`)
      .pipe(map((res: any) => res.game));
  }

  public getTags$(): Observable<string[]> {
    return this.http.get(this.apiUrl + '/tags')
      .pipe(map((res: any) => res.tags));
  }

  public addToLibrary$(id: number): Observable<unknown> {
    const userId = this.user?.id;
    return this.http.post(apiBaseUrl + `users/${userId}/games/${id}`, null)
      .pipe(map((res: any) => res.isInLibrary));
  }
}
