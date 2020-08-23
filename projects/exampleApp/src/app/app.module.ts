import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { stateReducer, loadingReducer } from '../state'
import { NgTableModule } from 'ng-table'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { PeopleService, QueryFilterService } from '../services'
import { queryServiceFactory } from '../factories'

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
  providers: [
    PeopleService,
    QueryFilterService,
    {
      provide: APP_INITIALIZER,
      useFactory: queryServiceFactory,
      deps: [QueryFilterService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
