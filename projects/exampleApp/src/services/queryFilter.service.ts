import { Injectable } from '@angular/core'
import { SortType } from 'ng-table'

@Injectable({
  providedIn: 'root'
})
export class QueryFilterService {
  private sortFilters: SortType[] = []
  constructor() {}

  // this will convert our sort obj to push a querystring to window url
  applyQueryFilters = async (filterItems: SortType[]) => {
    this.setQueryFilter(filterItems)
    // sending back empty filters is a valid new state
    let newUrl = window.location.protocol
      + '//' + window.location.host + window.location.pathname

    if (filterItems.length) {
      const params = new URLSearchParams()
      filterItems.forEach(filter => {
        params.set(filter.key, filter.direction)
      })
      newUrl = `${newUrl}?${params.toString()}`
    }

    window.history.pushState({path: newUrl}, '', newUrl)
  }

  // we also will need to convert our URL query params into digestible SortTypes
  decodeQueryFilters = (): SortType[] => {
    const params = new URLSearchParams(window.location.search)
    const newSortFilters = []
    params.forEach((value, key) => {
      newSortFilters.push({ key, direction: value })
    })
    this.setQueryFilter(newSortFilters)
    return newSortFilters
  }

  private setQueryFilter = (newFilters: SortType[]) => {
    this.sortFilters = [...newFilters]
  }

  // public api
  getQueryFilters = (): SortType[] => {
    return this.sortFilters as SortType[]
  }
}
