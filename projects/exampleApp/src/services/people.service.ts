import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { PersonType } from '../types'
import { getData } from '../api'
import { setData, setLoading } from '../state'

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private store: Store<PersonType[]>) {}

  // makes a call to our super fake API
  fetchPeople = async () => {
    this.store.dispatch(setLoading({ loading: true }))
    const request = await getData()
    this.store.dispatch(setData(request))
    this.store.dispatch(setLoading({ loading: false }))
  }
}
