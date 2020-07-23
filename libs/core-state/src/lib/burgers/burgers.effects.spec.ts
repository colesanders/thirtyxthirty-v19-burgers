import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { BurgersEffects } from './burgers.effects';
import * as BurgersActions from './burgers.actions';

describe('BurgersEffects', () => {
  let actions: Observable<any>;
  let effects: BurgersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BurgersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(BurgersEffects);
  });

  describe('loadBurgers$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BurgersActions.loadBurgers() });

      const expected = hot('-a-|', {
        a: BurgersActions.loadBurgersSuccess({ burgers: [] }),
      });

      expect(effects.loadBurgers$).toBeObservable(expected);
    });
  });
});
