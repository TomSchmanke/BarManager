import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, ClipboardModule, MatTooltipModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
