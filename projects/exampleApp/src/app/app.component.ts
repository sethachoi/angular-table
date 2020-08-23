import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { SortType } from 'ng-table'
import { PeopleService, QueryFilterService } from '../services'
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
  sortFilters: SortType[] = []
  colDefs = colDefs

  constructor(
    private peopleService: PeopleService,
    private queryFilterService: QueryFilterService,
    private store: Store<{ people: PersonType[], loading: boolean }>
  ) {
    this.people$ = store.pipe(select('people'))
    this.loading$ = store.pipe(select('loading'))
    // we really only need to do this upon first load tbh;
    // we are snagging all the query params and matching them
    // with columns that actually exist on our table
    const validKeys = colDefs.map(item => item.key)
    this.sortFilters =
      [...this.queryFilterService.getQueryFilters().filter((item) => validKeys.includes(item.key))]
  }

  // table will emit filters at us, we need to pop it to service so we can add to url
  receiveFilters = (sortFilters: SortType[]) => {
    this.queryFilterService.applyQueryFilters(sortFilters)
  }

  // press butan
  fetchData = () => {
    this.peopleService.fetchPeople()
  }
}
