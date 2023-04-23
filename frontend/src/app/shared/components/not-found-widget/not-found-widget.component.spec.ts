import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundWidgetComponent } from './not-found-widget.component';

describe('NotFoundWidgetComponent', () => {
  let component: NotFoundWidgetComponent;
  let fixture: ComponentFixture<NotFoundWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
