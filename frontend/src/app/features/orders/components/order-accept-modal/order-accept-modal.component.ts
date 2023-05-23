import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { Ingredient, IngredientGroup } from '@bar-manager/api';

@Component({
  selector: 'app-order-accept-modal',
  templateUrl: './order-accept-modal.component.html',
  styleUrls: ['./order-accept-modal.component.css'],
})
export class OrderAcceptModalComponent {
  @Input() nameOfItemToAccept = '';
  @Input() ingredientGroups: IngredientGroup[] = [];
  @Output()
  cancelDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() declineDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() acceptDialog: EventEmitter<Ingredient[]> = new EventEmitter();
}
