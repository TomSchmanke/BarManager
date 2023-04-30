import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBar } from 'src/app/store/bar/bar.actions';
import { selectBarContent, selectBarLoadingStatus, selectBarState } from 'src/app/store/bar/bar.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private store = inject(Store);

  public selectBarLoadingStatus$!: Observable<boolean>;
  public barState$!: Observable<any>;

  ngOnInit() {
    this.store.dispatch(loadBar({ barCode: '213123' }));
    this.barState$ = this.store.select(selectBarContent);
    this.selectBarLoadingStatus$ = this.store.select(selectBarLoadingStatus);
  }
}
