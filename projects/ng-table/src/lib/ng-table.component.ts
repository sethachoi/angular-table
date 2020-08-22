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

  constructor(private readonly tableStore: TableStore) { }

  ngOnInit(): void {
    this.colDefSubscription = this.colDefs$.subscribe(data => this.colsCopy = [...data])
    this.sortRulesSubscription = this.sortRules$.subscribe(data => {
      this.filterUpdate.emit(data)
      return this.sortRules = data
    })

    this.tableStore.setState(state => ({
      ...state,
      primaryKey: this.primaryKey
    }))
  }

  ngOnDestroy(): void {
    this.colDefSubscription.unsubscribe()
    this.sortRulesSubscription.unsubscribe()
  }

  sortBy = (colKey) => {
    this.tableStore.sortBy(colKey)
  }

  drop = (event: CdkDragDrop<any[]>): void => {
    const newArrayCopy = [...this.colsCopy]
    moveItemInArray(newArrayCopy, event.previousIndex, event.currentIndex)
    this.tableStore.setColDefs(newArrayCopy)
  }

  ruleDirection = (colKey: string): string => {
    const foundRule = this.sortRules.find(rule => rule.key === colKey)
    const direction = foundRule ? foundRule.direction : ''
    return direction
  }

  ruleIndex = (colKey: string): number => this.sortRules.findIndex(rule => rule.key === colKey) + 1

  updateFilterString = (event: Event) => {
    this.tableStore.setFilterString((event.target as HTMLInputElement).value)
  }

  updateFilterCol = (col: ColType) => {
    this.tableStore.setFilterCol(col)
  }

  maxHeightForViewport = (data: any[]): number => {
    if (data.length * ITEM_SIZE < this.maxHeight) {
      return data.length * ITEM_SIZE
    }
    return this.maxHeight
  }
}
