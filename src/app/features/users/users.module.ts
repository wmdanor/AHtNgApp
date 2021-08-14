import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user/user.component';
import {UsersRoutingModule} from "@/features/users/users-routing.module";
import { EditComponent } from './pages/edit/edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "@core/core.module";



@NgModule({
  declarations: [
    UserComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
