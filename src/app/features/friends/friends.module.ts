import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './pages/friends/friends.component';
import {FriendsRoutingModule} from "@/features/friends/friends-routing.module";
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FriendListItemComponent } from './components/friend-list-item/friend-list-item.component';
import {SharedModule} from "@shared/shared.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    FriendsComponent,
    FriendsListComponent,
    FriendListItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    FriendsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FriendsModule { }
