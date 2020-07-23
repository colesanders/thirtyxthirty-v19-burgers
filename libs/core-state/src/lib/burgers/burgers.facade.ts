import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Burger } from '@thirty/api-interfaces';

import * as BurgersActions from './burgers.actions';
import * as fromBurgers from './burgers.reducer';
import * as BurgersSelectors from './burgers.selectors';

@Injectable({
  providedIn: 'root'
})
export class BurgersFacade {
  loaded$ = this.store.pipe(select(BurgersSelectors.getBurgersLoaded));
  allBurgers$ = this.store.pipe(select(BurgersSelectors.getAllBurgers));
  selectedBurger$ = this.store.pipe(select(BurgersSelectors.getSelectedBurger));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === BurgersActions.createBurger({} as any).type ||
    action.type === BurgersActions.updateBurger({} as any).type ||
    action.type === BurgersActions.deleteBurger({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectBurger(selectedId: string) {
    this.dispatch(BurgersActions.selectBurger({ selectedId }));
  }

  resetSelectedBurger(){
    this.dispatch(BurgersActions.resetSelectedBurger());
  }

  loadBurgers() {
    this.dispatch(BurgersActions.loadBurgers());
  }

  loadBurger(burgerId: string) {
    this.dispatch(BurgersActions.loadBurger({ burgerId }));
  }

  createBurger(burger: Burger) {
    this.dispatch(BurgersActions.createBurger({ burger }));
  }

  updateBurger(burger: Burger) {
    this.dispatch(BurgersActions.updateBurger({ burger }));
  }

  deleteBurger(burger: Burger) {
    this.dispatch(BurgersActions.deleteBurger({ burger }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
