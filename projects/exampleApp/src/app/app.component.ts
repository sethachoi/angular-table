import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { SortType } from 'ng-table'
import { PeopleService } from '../services'
import { PersonType } from '../types'
import { colDefs } from '../data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  people$: Observable<PersonType[]>
  loading$: Observable<boolean>
  colDefs = colDefs

  constructor(
    private peopleService: PeopleService,
    private store: Store<{ people: PersonType[], loading: boolean }>
  ) {
    this.people$ = store.pipe(select('people'))
    this.loading$ = store.pipe(select('loading'))
  }

  receiveFilters = (sortFilters: SortType[]) => {
    console.log(sortFilters)
    console.log(window.location)
    if (sortFilters[0]) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?myNewUrlQuery=' + sortFilters[0].key;
      window.history.pushState({path:newurl},'',newurl);
    }
  }

  fetchData = () => {
    this.peopleService.fetchPeople()
  }
}
