import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';

@NgModule({
  declarations: [StartComponent],
  imports: [CommonModule, SharedModule, StartRoutingModule],
})
export class StartModule {}
