import { Injectable } from '@angular/core';
import {User} from "@core/models/user";
import {Observable, of} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {apiBaseUrl} from "@core/constants/api";
import {map} from "rxjs/operators";
import * as Url from "url";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // TODO: add authorization
  private readonly apiUrl = apiBaseUrl + 'users';

  constructor(
    private readonly http: HttpClient
  ) { }

  getUsers$(query: any): Observable<User[]> {
    throw new Error('Deprecated');
  }

  getUser$(id: number): Observable<User | undefined> {
    // return of({
    //   id: 1,
    //   email: 'example@email.com',
    //   username: 'example',
    //   age: 25
    // });
    return this.http.get(this.apiUrl + `/${id}`)
      .pipe(map((res: any) => res.user));
  }

  updateUser$(user: User): Observable<boolean> {
    // return of(true);
    return this.http.put(this.apiUrl + `/${user.id}`, {user})
      .pipe(map((res: any) => res.user));
  }
}
