import { Component, OnInit, Input } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { TableStore, SortType, ColType } from './ng-table.store'

@Component({
  selector: 'ui-ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.scss'],
  providers: [TableStore]
})
export class NgTableComponent implements OnInit {
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

  constructor(private readonly tableStore: TableStore) { }

  ngOnInit(): void {
    console.log('actually latest?')
    this.colDefs$.subscribe(data => this.colsCopy = [...data])
    this.sortRules$.subscribe(data => this.sortRules = data)
    this.tableStore.setState(state => ({
      ...state,
      primaryKey: this.primaryKey
    }))
  }

  sortBy = (colKey) => {
    this.tableStore.sortBy(colKey)
  }

  drop = (event: CdkDragDrop<any[]>): void => {
    moveItemInArray(this.colsCopy, event.previousIndex, event.currentIndex)
    this.tableStore.setColDefs(this.colsCopy)
  }

  ruleDirection = (colKey: string): string => {
    const foundRule = this.sortRules.find(rule => rule.key === colKey)
    const direction = foundRule ? foundRule.direction : ''
    return direction
  }

  ruleIndex = (colKey: string): number => this.sortRules.findIndex(rule => rule.key === colKey) + 1
}
