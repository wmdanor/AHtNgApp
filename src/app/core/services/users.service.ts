import { Injectable } from '@angular/core';
import {User} from "@core/models/user";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsers$(query: any): Observable<User[]> {
    return of([])
  }

  // TODO: implement
  getUser$(id: number): Observable<User | undefined> {
    return of({
      id: 1,
      email: 'example@email.com',
      username: 'example',
      age: 25
    });
  }

  updateUser$(user: User): Observable<boolean> {
    return of(true);
  }
}
