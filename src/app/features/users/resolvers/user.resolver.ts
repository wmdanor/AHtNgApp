import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {UsersService} from "@/features/users/services/users.service";
import {User} from "@/features/users/models";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User | undefined> {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | undefined> {
    const id = Number(route.params.id);
    return this.usersService.getUser$(id);
  }
}
