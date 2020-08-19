import { Component, OnInit, Input } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'ui-ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.scss']
})
export class NgTableComponent implements OnInit {
  @Input()
  items = []

  @Input()
  colDefs = []

  @Input()
  primaryKey = 'id'

  sortRule = { key: 'id', direction: 'asc' }

  constructor() { }

  ngOnInit(): void {
    console.log('init')
  }

  sortBy = (colKey) => {
    const { key, direction } = this.sortRule
    if (colKey === key) {
      // if we are already sorting by this col asc,
      // toggle into desc
      if (direction === 'asc') {
        this.sortRule.direction = 'desc'
      } else {
        // if we are already sorting this col desc,
        // switch to default id asc order
        this.sortRule = {
          key: 'id',
          direction: 'asc'
        }
      }
    } else {
      // otherwise, switch rule to this col, asc order
      this.sortRule = {
        key: colKey,
        direction: 'asc'
      }
    }

    this.sortData()
  }

  sortData = () => {
    const { key, direction } = this.sortRule
    const returnVal = direction === 'asc' ? 1 : -1
    const newSortedData = this.items.sort((a, b) => (a[key] > b[key]) ? returnVal : -(returnVal))
    this.items = [...newSortedData]
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.colDefs, event.previousIndex, event.currentIndex)
  }
}
