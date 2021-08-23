import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "@core/models/user";
import {apiBaseUrl} from "@core/constants/api";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

interface State {
  user: User | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  private readonly apiUrl = apiBaseUrl + 'users/'

  private user: User | undefined;
  private state$: BehaviorSubject<State> = new BehaviorSubject<State>({user: undefined});

  constructor(
    private readonly http: HttpClient
  ) {
    this.updateLoggedUser();
  }

  private getState$() {
    return this.state$.asObservable();
  }

  private setState(state: State) {
    this.state$.next({...this.state$.getValue(), ...state});
  }

  public getLoggedUser$(): Observable<User | undefined> {
    return this.getState$().pipe(
      map(({user}) => user)
    );
  }

  public updateLoggedUser() {
    this.http.get(this.apiUrl + 'me').subscribe((res: any) => {
      this.setState({user: res.user});
    });
  }
}
