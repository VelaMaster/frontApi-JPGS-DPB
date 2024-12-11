import { Component, EventEmitter, Output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.search.emit(inputValue);
  }
}
