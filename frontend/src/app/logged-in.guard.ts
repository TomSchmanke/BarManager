import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBarLoadedSuccessfully } from './store/bar/bar.selectors';

@Injectable()
export class LoggedInGuard {
  private store: Store = inject(Store);
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
