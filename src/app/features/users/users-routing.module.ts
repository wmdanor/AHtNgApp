import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "@/features/users/pages/user/user.component";
import {EditComponent} from "@/features/users/pages/edit/edit.component";
import {UserResolver} from "@/features/users/resolvers/user.resolver";

const routes: Routes = [
  {
    path: ':id',
    component: UserComponent,
    pathMatch: 'full',
    resolve: {
      user: UserResolver
    }
  },
  {
    path: ':id/edit',
    component: EditComponent,
    resolve: {
      user: UserResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
