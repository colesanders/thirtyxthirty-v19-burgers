import { Burger } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as BurgersActions from './burgers.actions';

export const BURGERS_FEATURE_KEY = 'burger';

export interface BurgersState extends EntityState<Burger> {
  selectedId?: string | number; // which Burgers record has been selected
  loaded: boolean; // has the Burgers list been loaded
  error?: string | null; // last known error (if any)
}

export interface BurgersPartialState {
  readonly [BURGERS_FEATURE_KEY]: BurgersState;
}

export const burgerAdapter: EntityAdapter<Burger> = createEntityAdapter();

export const initialBurgersState: BurgersState = burgerAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _burgersReducer = createReducer(
  initialBurgersState,
  on(BurgersActions.resetBurgers, state => burgerAdapter.removeAll(state)),
  on(BurgersActions.resetSelectedBurger, state => Object.assign({}, state, { selectedId: null })),
  on(BurgersActions.selectBurger, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load burgers
  on(
    BurgersActions.loadBurgersSuccess,
    (state, { burgers }) =>
    burgerAdapter.setAll(burgers, { ...state, loaded: true })
  ),
  // Load burger
  on(
    BurgersActions.loadBurgerSuccess,
    (state, { burger }) =>
    burgerAdapter.upsertOne(burger, { ...state, loaded: true })
  ),
  // Add burger
  on(BurgersActions.createBurgerSuccess,
    (state, { burger }) =>
    burgerAdapter.addOne(burger, state)
  ),
  // Update burger
  on(BurgersActions.updateBurgerSuccess,
    (state, { burger }) =>
    burgerAdapter.updateOne({ id: burger.id, changes: burger }, state)
  ),
  // Delete burger
  on(BurgersActions.deleteBurgerSuccess,
    (state, { burger }) =>
    burgerAdapter.removeOne(burger.id, state)
  ),

  // failure actions
  on(
    BurgersActions.deleteBurgerFailure,
    BurgersActions.updateBurgerFailure,
    BurgersActions.createBurgerFailure,
    BurgersActions.loadBurgerFailure,
    BurgersActions.loadBurgersFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),

  // load actions
  on(
    BurgersActions.loadBurger,
    BurgersActions.loadBurgers,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function burgersReducer(state: BurgersState | undefined, action: Action) {
  return _burgersReducer(state, action);
}