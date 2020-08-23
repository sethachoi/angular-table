import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ColType } from '../../types'

@Component({
  selector: 'ui-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input()
  colDefs: ColType[]

  @Input()
  filterString: string

  @Input()
  filterCol: ColType | {}

  // used to emit searchstring
  @Output()
  valueUpdate: EventEmitter<Event> = new EventEmitter()

  // used to emit new col to search/filter by
  @Output()
  colUpdate: EventEmitter<ColType> = new EventEmitter()

  searchFilterChanged = (event) => {
    this.valueUpdate.emit(event)
  }

  updateFilterCol = (col: ColType) => {
    this.colUpdate.emit(col)
  }
}
