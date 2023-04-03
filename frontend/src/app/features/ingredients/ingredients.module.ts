import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsComponent } from './ingredients.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngredientsRoutingModule } from './ingredients-routing.module';



@NgModule({
  declarations: [
    IngredientsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IngredientsRoutingModule
  ]
})
export class IngredientsModule { }
