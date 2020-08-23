import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-arrow-icon',
  templateUrl: './arrow-icon.component.html'
})
export class ArrowIconComponent {
  @Input()
  direction = 'asc'
}
