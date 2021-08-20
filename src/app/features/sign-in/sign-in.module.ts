import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from "./sign-in.component";
import {SignInRoutingModule} from "./sign-in-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SignInRoutingModule,
    ReactiveFormsModule
  ]
})
export class SignInModule { }
