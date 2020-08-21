import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { TableStore, ColType } from './ng-table.store'

@Component({
  selector: 'ui-ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.scss'],
  providers: [TableStore]
})
export class NgTableComponent implements OnInit, OnDestroy {
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

  sortRules$ = this.tableStore.sortRules$
  items$ = this.tableStore.items$
  colDefs$ = this.tableStore.colDefs$
  colsCopy = []
  sortRules = []
  colDefSubscription
  sortRulesSubscription

  constructor(private readonly tableStore: TableStore) { }

  ngOnInit(): void {
    console.log('actually latest?')
    console.log(window.location)
    this.colDefSubscription = this.colDefs$.subscribe(data => this.colsCopy = [...data])
    this.sortRulesSubscription = this.sortRules$.subscribe(data => this.sortRules = data)
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
    console.log(event)
    console.log(this.colsCopy)
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
}
