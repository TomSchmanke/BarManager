import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarCreationRequest, BarCreationResponse, LoginResponse } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addBar, loadBar } from 'src/app/store/bar/bar.actions';
import { selectBarContent, selectBarError, selectBarLoadingStatus } from 'src/app/store/bar/bar.selectors';
import { loadOrders } from 'src/app/store/orders/orders.actions';
import { loadCocktails } from 'src/app/store/recipes/cocktails.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);
  public selectBarLoadingStatus$: Observable<boolean> = this.store.select(selectBarLoadingStatus);
  public barState$: Observable<BarCreationResponse | LoginResponse | undefined> = this.store.select(selectBarContent);
  public barCreationForm!: FormGroup;
  public error$: Observable<HttpErrorResponse | undefined> = this.store.select(selectBarError);
  public loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      barCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
    });
    this.barCreationForm = this.formBuilder.group({
      barName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      ownerName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
    });
  }
  onBarCreationSubmit() {
    this.store.dispatch(addBar({ barCreationRequest: this.barCreationForm.value as BarCreationRequest }));
  }
  onLoginSubmit() {
    this.store.dispatch(loadBar({ barCode: this.loginForm.controls['barCode'].value }));
    this.barState$.subscribe((bar: BarCreationResponse | LoginResponse | undefined) => {
      if (bar && bar?.barId) {
        this.store.dispatch(loadOrders({ barId: bar?.barId }));
        this.store.dispatch(loadCocktails({ barId: bar?.barId }));
      }
    });
  }
}
