import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { KeywordManagementComponent } from './keyword-management/keyword-management.component';
import { FbaCalculatorComponent } from './fba-calculator/fba-calculator.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KeywordManagementComponent,
    FbaCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
