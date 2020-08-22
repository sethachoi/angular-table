import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-arrow-icon',
  templateUrl: './arrow-icon.component.html',
  styleUrls: ['./arrow-icon.component.scss']
})
export class ArrowIconComponent {
  @Input()
  direction = 'asc'
}
