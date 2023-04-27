import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { StandloneBarButtonDirective } from './directives/bar-button/bar-button.directive';
import { StandloneBarInputDirective } from './directives/bar-input/bar-input.directive';
import { NotFoundWidgetComponent } from './components/not-found-widget/not-found-widget.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [DeleteModalComponent, NotFoundWidgetComponent, LoadingSpinnerComponent],
  imports: [CommonModule, StandloneBarButtonDirective, StandloneBarInputDirective],
  exports: [
    DeleteModalComponent,
    StandloneBarButtonDirective,
    StandloneBarInputDirective,
    NotFoundWidgetComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
