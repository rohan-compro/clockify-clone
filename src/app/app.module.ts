import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TimeTrackerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
