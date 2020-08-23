import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { Observable } from 'rxjs'
import { ColType, SortType } from './types'

export interface TableState {
  items: any[]
  colDefs: ColType[]
  primaryKey: string
  defaultItems: any[]
  sortRules: SortType[]
  filterCol: ColType | {}
  filterString: string
}

@Injectable()
export class TableStore extends ComponentStore<TableState> {
  constructor() {
    super({
      items: [],
      colDefs: [],
      primaryKey: 'id',
      defaultItems: [],
      sortRules: [],
      filterCol: {},
      filterString: ''
    })
  }

  // the bread and butter, our table's data
  readonly items$: Observable<any[]> = this.select(state => {
    const { filterString, filterCol, items } = state

    // we return the whole set if no filters, apply filters if we have them
    if (!filterString || !(filterCol as ColType).key) {
      return items
    } else {
      return this.filterItems(filterString, filterCol as ColType, items)
    }
  })
  // public observables
  readonly colDefs$: Observable<ColType[]> = this.select(state => state.colDefs)
  readonly sortRules$: Observable<SortType[]> = this.select(state => state.sortRules)
  readonly filterString$: Observable<string> = this.select(state => state.filterString)
  readonly filterCol$: Observable<ColType | {}> = this.select(state => state.filterCol)

  // public full-replace setters
  readonly setFilterString = this.updater((state, newString: string) => ({
    ...state,
    filterString: newString
  }))

  readonly setFilterCol = this.updater((state, newCol: ColType) => ({
    ...state,
    filterCol: { ...newCol }
  }))

  readonly setColDefs = this.updater((state, newCols: ColType[]) => ({
    ...state,
    colDefs: newCols
  }))

  readonly setSortRules = this.updater((state, newSort: SortType[]) => ({
    ...state,
    sortRules: [...newSort]
  }))

  readonly setItems = this.updater((state, newItems: any[]) => {
    const { sortRules } = state

    // when new data comes in, be sure to resort the items
    // in case we have sorting rules that need applying
    const newSortedData = this.resortItems(newItems, sortRules)
    return {
      ...state,
      items: newSortedData
    }
  })

  readonly setDefaultItems = this.updater((state, newDefaults: any[]) => ({
    ...state,
    defaultItems: [...newDefaults]
  }))

  // public method to apply a sort rule simply by passing the colkey
  // (for example, 'id' or 'name')
  readonly sortBy = this.updater((state, colKey: string) => {
    const { sortRules, items, defaultItems } = state
    const ruleIndex = sortRules.findIndex(rule => rule.key === colKey)
    let newRules = []
    let newRule = {}
    // case: we are creating a new rule wow
    if (ruleIndex === -1) {
      newRule = {
        key: colKey,
        direction: 'asc'
      }
      newRules = [...sortRules, newRule]
    } else if (sortRules[ruleIndex].direction === 'asc') {
      // if there exists a rule for this key, and it is asc, swap to desc
      newRule = {
        key: colKey,
        direction: 'desc'
      }
      newRules = [...sortRules]
      newRules[ruleIndex] = newRule
    } else {
      // if the existing rule is desc, we want to just remove the rule altogether
      newRules = [...sortRules.filter(rule => rule.key !== colKey)]
    }

    // if we have just removed all of our sorting rules, let's bring it back to the default view,
    // AKA the order of data we got from the API
    const newItems = newRules.length === 0 ? [...defaultItems] : this.resortItems(items, newRules)
    return {...state, sortRules: newRules, items: newItems}
  })

  // start sorting recursion algo
  private resortItems = (itemsToSort: any[], sortRuleList: SortType[]): any[] =>
    [...itemsToSort].sort((a, b) => this.compareItems(a, b, sortRuleList, 0))

  private compareItems = (a: any, b: any, rules: SortType[], ruleIndex: number): number => {
    // if these two objects are identical across all rule filters,
    // we can just return order arbitrarily
    if (ruleIndex >= rules.length) {
      return 1
    }
    const currentRule = rules[ruleIndex]
    const returnVal = currentRule.direction === 'asc' ? 1 : -1

    // if the compare values are the same, move on to the next sort rule
    // to deal with the tiebreaker, ad infinitum
    if (a[currentRule.key] === b[currentRule.key]) {
      const nextIndex = ruleIndex + 1
      return this.compareItems(a, b, rules, nextIndex)
    }
    return a[currentRule.key] > b[currentRule.key] ? returnVal : -(returnVal)
  }

  // here we apply a filterString + filterCol ruleset
  private filterItems = (filterString: string, filterCol: ColType, items: any[]) =>
    items.filter(item => {
      const testValue = item[filterCol.key]
      // we are looking for the exact number if given a number type
      if (filterCol.type === 'number') {
        return testValue === parseInt(filterString, 10)
      } else {
        // if we are given a string type, look to see if that order of chars exists
        // anywhere each entry, disregarding spacing or letter case
        return testValue.replace(/[^0-9a-z]/gi, '')
          .toLowerCase()
          .includes(filterString.replace(/[^0-9a-z]/gi, '').toLowerCase())
      }
    })
}
