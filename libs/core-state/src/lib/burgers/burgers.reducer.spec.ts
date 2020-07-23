import { BurgersEntity } from './burgers.models';
import * as BurgersActions from './burgers.actions';
import { State, initialState, reducer } from './burgers.reducer';

describe('Burgers Reducer', () => {
  const createBurgersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BurgersEntity);

  beforeEach(() => {});

  describe('valid Burgers actions', () => {
    it('loadBurgersSuccess should return set the list of known Burgers', () => {
      const burgers = [
        createBurgersEntity('PRODUCT-AAA'),
        createBurgersEntity('PRODUCT-zzz'),
      ];
      const action = BurgersActions.loadBurgersSuccess({ burgers });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
