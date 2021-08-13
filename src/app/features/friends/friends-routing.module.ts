import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendsComponent} from "@/features/friends/pages/friends/friends.component";

const routes: Routes = [
  {
    path: '',
    component: FriendsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
