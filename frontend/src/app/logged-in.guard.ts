import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { Observable, withLatestFrom } from 'rxjs';
import { selectBarLoadedSuccessfully } from './store/bar/bar.selectors';
import { BarState } from './store/bar/bar.reducers';

@Injectable()
export class LoggedInGuard {
  private store: Store = inject(Store);
  private state: State<BarState> = inject(State);
  private router: Router = inject(Router);
  private loggedInStatus = false;
  canActivate() {
    this.store.select(selectBarLoadedSuccessfully).subscribe(loggedInStatus => (this.loggedInStatus = loggedInStatus));
    if (this.loggedInStatus !== true) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
