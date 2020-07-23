import { Injectable } from '@angular/core';
import { BurgersService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as BurgersActions from './burgers.actions';
import { Burger } from '@thirty/api-interfaces';

@Injectable()
export class BurgersEffects {
  @Effect() loadBurgers$ = this.actions$.pipe(
    ofType(BurgersActions.loadBurgers),
    fetch({
      run: (action) => this.burgersService.all().pipe(
        map((burgers: Burger[]) => BurgersActions.loadBurgersSuccess({ burgers }))
      ),
      onError: (action, error) => BurgersActions.loadBurgersFailure({ error })
    })
  );

  @Effect() loadBurger$ = this.actions$.pipe(
    ofType(BurgersActions.loadBurger),
    fetch({
      run: (action) => this.burgersService.byId(action.burgerId).pipe(
        map((burger: Burger) => BurgersActions.loadBurgerSuccess({ burger }))
      ),
      onError: (action, error) => BurgersActions.loadBurgerFailure({ error })
    })
  );

  @Effect() createBurger$ = this.actions$.pipe(
    ofType(BurgersActions.createBurger),
    pessimisticUpdate({
      run: (action) => this.burgersService.create(action.burger).pipe(
        map((burger: Burger) => BurgersActions.createBurgerSuccess({ burger }))
      ),
      onError: (action, error) => BurgersActions.createBurgerFailure({ error })
    })
  );

  @Effect() updateBurger$ = this.actions$.pipe(
    ofType(BurgersActions.updateBurger),
    pessimisticUpdate({
      run: (action) => this.burgersService.update(action.burger).pipe(
        map((burger: Burger) => 
          BurgersActions.updateBurgerSuccess({ burger }))
      ),
      onError: (action, error) => BurgersActions.updateBurgerFailure({ error })
    })
  );

  @Effect() deleteBurger$ = this.actions$.pipe(
    ofType(BurgersActions.deleteBurger),
    pessimisticUpdate({
      run: (action) => this.burgersService.delete(action.burger.id).pipe(
        map((burger: Burger) => BurgersActions.deleteBurgerSuccess({ burger })),
      ),
      onError: (action, error) => BurgersActions.deleteBurgerFailure({ error })
    })
  );

  // Effect to refresh the burger after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(BurgersActions.deleteBurgerSuccess, BurgersActions.updateBurgerSuccess),
  //   tap(action => {
  //     BurgersActions.loadBurgers();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private burgersService: BurgersService
  ) {}
}