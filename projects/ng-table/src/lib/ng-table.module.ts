import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { ComponentStore } from '@ngrx/component-store'
import { NgTableComponent } from './ng-table.component'
import { SortIconComponent, TableColumnComponent } from './components'

@NgModule({
  declarations: [NgTableComponent, SortIconComponent, TableColumnComponent],
  imports: [CommonModule, DragDropModule],
  providers: [ComponentStore],
  exports: [NgTableComponent]
})
export class NgTableModule { }
