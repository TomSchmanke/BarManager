import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarCreationRequest } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addBar, loadBar } from 'src/app/store/bar/bar.actions';
import { BarState } from 'src/app/store/bar/bar.reducers';
import { selectBarError, selectBarLoadingStatus, selectBarState } from 'src/app/store/bar/bar.selectors';
import { loadOrders } from 'src/app/store/orders/orders.actions';
import { loadCocktails } from 'src/app/store/recipes/cocktails.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);
  public selectBarLoadingStatus$: Observable<boolean> = this.store.select(selectBarLoadingStatus);
  public barState$: Observable<BarState> = this.store.select(selectBarState);
  public barCreationForm: FormGroup = this.formBuilder.group({
    barName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
    ownerName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
  });
  public error$: Observable<HttpErrorResponse | undefined> = this.store.select(selectBarError);
  public loginForm: FormGroup = this.formBuilder.group({
    barCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
  });

  onBarCreationSubmit() {
    this.store.dispatch(addBar({ barCreationRequest: this.barCreationForm.value as BarCreationRequest }));
  }
  onLoginSubmit() {
    this.store.dispatch(loadBar({ barCode: this.loginForm.controls['barCode'].value }));
    this.barState$.subscribe((state: BarState) => {
      if (state.bar && state.bar?.barId) {
        this.store.dispatch(loadOrders());
        this.store.dispatch(loadCocktails({}));
      }
    });
  }
}
