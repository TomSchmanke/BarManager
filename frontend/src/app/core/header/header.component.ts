import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, inject } from '@angular/core';
import { BarCreationResponse, LoginResponse } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBarContent } from 'src/app/store/bar/bar.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('onOff', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(300),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  showBurgerMenu = false;
  private store = inject(Store);
  barState$: Observable<LoginResponse | BarCreationResponse | undefined> = this.store.select(selectBarContent);
  toggleBurgerMenu() {
    this.showBurgerMenu = !this.showBurgerMenu;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 1024) {
      this.showBurgerMenu = false;
    }
  }
}
