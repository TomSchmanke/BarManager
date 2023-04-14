import { Component, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

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
