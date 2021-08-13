import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user/user.component';
import { MeComponent } from './pages/me/me.component';
import {UsersRoutingModule} from "@/features/users/users-routing.module";



@NgModule({
  declarations: [
    UserComponent,
    MeComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
