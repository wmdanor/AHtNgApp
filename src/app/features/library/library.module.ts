import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './pages/library/library.component';
import {SharedModule} from "@shared/shared.module";
import { LibraryItemComponent } from './components/library-item/library-item.component';
import {LibraryRoutingModule} from "@/features/library/library-routing.module";



@NgModule({
  declarations: [
    LibraryComponent,
    LibraryItemComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule
  ]
})
export class LibraryModule { }
