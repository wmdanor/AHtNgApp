import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output() query = new EventEmitter<string>();
  @Input() placeholder!: string;

  public input = new FormControl('');

  private inputSub: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
    this.inputSub = this.input.valueChanges
      .pipe(debounceTime(50))
      .subscribe((value: string) => this.query.emit(value));
  }

  ngOnDestroy(): void {
    this.inputSub?.unsubscribe();
  }
}
