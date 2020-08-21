import { Component, Input, ElementRef, ViewChild } from '@angular/core'
import { CdkDragMove } from '@angular/cdk/drag-drop'
import type { ColType } from '../../ng-table.store'

@Component({
  selector: 'ui-table-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.scss']
})
export class TableColumnComponent {
  @ViewChild('colContainer') colContainer: ElementRef

  @Input()
  col: ColType

  @Input()
  sortBy: (key: string) => void

  get colContainerElement(): HTMLElement {
    return this.colContainer.nativeElement
  }

  dragMove = ($event: CdkDragMove<any>) => {
    // default flex def to 1 if not provided
    const currentFlex = this.col.flex || 1

    // getting the container's right side abs value, and width
    const { right, width } = this.colContainerElement.getBoundingClientRect()
    const event = $event.event as MouseEvent

    // get mouse's absolute x value, subtract container's right's abs x val
    const distanceTraveled = event.x - right

    // calc new width based on that delta
    const newWidth = width + distanceTraveled

    // calculate a ratio and apply it to the existing flex def
    // because we're using flex and not raw pixel width vals
    const widthRatio = newWidth / width
    const newFlex = currentFlex * widthRatio

    // pass it back to the obj so we can use it elsewhere
    // probably can do this cleaner? TODO emit event maybe
    this.col.flex = Math.max(Math.min(newFlex, 3), 0.25)
  }
}
