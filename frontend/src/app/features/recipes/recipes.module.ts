import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [RecipesComponent],
  imports: [CommonModule, SharedModule, RecipesRoutingModule],
})
export class RecipesModule {}
