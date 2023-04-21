import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrdersTableCellComponent } from './components/orders-table-cell/orders-table-cell.component';

@NgModule({
  declarations: [OrdersComponent, OrdersTableCellComponent],
  imports: [CommonModule, SharedModule, OrdersRoutingModule],
})
export class OrdersModule {}
