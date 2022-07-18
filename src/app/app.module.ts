import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { FeaturesModule } from './features/features.module';
import { PrevEntryComponent } from './prev-entry/prev-entry.component';
import { WeekEntryComponent } from './week-entry/week-entry.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './network.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TimeTrackerComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    TimeEntryComponent,
    TimeTableComponent,
    PrevEntryComponent,
    WeekEntryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturesModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
