import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BackButtonService } from '../back-button.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events = [];
  eventDate;
  eventDateFrmt;
  noData = false;
  
  constructor(
    private apiService: ApiService,
    public back: BackButtonService
    ) { }
  
  public formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

apiCall(dateVal){
  this.eventDateFrmt = this.formatDate(dateVal);
	this.apiService.get(this.eventDateFrmt).subscribe((data: any[])=>{   
      this.events = data["options"];
      this.noData = (this.events.length == 0) ? true : false;
	}) 
}

ngOnInit() {
  this.back.show();
  var date = new Date();
  this.eventDate = date.setDate(date.getDate() + 1);
  this.apiCall(this.eventDate); 
}

next(selectedDate){ 
  selectedDate = new Date(selectedDate);
  selectedDate = selectedDate.setDate(selectedDate.getDate() + 1);  
  this.eventDate =  selectedDate;
  this.apiCall(selectedDate);
}  

previous(selectedDate){ 
  selectedDate = new Date(selectedDate);
  selectedDate = selectedDate.setDate(selectedDate.getDate() - 1);  
  this.eventDate =  selectedDate;
  this.apiCall(selectedDate);
} 

}
