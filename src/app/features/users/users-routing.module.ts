import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeComponent} from "@/features/users/pages/me/me.component";
import {UserComponent} from "@/features/users/pages/user/user.component";

const routes: Routes = [
  {
    path: 'me',
    component: MeComponent
  },
  {
    path: ':id',
    component: UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
