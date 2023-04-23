import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAcceptModalComponent } from './order-accept-modal.component';

describe('OrderAcceptModalComponent', () => {
  let component: OrderAcceptModalComponent;
  let fixture: ComponentFixture<OrderAcceptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAcceptModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAcceptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
