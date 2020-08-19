import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTableComponent } from './ng-table.component'
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [NgTableComponent],
  imports: [CommonModule, DragDropModule],
  providers: [],
  exports: [NgTableComponent]
})
export class NgTableModule { }
