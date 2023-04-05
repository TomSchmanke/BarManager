import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { IngredientsModule } from './features/ingredients/ingredients.module';
import { OrdersModule } from './features/orders/orders.module';
import { RecipesModule } from './features/recipes/recipes.module';
import { StartModule } from './features/start/start.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as fromBarReducer from './store/bar/bar.reducers'
import * as fromIngredientsReducer from './store/ingredients/ingredients.reducers'
import * as fromRecipesReducer from './store/recipes/recipes.reducers'
import { BarEffects } from './store/bar/bar.effects';
import { IngredientsEffects } from './store/ingredients/ingredients.effects';
import { RecipesEffects } from './store/recipes/recipes.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    DashboardModule,
    IngredientsModule,
    OrdersModule,
    RecipesModule,
    StartModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreModule.forFeature(fromBarReducer.featureKey, fromBarReducer.reducer),
    StoreModule.forFeature(fromIngredientsReducer.featureKey, fromIngredientsReducer.reducer),
    StoreModule.forFeature(fromRecipesReducer.featureKey, fromRecipesReducer.reducer),
    EffectsModule.forFeature([BarEffects, IngredientsEffects, RecipesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
