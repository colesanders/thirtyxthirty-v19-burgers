import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BURGERS_FEATURE_KEY,
  BurgersState,
  BurgersPartialState,
  burgerAdapter
} from './burgers.reducer';

// Lookup the 'Burgers' feature state managed by NgRx
export const getBurgersState = createFeatureSelector<
  BurgersPartialState,
  BurgersState
>(BURGERS_FEATURE_KEY);

const { selectAll, selectEntities } = burgerAdapter.getSelectors();

export const getBurgersLoaded = createSelector(
  getBurgersState,
  (state: BurgersState) => state.loaded
);

export const getBurgersError = createSelector(
  getBurgersState,
  (state: BurgersState) => state.error
);

export const getAllBurgers = createSelector(
  getBurgersState,
  (state: BurgersState) => selectAll(state)
);

export const getBurgersEntities = createSelector(
  getBurgersState,
  (state: BurgersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getBurgersState,
  (state: BurgersState) => state.selectedId
);

export const getSelectedBurger = createSelector(
  getBurgersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);