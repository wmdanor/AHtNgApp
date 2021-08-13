import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {'class': 'min-vh-100 d-flex flex-column'}
})
export class AppComponent {
  title = 'AHtNgApp';
}
