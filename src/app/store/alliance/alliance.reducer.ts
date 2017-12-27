import { ActionReducer } from '@ngrx/store';

import { ActionWithPayload } from '../util';
import { AllianceState, initialAllianceState } from './alliance.state';
import { AllianceActions } from './alliance.actions';

export const AllianceReducer: ActionReducer<AllianceState> = (state = initialAllianceState, action: ActionWithPayload) => {
  switch (action.type) {
    case AllianceActions.SET_DATA: {
      const alliance = action.payload.AllianceId ? { [action.payload.AllianceId]: action.payload.Alliance } : {};
      const alliances = { ...state.alliances, ...alliance };

      return {
        ...state,
        alliances,
        playerAlliance: action.payload.AllianceId,
        invitations: action.payload.Invitations
      };
    }

    case AllianceActions.UPDATE_INVITES: {
      const { deleted, invitation } = action.payload;
      const playerAlliance = state.alliances[state.playerAlliance];
      const Invitations = [...playerAlliance.Invitations];

      // TODO: handle deleted
      if (!deleted) {
        Invitations.unshift(invitation);
      }


      return {
        ...state,
        alliances: {
          ...state.alliances,
          [state.playerAlliance]: {
            ...playerAlliance,
            Invitations
          }
        }
      };
    }

    default: {
      return state;
    }
  }
};
