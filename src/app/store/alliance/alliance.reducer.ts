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
        invitations: action.payload.Invitations,
        role: action.payload.AllianceRole
      };
    }

    case AllianceActions.UPDATE: {
      return {
        ...state,
        alliances: {
          ...state.alliances,
          [state.playerAlliance]: action.payload
        }
      };
    }

    case AllianceActions.UPDATE_MEMBER: {
      const alliance = state.alliances[state.playerAlliance];
      const memberIndex = alliance.Members.findIndex(({ id }) => id === action.payload.id);

      alliance.Members[memberIndex] = action.payload;
      return {
        ...state,
        alliances: {
          ...state.alliances,
          alliance
        }
      };
    }

    case AllianceActions.REMOVED_MEMBER: {
      const alliance = action.payload.alliance;
      return {
        ...state,
        alliances: {
          ...state.alliances,
          [state.playerAlliance]: alliance
        }
      };
    }

    case AllianceActions.LEAVE_ALLIANCE_SUCCESS: {
      return {
        ...state,
        playerAlliance: null,
        role: null,
      };
    }

    case AllianceActions.DESTROY_SUCCESS: {
      const alliances = { ...state.alliances, [state.playerAlliance]: null };
      return {
        ...state,
        ...alliances,
        role: null,
        playerAlliance: null,
      };
    }


    default: {
      return state;
    }
  }
};
