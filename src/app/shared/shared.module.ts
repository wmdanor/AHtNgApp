import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ContainerComponent } from './components/container/container.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ConfirmModalComponent,
    SearchBarComponent,
    ContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    SearchBarComponent,
    ContainerComponent,
    ConfirmModalComponent,
  ],
  providers: []
})
export class SharedModule { }
