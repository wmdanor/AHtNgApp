import { Injectable } from '@angular/core';
import {SignInCredentials} from "@/features/sign-in/models";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor() { }

  // TODO: change type from unknown and add http service
  public signIn$(credentials: SignInCredentials): Observable<unknown> {
    return of(null);
  }
}
