import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarCreationRequest, Cocktail } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { addBar, loadBar, setLoggedInUser } from 'src/app/store/bar/bar.actions';
import {
  selectBarError,
  selectBarId,
  selectBarLoadedSuccessfully,
  selectBarLoadingStatus,
  selectLoggedInUser,
} from 'src/app/store/bar/bar.selectors';
import { loadIngredientGroups } from 'src/app/store/ingredient-group/ingredient-group.actions';
import { loadIngredients } from 'src/app/store/ingredients/ingredients.actions';
import { addOrder } from 'src/app/store/orders/orders.actions';
import { loadCocktails } from 'src/app/store/recipes/cocktails.actions';
import { selectCocktails, selectCocktailsLoadingStatus } from 'src/app/store/recipes/cocktails.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);
  private subscriptions = new Subscription();

  public selectBarLoadingStatus$: Observable<boolean> = this.store.select(selectBarLoadingStatus);
  public selectCocktailContent$ = this.store.select(selectCocktails);
  public selectBarId$: Observable<string> = this.store.select(selectBarId);
  public selectBarLoadedSuccessfully$: Observable<boolean> = this.store.select(selectBarLoadedSuccessfully);
  public loading$: Observable<boolean> = this.store.select(selectBarLoadingStatus);
  public cocktailLoading$: Observable<boolean> = this.store.select(selectCocktailsLoadingStatus);
  public barCreationForm: FormGroup = this.formBuilder.group({
    barName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
    ownerName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
  });
  public error$: Observable<HttpErrorResponse | undefined> = this.store.select(selectBarError);
  public loginForm: FormGroup = this.formBuilder.group({
    barCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
    customerName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
  });

  ngOnInit(): void {
    this.subscriptions.add(
      this.selectBarId$.subscribe((barId: string) => {
        if (barId !== '0') {
          this.store.dispatch(loadIngredientGroups());
          this.store.dispatch(loadIngredients());
          this.store.dispatch(loadCocktails({ checkAvailability: true }));
        }
      })
    );
  }

  placeOrder(cocktail: Cocktail) {
    this.subscriptions.add(
      this.store.select(selectLoggedInUser).subscribe(user => {
        const orderCreationRequest: any = {
          cocktailId: cocktail.cocktailId,
          customerName: user,
          cocktailName: cocktail.cocktailName,
        };
        this.store.dispatch(addOrder({ order: orderCreationRequest }));
      })
    );
  }
  onBarCreationSubmit() {
    this.store.dispatch(addBar({ barCreationRequest: this.barCreationForm.value as BarCreationRequest }));
  }
  onLoginSubmit() {
    this.store.dispatch(loadBar({ barCode: this.loginForm.controls['barCode'].value }));
    this.store.dispatch(setLoggedInUser({ loggedInUser: this.loginForm.controls['customerName'].value }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
