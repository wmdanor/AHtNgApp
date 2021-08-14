import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './pages/friends/friends.component';
import {FriendsRoutingModule} from "@/features/friends/friends-routing.module";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FriendListItemComponent } from './components/friend-list-item/friend-list-item.component';



@NgModule({
  declarations: [
    FriendsComponent,
    SearchBarComponent,
    FriendsListComponent,
    FriendListItemComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class FriendsModule { }
