import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StartRoutingModule } from './start-routing.module';

@NgModule({
  declarations: [StartComponent],
  imports: [CommonModule, SharedModule, StartRoutingModule],
})
export class StartModule {}
