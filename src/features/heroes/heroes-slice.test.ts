import thunk from 'redux-thunk';
import { setHeroes, setStatus } from './heroes-slice';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('heroesSlice', () => {
  it('should set heroes correctly', () => {
    const store = mockStore({});
    const heroes = [{ name: 'Superman' }, { name: 'Spiderman' }];
    const expectedAction = {
      type: 'heroes/setHeroes',
      payload: heroes,
    };

    store.dispatch(setHeroes(heroes));
    const actions = store.getActions();

    expect(actions).toEqual([expectedAction]);
  });

  it('should set status correctly', () => {
    const store = mockStore({});
    const status = true;
    const expectedAction = {
      type: 'heroes/setStatus',
      payload: status,
    };

    store.dispatch(setStatus(status));
    const actions = store.getActions();

    expect(actions).toEqual([expectedAction]);
  });
});
