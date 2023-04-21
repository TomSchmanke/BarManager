import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTableCellComponent } from './orders-table-cell.component';

describe('OrdersTableCellComponent', () => {
  let component: OrdersTableCellComponent;
  let fixture: ComponentFixture<OrdersTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersTableCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
