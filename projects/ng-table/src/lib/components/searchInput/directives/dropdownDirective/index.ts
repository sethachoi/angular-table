import { Directive, ElementRef, Inject, forwardRef, HostBinding, HostListener } from '@angular/core'

@Directive({
  selector: '[uiDropdownMenu]'
})
export class DropdownMenuDirective {
  constructor(@Inject(forwardRef(() => DropdownDirective)) public dropdown) {}
  @HostBinding('class.ng-dropdown-menu') menuClass = true

  // attaching showing class via our controlling directive's bool
  @HostBinding('class.showing')
  get isShowing(): boolean { return this.dropdown.isShowing() }

  // same with hiding (mostly useful for animation overrides)
  @HostBinding('class.hiding')
  get isHiding(): boolean { return !this.dropdown.isShowing() }
}

@Directive({
  selector: '[uiDropdown]'
})
export class DropdownDirective {
  showing = false
  constructor(private el: ElementRef) {}

  // click handler to toggle dropdown
  @HostListener('click')
  toggle = (): void => {
    this.showing = !this.showing
  }

  isShowing = (): boolean => {
    return this.showing
  }
}
