/* eslint-disable @angular-eslint/no-input-rename */
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[barInput]',
  exportAs: 'barInput',
  standalone: true,
})
export class StandloneBarInputDirective {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  @Input('inputType') inputType: 'default-input' = 'default-input';
  @HostBinding('class')
  public selector = this.inputType;

  ngOnInit() {
    this.selector = this.inputType;
  }
}
