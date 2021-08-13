import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const PUBLIC_COMPONENTS: any = [];
const PUBLIC_DIRECTIVES: any = [];
const PUBLIC_PIPES: any = [];

@NgModule({
  declarations: [
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
  ],
})
export class SharedModule { }
