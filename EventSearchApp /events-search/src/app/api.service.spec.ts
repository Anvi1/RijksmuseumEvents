import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let myService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ApiService]
    });
    //Instantaites HttpClient, HttpTestingController and EmployeeService
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    myService = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });
  
  it('should be created', () => {
    expect(myService).toBeTruthy();
   });

   it('should have get function', () => {
    expect(myService.get).toBeTruthy();
   });

   it('should have getMultipleData function', () => {
    expect(myService.getMultipleData).toBeTruthy();
   });

   
  
});
