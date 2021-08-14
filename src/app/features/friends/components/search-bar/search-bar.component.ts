import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() query = new EventEmitter<string>();
  public input = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  search(): void {
    this.query.emit(this.input.value);
  }
}
