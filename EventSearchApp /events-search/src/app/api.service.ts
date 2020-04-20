import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  Observable,throwError, forkJoin, of} from 'rxjs';
import { retry, catchError, concatMap, map } from 'rxjs/operators';


@Injectable({  
	providedIn: 'root'  
})  
export class ApiService {
	
	constructor(private httpClient: HttpClient) { }

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

	public datesArr(stDate,ltDate){
		var eventDateFrmt = [];
		var num = Math.round((ltDate - stDate)/(1000*60*60*24));
		for(var i=0;i<=num;i++){
			var dateVar = this.formatDate(stDate);
			eventDateFrmt.push(dateVar);
			stDate = new Date(stDate);
			stDate = stDate.setDate(stDate.getDate() + 1);
		  }
		  return eventDateFrmt;
	}


	handleError(error: HttpErrorResponse) {
		let errorMessage = 'Unknown error!';
		if (error.error instanceof ErrorEvent) {
		  // Client-side errors
		  errorMessage = `Error: ${error.error.message}`;
		  window.alert(errorMessage);
		  return throwError(errorMessage);
		} else {
		  // Server-side errors
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
			window.alert(errorMessage);
			return throwError(errorMessage);
		  
		}
		
	  }
	
	  public get(eventDate){  
		const DATA_URL = "https://www.rijksmuseum.nl/api/nl/agenda/" + eventDate + "?key=yW6uq3BV&format=json";
		return this.httpClient.get(DATA_URL).pipe(catchError(this.handleError));
	  }

	  

	  public getMultipleData(startDate,lastDateVal){
		var dates = this.datesArr(startDate,lastDateVal);
		return forkJoin(
			this.httpClient.get("https://www.rijksmuseum.nl/api/nl/agenda/" + dates[0] + "?key=yW6uq3BV&format=json").pipe(map((res) => res), catchError(e => of(dates[0]))),
			this.httpClient.get("https://www.rijksmuseum.nl/api/nl/agenda/" + dates[1] + "?key=yW6uq3BV&format=json") .pipe(map((res) => res), catchError(e => of(dates[1]))),
			this.httpClient.get("https://www.rijksmuseum.nl/api/nl/agenda/" + dates[2] + "?key=yW6uq3BV&format=json") .pipe(map((res) => res), catchError(e => of(dates[2]))),
			this.httpClient.get("https://www.rijksmuseum.nl/api/nl/agenda/" + dates[3] + "?key=yW6uq3BV&format=json") .pipe(map((res) => res), catchError(e => of(dates[3]))),
			this.httpClient.get("https://www.rijksmuseum.nl/api/nl/agenda/" + dates[4] + "?key=yW6uq3BV&format=json") .pipe(map((res) => res), catchError(e => of(dates[4]))),
			this.httpClient.get("https://www.rijksmuseum.nl/api/nl/agenda/" + dates[5] + "?key=yW6uq3BV&format=json") .pipe(map((res) => res), catchError(e => of(dates[5]))),
			this.httpClient.get("https://www.rijksmuseum.nl/api/nl/agenda/" + dates[6] + "?key=yW6uq3BV&format=json") .pipe(map((res) => res), catchError(e => of(dates[6]))),
		  );
		
		//return forkJoin(urlArr).pipe(catchError(error => of(error)));
	}
	  
}