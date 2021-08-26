import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {capitalizeFirstLetter} from "@core/utils/capitalizeFirstLetter";
import {FilterComponentData} from "@core/models/games";

@Component({
  selector: 'app-games-list-filter',
  templateUrl: './games-list-filter.component.html',
  styleUrls: ['./games-list-filter.component.scss']
})
export class GamesListFilterComponent implements OnInit {
  @Output() filterOutput = new EventEmitter<FilterComponentData>();

  private readonly priceMap = new Map<number, {text: string, value: number}>([
    [0, {text: 'Free', value: 0}],
    [1, {text: '5$', value: 5}],
    [2, {text: '10$', value: 10}],
    [3, {text: '15$', value: 15}],
    [4, {text: '20$', value: 20}],
    [5, {text: '25$', value: 25}],
    [6, {text: '30$', value: 30}],
    [7, {text: '35$', value: 35}],
    [8, {text: '40$', value: 40}],
    [9, {text: '45$', value: 45}],
    [10, {text: '50$', value: 50}],
    [11, {text: '55$', value: 55}],
    [12, {text: '60$', value: 60}],
    [13, {text: 'Any price', value: -1}],
  ])

  public capitalizeFirstLetter = capitalizeFirstLetter;

  public priceControl = new FormControl(13);
  public priceText: string | undefined;
  public tagsList: {name: string}[] = [];
  public checkedTags: Set<string> = new Set<string>();

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.priceChange();
  }

  ngOnInit(): void {
    this.tagsList = this.activatedRoute.snapshot.data.tags;
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
