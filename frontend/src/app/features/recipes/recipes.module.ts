import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesOverviewComponent } from './pages/recipes-overview/recipes-overview.component';
import { RecipesEditComponent } from './pages/recipes-edit/recipes-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RecipesOverviewComponent, RecipesEditComponent],
  imports: [CommonModule, SharedModule, RecipesRoutingModule, ReactiveFormsModule],
})
export class RecipesModule {}
