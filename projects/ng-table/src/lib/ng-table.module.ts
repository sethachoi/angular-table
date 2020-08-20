import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgTableComponent } from './ng-table.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { ComponentStore } from '@ngrx/component-store'
import { SortIconComponent } from './components'

@NgModule({
  declarations: [NgTableComponent, SortIconComponent],
  imports: [CommonModule, DragDropModule],
  providers: [ComponentStore],
  exports: [NgTableComponent]
})
export class NgTableModule { }
