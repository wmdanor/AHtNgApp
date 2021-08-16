import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {Game} from "@core/models/games";
import {LibraryService} from "@/features/library/services/library.service";

@Injectable({
  providedIn: 'root'
})
export class LibraryResolver implements Resolve<Game[]> {
  constructor(
    private readonly libraryService: LibraryService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game[]> {
    return this.libraryService.getGamesInLibrary$();
  }
}
