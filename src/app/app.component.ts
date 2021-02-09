import { Component } from '@angular/core';

@Component({
  selector: 'ecap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'starter';

  constructor() {}

  /**
   * Function to perform hello world
   * @param value is string
   * @returns the params value
   */
  helloWorld(value: number): number {
    return value;
  }
}
