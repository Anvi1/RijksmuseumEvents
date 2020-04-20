import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { EventListComponent } from './event-list.component';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let eventList: EventListComponent;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let myService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ApiService, EventListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    myService = TestBed.inject(ApiService);
    eventList = TestBed.inject(EventListComponent);
  });

  // it('should be created', () => {
  //   const eventList = fixture.debugElement.componentInstance;
  //   expect(eventList).toBeTruthy();
  //  });


  // it('it should format date', () => {
  //   var date = new Date('2020-04-15');
  //   var formattedDate = eventList.formatDate(date);
  //   console.log(date);
  //   console.log(formattedDate);
  //   //expect(date).toBe(formattedDate);
  // });

  
});
