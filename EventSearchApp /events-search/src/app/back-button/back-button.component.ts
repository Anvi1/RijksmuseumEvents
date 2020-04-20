import { Component, OnInit } from '@angular/core';
import { BackButtonService } from '../back-button.service';
import {Location} from '@angular/common';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  constructor( public back: BackButtonService, private _location: Location ) { }

  ngOnInit(): void {
    
  }

  goBack() {
    this.back.hide();
    this._location.back();
  }

}
