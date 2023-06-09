import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { IngredientsModule } from './features/ingredients/ingredients.module';
import { OrdersModule } from './features/orders/orders.module';
import { RecipesModule } from './features/recipes/recipes.module';
import { StartModule } from './features/start/start.module';
import { SharedModule } from './shared/shared.module';
import { BarEffects } from './store/bar/bar.effects';
import * as fromBarReducer from './store/bar/bar.reducers';
import { IngredientsGroupEffects } from './store/ingredient-group/ingredient-group.effects';
import * as fromIngredientsGroupsReducer from './store/ingredient-group/ingredient-group.reducers';
import { IngredientsEffects } from './store/ingredients/ingredients.effects';
import * as fromIngredientsReducer from './store/ingredients/ingredients.reducers';
import { OrdersEffects } from './store/orders/orders.effects';
import * as fromOrdersReducer from './store/orders/orders.reducers';
import { CocktailsEffects } from './store/recipes/cocktails.effects';
import * as fromCocktailsReducer from './store/recipes/cocktails.reducers';
import { ApiModule } from './util';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: 'http://localhost:8080' }),
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
    StoreModule.forFeature(fromIngredientsGroupsReducer.featureKey, fromIngredientsGroupsReducer.reducer),
    StoreModule.forFeature(fromIngredientsReducer.featureKey, fromIngredientsReducer.reducer),
    StoreModule.forFeature(fromCocktailsReducer.featureKey, fromCocktailsReducer.reducer),
    StoreModule.forFeature(fromOrdersReducer.featureKey, fromOrdersReducer.reducer),
    EffectsModule.forFeature([
      BarEffects,
      IngredientsEffects,
      CocktailsEffects,
      OrdersEffects,
      IngredientsGroupEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
