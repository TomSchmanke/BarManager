import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent, TableHeaderComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule, ReactiveFormsModule],
})
export class DashboardModule {}
