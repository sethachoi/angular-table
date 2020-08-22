import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchInputComponent } from './search-input.component'
import { ArrowIconComponent } from './components'
import { DropdownMenuDirective, DropdownDirective } from './directives'

@NgModule({
  declarations: [
    SearchInputComponent,
    ArrowIconComponent,
    DropdownDirective,
    DropdownMenuDirective
  ],
  imports: [CommonModule],
  providers: [],
  exports: [SearchInputComponent]
})
export class SearchInputModule { }
