import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { ComponentStore } from '@ngrx/component-store'
import { NgTableComponent } from './ng-table.component'
import {
  SearchInputModule,
  SortIconComponent,
  TableColumnComponent
} from './components'

@NgModule({
  declarations: [
    NgTableComponent,
    SortIconComponent,
    TableColumnComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    SearchInputModule,
    CdkScrollableModule,
    ScrollingModule
  ],
  providers: [ComponentStore],
  exports: [NgTableComponent]
})
export class NgTableModule { }
