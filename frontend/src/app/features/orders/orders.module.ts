import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersOverviewComponent } from './components/orders-overview/orders-overview.component';
import { OrdersDetailComponent } from './components/orders-detail/orders-detail.component';
import { OrderAcceptModalComponent } from './components/order-accept-modal/order-accept-modal.component';

@NgModule({
  declarations: [OrdersComponent, OrdersOverviewComponent, OrdersDetailComponent, OrderAcceptModalComponent],
  imports: [CommonModule, SharedModule, OrdersRoutingModule],
})
export class OrdersModule {}
