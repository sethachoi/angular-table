import { Directive, ElementRef, Inject, forwardRef, HostBinding, HostListener } from '@angular/core'

@Directive({
  selector: '[uiDropdownMenu]'
})
export class DropdownMenuDirective {
  constructor(@Inject(forwardRef(() => DropdownDirective)) public dropdown) {}
  @HostBinding('class.ng-dropdown-menu') menuClass = true
  @HostBinding('class.showing')
  get isShowing(): boolean { return this.dropdown.isShowing() }
  @HostBinding('class.hiding')
  get isHiding(): boolean { return !this.dropdown.isShowing() }
}

@Directive({
  selector: '[uiDropdown]'
})
export class DropdownDirective {
  showing = false
  constructor(private el: ElementRef) {}

  @HostListener('click')
  toggle = (): void => {
    this.showing = !this.showing
  }

  isShowing = (): boolean => {
    return this.showing
  }
}
