import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Friend, FriendStatus} from "@/features/friends/models";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmModalComponent} from "@shared/components/confirm-modal/confirm-modal.component";
import {FriendsService} from "@/features/friends/services/friends.service";
import {Subscription} from "rxjs";
import {unsubscribeArray} from "@core/utils/unsubscribeArray";

@Component({
  selector: 'app-friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.scss']
})
export class FriendListItemComponent implements OnInit, OnDestroy {
  @Input() friend!: Friend;
  @Output() friendChange = new EventEmitter<Friend>();

  public friendStatus = FriendStatus;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly modalService: NgbModal,
    private readonly friendsService: FriendsService
  ) { }

  ngOnInit(): void {
    if (this.friend.status) {
      return;
    }
    const subscription = this.friendsService.getFriendshipStatus$(this.friend.user.id).subscribe(
      (status) => {
        this.friendChange.emit({
          ...this.friend,
          status,
        });
      }
    )

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    unsubscribeArray(this.subscriptions);
  }

  sendRequest(): void {
    this.updateStatus(FriendStatus.SentRequest);
  }

  removeFriend(): void {
    this.updateStatus(FriendStatus.None);
  }

  cancelRequest(): void {
    this.updateStatus(FriendStatus.None);
  }

  acceptRequest(): void {
    this.updateStatus(FriendStatus.Friends);
  }

  rejectRequest(): void {
    this.updateStatus(FriendStatus.None);
  }

  updateStatus(status: FriendStatus) {
    this.modalService.open(ConfirmModalComponent).result
      .then(() => {
        this.friendChange.emit({
          ...this.friend,
          status,
        });
        this.friendsService.updateFriendshipStatus$(this.friend.user.id, status).subscribe();
      });
  }
}
