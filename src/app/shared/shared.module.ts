import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ContainerComponent } from './components/container/container.component';

const PUBLIC_COMPONENTS: any = [];
const PUBLIC_DIRECTIVES: any = [];
const PUBLIC_PIPES: any = [];

@NgModule({
  declarations: [
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
    ConfirmModalComponent,
    SearchBarComponent,
    ContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
    SearchBarComponent,
    ContainerComponent,
  ],
})
export class SharedModule { }
