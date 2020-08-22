import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { stateReducer, loadingReducer } from '../state'
import { NgTableModule } from 'ng-table'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { PeopleService } from '../services'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ people: stateReducer, loading: loadingReducer }),
    NgTableModule
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
