import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cocktail, Ingredient, IngredientGroup } from '@bar-manager/api';

@Component({
  selector: 'app-order-accept-modal',
  templateUrl: './order-accept-modal.component.html',
  styleUrls: ['./order-accept-modal.component.css'],
})
export class OrderAcceptModalComponent implements OnInit, OnChanges {
  @Input() nameOfItemToAccept = '';
  @Input() ingredientGroups: IngredientGroup[] = [];
  @Input() cocktail!: Cocktail;
  @Output()
  cancelDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() declineDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() acceptDialog: EventEmitter<Ingredient[]> = new EventEmitter();

  private fb = inject(FormBuilder);
  ingredientsSelectForm?: FormGroup;

  ngOnInit() {
    this.ingredientsSelectForm = this.fb.group({
      selectedIngredients: this.fb.array([]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ingredientGroups']?.currentValue !== changes['ingredientGroups']?.previousValue) {
      this.ingredientGroups.forEach(ingredientGroup => {
        (<FormArray>this.ingredientsSelectForm?.get('selectedIngredients')).push(
          this.fb.group({
            selectedIngredient: [
              ingredientGroup ? ingredientGroup : '',
              Validators.compose([Validators.required, Validators.minLength(2)]),
            ],
          })
        );
      });
      this.ingredientsSelectForm?.updateValueAndValidity();
    }
  }

  getSelectedIngredientsFormArray() {
    return this.ingredientsSelectForm?.controls['selectedIngredients'] as FormArray;
  }

  changeIngredient(index: number, event: any) {
    (<FormArray>this.ingredientsSelectForm?.get('selectedIngredients'))
      .at(index)
      .get('selectedIngredient')
      ?.setValue(event.target.value.substring(event.target.value.indexOf(' ') + 1, event.target.value.length));
  }

  onSubmit() {
    const newIngredients: Ingredient[] = [];

    (<FormArray>this.ingredientsSelectForm?.get('selectedIngredients')).controls.forEach((item, index) => {
      const selectedIngredient = this.ingredientGroups[index].ingredients!.find(
        ingredient => ingredient.ingredientName === item.value.selectedIngredient
      );

      newIngredients.push({
        amount:
          selectedIngredient!.amount -
          this.cocktail.recipeIngredients!.find(
            ingredient => ingredient.ingredientGroupName === this.ingredientGroups[index].ingredientGroupName
          )!.amount,
        description: selectedIngredient!.description,
        ingredientId: selectedIngredient!.ingredientId,
        ingredientName: selectedIngredient!.ingredientName,
      });
    });
    this.acceptDialog.emit(newIngredients);
  }
}
