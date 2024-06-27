import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MealsModule } from './meals/meals.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MealsModule,
    MaterialModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
