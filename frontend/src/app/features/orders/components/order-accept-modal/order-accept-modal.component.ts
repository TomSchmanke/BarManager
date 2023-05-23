import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient, IngredientGroup } from '@bar-manager/api';

@Component({
  selector: 'app-order-accept-modal',
  templateUrl: './order-accept-modal.component.html',
  styleUrls: ['./order-accept-modal.component.css'],
})
export class OrderAcceptModalComponent implements OnChanges {
  @Input() nameOfItemToAccept = '';
  @Input() ingredientGroups: IngredientGroup[] = [];
  @Output()
  cancelDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() declineDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() acceptDialog: EventEmitter<Ingredient[]> = new EventEmitter();

  private fb = inject(FormBuilder);
  public form!: FormGroup;
  ngOnChanges(changes: SimpleChanges): void {
    if (this.ingredientGroups != null) {
      this.form = this.fb.nonNullable.group({
        ingredientGroupList: this.fb.nonNullable.array(
          this.ingredientGroups.map(ingredientGroup => {
            this.fb.control({
              ingredient: ingredientGroup.ingredients,
            });
          })
        ),
      });
    }
  }

  changeIngredient(event: any) {
    console.log(event);
  }
}
