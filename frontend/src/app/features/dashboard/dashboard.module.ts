import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, TableHeaderComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule, ReactiveFormsModule],
})
export class DashboardModule {}
