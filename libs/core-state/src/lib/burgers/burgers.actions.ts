import { Burger } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedBurger = createAction('[Burgers] Reset Selected Burger');
export const resetBurgers = createAction('[Burgers] Reset Burgers');

// Select Burger
export const selectBurger = createAction(
  '[Burgers] Select Burger',
  props<{ selectedId: string }>()
);

// Load Burgers
export const loadBurgers = createAction('[Burgers] Load Burgers');

export const loadBurgersSuccess = createAction(
  '[Burgers] Load Burgers Success',
  props<{ burgers: Burger[] }>()
);

export const loadBurgersFailure = createAction(
  '[Burgers] Load Burgers Failure',
  props<{ error: any }>()
);

// Load Burger
export const loadBurger = createAction(
  '[Burgers] Load Burger',
  props<{ burgerId: string }>()
);

export const loadBurgerSuccess = createAction(
  '[Burgers] Load Burger Success',
  props<{ burger: Burger }>()
);

export const loadBurgerFailure = createAction(
  '[Burgers] Load Burger Failure',
  props<{ error: any }>()
);

// Create Burger
export const createBurger = createAction(
  '[Burgers] Create Burger',
  props<{ burger: Burger }>()
);

export const createBurgerSuccess = createAction(
  '[Burgers] Create Burger Success',
  props<{ burger: Burger }>()
);

export const createBurgerFailure = createAction(
  '[Burgers] Create Burger Failure',
  props<{ error: any }>()
);

// Update Burger
export const updateBurger = createAction(
  '[Burgers] Update Burger',
  props<{ burger: Burger }>()
);

export const updateBurgerSuccess = createAction(
  '[Burgers] Update Burger Success',
  props<{ burger: Burger }>()
);

export const updateBurgerFailure = createAction(
  '[Burgers] Update Burger Failure',
  props<{ error: any }>()
);

// Delete Burger
export const deleteBurger = createAction(
  '[Burgers] Delete Burger',
  props<{ burger: Burger }>()
);

export const deleteBurgerCancelled = createAction(
  '[Burgers] Delete Burger Cancelled'
);

export const deleteBurgerSuccess = createAction(
  '[Burgers] Delete Burger Success',
  props<{ burger: Burger }>()
);

export const deleteBurgerFailure = createAction(
  '[Burgers] Delete Burger Failure',
  props<{ error: any }>()
);