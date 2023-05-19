import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarCreationRequest, Cocktail } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { addBar, loadBar } from 'src/app/store/bar/bar.actions';
import {
  selectBarError,
  selectBarId,
  selectBarLoadedSuccessfully,
  selectBarLoadingStatus,
} from 'src/app/store/bar/bar.selectors';
import { loadOrders } from 'src/app/store/orders/orders.actions';
import { loadCocktails } from 'src/app/store/recipes/cocktails.actions';
import {
  selectCocktails,
  selectCocktailsLoadingStatus,
  selectSelectedCocktailsLoadingStatus,
} from 'src/app/store/recipes/cocktails.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);

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
  });

  public customOptions: OwlOptions = {
    loop: true,
    //autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  placeOrder(cocktail: Cocktail) {
    console.log(cocktail);
  }
  onBarCreationSubmit() {
    this.store.dispatch(addBar({ barCreationRequest: this.barCreationForm.value as BarCreationRequest }));
  }
  onLoginSubmit() {
    this.store.dispatch(loadBar({ barCode: this.loginForm.controls['barCode'].value }));
    this.selectBarId$.subscribe((barId: string) => {
      if (barId !== '0') {
        this.store.dispatch(loadOrders());
        this.store.dispatch(loadCocktails({}));
      }
    });
  }
}
