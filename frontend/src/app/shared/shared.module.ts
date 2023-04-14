import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    DeleteModalComponent
  ],
  imports: [CommonModule],
  exports: [DeleteModalComponent]
})
export class SharedModule {}
