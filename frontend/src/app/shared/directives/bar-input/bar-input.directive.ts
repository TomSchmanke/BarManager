import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'input[barInput]',
  exportAs: 'barInput',
  standalone: true,
})
export class StandloneBarInputDirective {
  @Input('inputType') inputType: 'default-input' = 'default-input';
  @HostBinding('class')
  public selector = this.inputType;

  ngOnInit() {
    this.selector = this.inputType;
  }
}
