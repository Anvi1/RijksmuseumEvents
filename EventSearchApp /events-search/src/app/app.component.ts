import { Component } from '@angular/core';
import { BackButtonService } from './back-button.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 public title:'Museum';
  constructor(
    public back: BackButtonService
    ) { }

  ngOnInit() {
    this.back.hide();
  }
}
