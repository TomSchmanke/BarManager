import { Directive, HostBinding, Input, OnInit } from '@angular/core';
@Directive({
  selector: 'button[barButton]',
  exportAs: '[barButton]',
  standalone: true,
})
export class StandloneBarButtonDirective implements OnInit {
  @Input('buttonType') buttonType: 'square' | 'round' | 'edit' | 'delete' = 'square';
  @HostBinding('class')
  public selector: string = 'square-button';

  ngOnInit() {
    this.selector = this.buttonType.concat('-button');
  }
}
