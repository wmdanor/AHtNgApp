import {Component, Input} from '@angular/core';
import {Game} from "@core/models/games";
import {copyTextToClipboard} from "@core/utils/copyToClipboard";

@Component({
  selector: 'app-library-item',
  templateUrl: './library-item.component.html',
  styleUrls: ['./library-item.component.scss']
})
export class LibraryItemComponent {
  @Input() game!: Game;

  private maxDescriptionLength = 150;

  public shareText = 'Share';
  public shareDisabled = false;

  public get description() {
    const {description} = this.game;
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength - 5) + '...';
    }

    return description;
  }

  public onDownload() {
    alert('Ok');
  }

  public onShare() {
    this.shareText = 'Link copied';
    this.shareDisabled = true;
    copyTextToClipboard('link to game');
    setTimeout(() => {
      this.shareText = 'Share';
      this.shareDisabled = false;
    }, 2000)
  }
}
