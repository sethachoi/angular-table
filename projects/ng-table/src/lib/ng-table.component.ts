import { Component, OnInit, Input, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { TableStore } from './ng-table.store'
import { ColType, SortType } from './types'

const ITEM_SIZE = 34

@Component({
  selector: 'ui-ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.scss'],
  providers: [TableStore]
})
export class NgTableComponent implements OnInit, OnDestroy {
  // direct inputs
  @Input()
  set items(value: any[]) {
    this.tableStore.setItems(value)
    this.tableStore.setDefaultItems(value)
  }

  @Input()
  set colDefs(value: ColType[]) {
    this.tableStore.setColDefs(value)
  }

  @Input()
  primaryKey = 'id'

  @Input()
  loading = false

  @Input()
  maxHeight = 350

  @Input()
  initialFilters: SortType[] = []

  @Output()
  filterUpdate: EventEmitter<SortType[]> = new EventEmitter()

  // stuff from store/state
  sortRules$ = this.tableStore.sortRules$
  items$ = this.tableStore.items$
  colDefs$ = this.tableStore.colDefs$
  filterString$ = this.tableStore.filterString$
  filterCol$ = this.tableStore.filterCol$

  colsCopy = []
  sortRules = []

  colDefSubscription
  sortRulesSubscription

  constructor(private readonly tableStore: TableStore) {}

  ngOnInit(): void {
    this.colDefSubscription = this.colDefs$.subscribe(data => this.colsCopy = [...data])
    // make sure initial filters from query params
    // are applied before emitting state changes
    if (this.initialFilters.length) {
      this.tableStore.setSortRules(this.initialFilters)
      this.sortRules = [...this.initialFilters]
    }

    this.sortRulesSubscription = this.sortRules$.subscribe(data => {
      this.filterUpdate.emit(data)
      return this.sortRules = data
    })

    this.tableStore.setState(state => ({
      ...state,
      primaryKey: this.primaryKey
    }))
  }

  // we're gonna wanna unhook those subscriptions
  ngOnDestroy(): void {
    this.colDefSubscription.unsubscribe()
    this.sortRulesSubscription.unsubscribe()
  }

  // handler for when column is clicked to add a sorting rule
  sortBy = (colKey) => {
    this.tableStore.sortBy(colKey)
  }

  // dropping handler for cdkDragDrop
  drop = (event: CdkDragDrop<any[]>): void => {
    // using a copy of columns subscription to simplify moveItemInArray usage
    const newArrayCopy = [...this.colsCopy]
    moveItemInArray(newArrayCopy, event.previousIndex, event.currentIndex)
    this.tableStore.setColDefs(newArrayCopy)
  }

  // used to find the direction of a col sort rule, to show asc/desc icon
  ruleDirection = (colKey: string): string => {
    const foundRule = this.sortRules.find(rule => rule.key === colKey)
    const direction = foundRule ? foundRule.direction : ''
    return direction
  }

  // used to synchronize data between table data and column rules/sorting
  ruleIndex = (colKey: string): number => this.sortRules.findIndex(rule => rule.key === colKey) + 1

  // used to update the search string, bubbles to state for heavy lifting there
  updateFilterString = (event: Event) => {
    this.tableStore.setFilterString((event.target as HTMLInputElement).value)
  }

  // updates filter rule to use in tandem with filter/search string
  updateFilterCol = (col: ColType) => {
    this.tableStore.setFilterCol(col)
  }

  // this and createHeighObj are used for dynamic styling wizardry
  // to make sure that A) cdk virtual scroller works and B) we can have nice anims
  maxHeightForViewport = (data: any[]): number => {
    if (data.length * ITEM_SIZE < this.maxHeight) {
      return data.length * ITEM_SIZE
    }
    return this.maxHeight
  }

  // see above
  createHeightObj = (data: any[]) => {
    if (this.loading || !data.length) {
      return {}
    }
    return {
      'max-height.px': this.maxHeightForViewport(data)
    }
  }
}
