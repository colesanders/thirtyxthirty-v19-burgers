import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { BurgersEntity } from './burgers.models';
import { BurgersEffects } from './burgers.effects';
import { BurgersFacade } from './burgers.facade';

import * as BurgersSelectors from './burgers.selectors';
import * as BurgersActions from './burgers.actions';
import {
  BURGERS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './burgers.reducer';

interface TestSchema {
  burgers: State;
}

describe('BurgersFacade', () => {
  let facade: BurgersFacade;
  let store: Store<TestSchema>;
  const createBurgersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BurgersEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BURGERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([BurgersEffects]),
        ],
        providers: [BurgersFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(BurgersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allBurgers$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(BurgersActions.loadBurgers());

        list = await readFirst(facade.allBurgers$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadBurgersSuccess` to manually update list
     */
    it('allBurgers$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allBurgers$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          BurgersActions.loadBurgersSuccess({
            burgers: [createBurgersEntity('AAA'), createBurgersEntity('BBB')],
          })
        );

        list = await readFirst(facade.allBurgers$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
