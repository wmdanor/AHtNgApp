import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {capitalizeFirstLetter} from "@core/utils/capitalizeFirstLetter";
import {FilterComponentData} from "@core/models/games";
import {pricesRangeMap} from "@/features/games/constansts/pricesRange";

@Component({
  selector: 'app-games-list-filter',
  templateUrl: './games-list-filter.component.html',
  styleUrls: ['./games-list-filter.component.scss']
})
export class GamesListFilterComponent implements OnInit {
  @Output() filterOutput = new EventEmitter<FilterComponentData>();

  private readonly priceMap = pricesRangeMap;

  public capitalizeFirstLetter = capitalizeFirstLetter;

  public priceControl = new FormControl(13);
  public priceText: string | undefined;
  public tagsList: string[] = [];
  public checkedTags: Set<string> = new Set<string>();

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.priceChange();
  }

  ngOnInit(): void {
    this.tagsList = this.activatedRoute.snapshot.data.tags
      .map((tag: {name: string}) => tag.name).sort();
  }

  priceChange() {
    this.priceText = this.priceMap.get(this.priceControl.value)?.text;
    this.emitChanges();
  }

  tagToggled(target: any) {
    const {checked, value} = target as HTMLInputElement;
    if (checked) {
      this.checkedTags.add(value);
    } else {
      this.checkedTags.delete(value);
    }
    this.emitChanges()
  }

  private emitChanges() {
    this.filterOutput.emit({
      maxPrice: this.priceMap.get(this.priceControl.value)?.value,
      tags: Array.from(this.checkedTags),
    });
  }
}
