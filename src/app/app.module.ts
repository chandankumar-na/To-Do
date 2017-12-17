import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app.component';
import {APP_ROUTES} from './app.routing';
import {AppService} from './services/app.service';
import {HttpModule} from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';

// Override Date object formatter
NguiDatetime.formatDate = (date: Date) : string => {
    //..... my own function that returns a string ....
    return date.toDateString();
};


// Override Date object parser
NguiDatetime.parseDate = (str: any): Date => {

  return new Date();
}
    
import { AuthGuard } from './auth-guard';
// import { AsyncLocalStorageModule } from 'angular-async-local-storage';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoListComponent,
  ],
  imports: [
    BrowserModule,
    // AsyncLocalStorageModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NguiDatetimePickerModule ,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [AppService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
