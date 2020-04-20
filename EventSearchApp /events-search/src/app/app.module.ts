import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,MatIconModule,MatCardModule,MatButtonModule,MatProgressSpinnerModule } from '@angular/material';
import { BackButtonComponent } from './back-button/back-button.component';
import { ChartViewComponent } from './chart-view/chart-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventListComponent,
    BackButtonComponent,
    ChartViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
