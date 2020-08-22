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

  readonly items$: Observable<any[]> = this.select(state => {
    const { filterString, filterCol, items } = state

    if (!filterString || !(filterCol as ColType).key) {
      return items
    } else {
      return this.filterItems(filterString, filterCol as ColType, items)
    }
  })
  readonly colDefs$: Observable<ColType[]> = this.select(state => state.colDefs)
  readonly sortRules$: Observable<SortType[]> = this.select(state => state.sortRules)
  readonly filterString$: Observable<string> = this.select(state => state.filterString)
  readonly filterCol$: Observable<ColType | {}> = this.select(state => state.filterCol)

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

  readonly setItems = this.updater((state, newItems: any[]) => {
    const { sortRules } = state

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
      newRule = {
        key: colKey,
        direction: 'desc'
      }
      newRules = [...sortRules]
      newRules[ruleIndex] = newRule
    } else {
      newRules = [...sortRules.filter(rule => rule.key !== colKey)]
    }

    const newItems = newRules.length === 0 ? [...defaultItems] : this.resortItems(items, newRules)
    return {...state, sortRules: newRules, items: newItems}
  })

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

  private filterItems = (filterString: string, filterCol: ColType, items: any[]) =>
    items.filter(item => {
      const testValue = item[filterCol.key]
      if (filterCol.type === 'number') {
        return testValue === parseInt(filterString, 10)
      } else {
        return testValue.replace(/[^0-9a-z]/gi, '')
          .toLowerCase()
          .includes(filterString.replace(/[^0-9a-z]/gi, '').toLowerCase())
      }
    })
}
