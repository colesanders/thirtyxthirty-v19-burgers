import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBurgers from './burgers/burgers.reducer';
import { BurgersEffects } from './burgers/burgers.effects';
import { BurgersFacade } from './burgers/burgers.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromBurgers.BURGERS_FEATURE_KEY,
      fromBurgers.burgersReducer
    ),
    EffectsModule.forFeature([BurgersEffects]),
  ],
  providers: [BurgersFacade],
})
export class CoreStateModule {}
