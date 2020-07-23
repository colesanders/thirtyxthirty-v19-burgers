import { BurgersEntity } from './burgers.models';
import { State, burgersAdapter, initialState } from './burgers.reducer';
import * as BurgersSelectors from './burgers.selectors';

describe('Burgers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBurgersId = (it) => it['id'];
  const createBurgersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BurgersEntity);

  let state;

  beforeEach(() => {
    state = {
      burgers: burgersAdapter.addAll(
        [
          createBurgersEntity('PRODUCT-AAA'),
          createBurgersEntity('PRODUCT-BBB'),
          createBurgersEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Burgers Selectors', () => {
    it('getAllBurgers() should return the list of Burgers', () => {
      const results = BurgersSelectors.getAllBurgers(state);
      const selId = getBurgersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BurgersSelectors.getSelected(state);
      const selId = getBurgersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getBurgersLoaded() should return the current 'loaded' status", () => {
      const result = BurgersSelectors.getBurgersLoaded(state);

      expect(result).toBe(true);
    });

    it("getBurgersError() should return the current 'error' state", () => {
      const result = BurgersSelectors.getBurgersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
