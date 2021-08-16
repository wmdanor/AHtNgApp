import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LibraryComponent} from "@/features/library/pages/library/library.component";
import {LibraryResolver} from "@/features/library/resolvers/library.resolver";

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    pathMatch: 'full',
    resolve: {
      games: LibraryResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
