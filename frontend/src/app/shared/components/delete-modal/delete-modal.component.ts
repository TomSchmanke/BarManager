import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  @Input() a11yModalId = '';
  @Input() nameOfItemToDelete = '';
  @Output() cancelDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() declineDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() acceptDialog: EventEmitter<boolean> = new EventEmitter();

}
