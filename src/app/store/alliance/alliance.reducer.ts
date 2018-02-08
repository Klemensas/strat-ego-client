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
    case AllianceActions.CREATE_SUCCESS: {
      const alliances = { ...state.alliances, [action.payload.alliance.id]: action.payload.alliance };
      return {
        ...state,
        alliances,
        playerAlliance: action.payload.alliance.id,
        role: action.payload.role,
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

    case AllianceActions.REMOVED:
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

    case AllianceActions.DESTROY_SUCCESS: {
      const alliances = { ...state.alliances, [state.playerAlliance]: null };
      return {
        ...state,
        ...alliances,
        role: null,
        playerAlliance: null,
      };
    }

    case AllianceActions.INVITED: {
      return {
        ...state,
        invitations: [...state.invitations, action.payload]
      };
    }

    case AllianceActions.REJECT_INVITE_SUCCESS:
    case AllianceActions.INVITE_CANCELED: {
      return {
        ...state,
        invitations: state.invitations.filter(({ id }) => id !== action.payload)
      };
    }

    case AllianceActions.ACCEPT_INVITE_SUCCESS: {
      const alliances = { ...state.alliances, [action.payload.id]: action.payload };
      const role = action.payload.DefaultRole;
      const invitations = state.invitations.filter(({ id }) => id !== action.payload.id);
      return {
        ...state,
        alliances,
        role,
        invitations,
        playerAlliance: action.payload.id,
      };
    }

    case AllianceActions.INVITE_REJECTED: {
      const alliance = state.alliances[state.playerAlliance];
      const alliances = {
        ...state.alliances,
        [state.playerAlliance]: {
          ...alliance,
          Invitations: alliance.Invitations.filter(({ id }) => id !== action.payload)
        }
      };
      return {
        ...state,
        alliances,
      };
    }

    case AllianceActions.CREATE_FORUM_CATEGORY_SUCCESS: {
      const Forum = [ ...state.alliances[state.playerAlliance].Forum, action.payload];
      const alliance = { ...state.alliances[state.playerAlliance], Forum };
      return {
        ...state,
        alliances: {
          ...state.alliances,
          [state.playerAlliance]: alliance
        },
      };
    }

    case AllianceActions.CREATE_INVITE_SUCCESS:
    case AllianceActions.CANCEL_INVITE_SUCCESS: {
      return eventInvitation(action, state, { inProgress: false });
    }

    case AllianceActions.EVENT_INVITATION: {
      return eventInvitation(action, state);
    }

    case AllianceActions.REMOVE_MEMBER_SUCCESS: {
      return eventMembership(action, state, { inProgress: false });
    }

    case AllianceActions.EVENT_MEMBERSHIP: {
      return eventMembership(action, state);
    }

    case AllianceActions.CANCEL_INVITE:
    case AllianceActions.CREATE_INVITE: {
      return { ...state, error: null, inProgress: true };
    }

    default: {
      return state;
    }
  }
};

const eventMembership = (action, state: AllianceState, stateParams = {}): AllianceState => {
  const isJoin = action.payload.event.status === 'join';
  const alliance = state.alliances[state.playerAlliance];
  return {
    ...state,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        Events: [action.payload.event, ...alliance.Events],
        Invitations: isJoin ?
          alliance.Invitations.filter(({ id }) => id !== action.payload.data.id) :
          alliance.Invitations,
        Members: isJoin ?
          [action.payload.data, ...alliance.Members] :
          alliance.Members.filter(({ id }) => id !== action.payload.data)
      }
    }
  };
};

const eventInvitation = (action, state: AllianceState, stateParams = {}): AllianceState => {
  const isCreated = action.payload.event.status === 'create';
  const alliance = state.alliances[state.playerAlliance];
  return {
    ...state,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        Events: [action.payload.event, ...alliance.Events],
        Invitations: isCreated ?
          [action.payload.data, ...alliance.Invitations] :
          alliance.Invitations.filter(({ id }) => id !== action.payload.data)
      }
    },
    ...stateParams
  };
};
