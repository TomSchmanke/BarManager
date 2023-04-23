import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found-widget',
  templateUrl: './not-found-widget.component.html',
  styleUrls: ['./not-found-widget.component.css'],
})
export class NotFoundWidgetComponent {
  @Input() headline = '';
  @Input() message = '';
}
