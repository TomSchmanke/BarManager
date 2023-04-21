import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { StandloneBarButtonDirective } from './directives/bar-button/bar-button.directive';
import { StandloneBarInputDirective } from './directives/bar-input/bar-input.directive';

@NgModule({
  declarations: [DeleteModalComponent],
  imports: [CommonModule, StandloneBarButtonDirective, StandloneBarInputDirective],
  exports: [DeleteModalComponent, StandloneBarButtonDirective, StandloneBarInputDirective],
})
export class SharedModule {}
