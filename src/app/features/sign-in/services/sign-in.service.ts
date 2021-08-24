import { Injectable } from '@angular/core';
import {SignInCredentials, SignInResponse} from "@/features/sign-in/models";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {apiBaseUrl} from "@core/constants/api";
import {LoggedUserService} from "@core/services/logged-user.service";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public signIn$(credentials: SignInCredentials): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(apiBaseUrl + 'auth/sign-in', {...credentials});
  }
}
