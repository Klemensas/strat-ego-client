import { MenuActions, MenuActionTypes } from './menu.actions';

export interface MenuState {
  sidenavs: {
    left: string;
    right: string;
  };
}

export const initialState: MenuState = {
  sidenavs: {
    left: null,
    right: null,
  },
};

export function reducer(
  state = initialState,
  action: MenuActions
) {
  switch (action.type) {
    case MenuActionTypes.SetSidenav: {
      const sidenavs = { ...state.sidenavs };
      action.payload.forEach(({ side, name }) => sidenavs[side] = name);

      return {
        ...state,
        sidenavs,
      };
    }

    default: {
      return state;
    }
  }
}

export const getSidenavs = (state: MenuState) => state.sidenavs;
