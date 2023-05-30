import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-order-accept-modal',
  templateUrl: './order-accept-modal.component.html',
  styleUrls: ['./order-accept-modal.component.css'],
})
export class OrderAcceptModalComponent {
  @Input() nameOfItemToAccept = '';
  @Output() cancelDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() declineDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() acceptDialog: EventEmitter<boolean> = new EventEmitter();

}
