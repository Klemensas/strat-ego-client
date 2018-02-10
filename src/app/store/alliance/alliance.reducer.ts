import { ActionReducer } from '@ngrx/store';

import { ActionWithPayload } from '../util';
import { AllianceState, initialAllianceState } from './alliance.state';
import { AllianceActions } from './alliance.actions';
import { AllianceRole } from './alliance.model';

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

    case AllianceActions.EVENT_ROLES: {
      return eventRoles(action, state);
    }

    case AllianceActions.UPDATE_SELF_ROLE: {
      return {
        ...state,
        role: action.payload,
      };
    }

    case AllianceActions.UPDATE_ROLE_PERMISSIONS_SUCCESS:
    case AllianceActions.REMOVE_ROLE_SUCCESS:
    case AllianceActions.UPDATE_MEMBER_ROLE_SUCCESS: {
      console.log('really?')
      return eventRoles(action, state, { inProgress: false });
    }

    case AllianceActions.UPDATE_ROLE_PERMISSIONS:
    case AllianceActions.REMOVE_ROLE:
    case AllianceActions.UPDATE_MEMBER_ROLE:
    case AllianceActions.CANCEL_INVITE:
    case AllianceActions.CREATE_INVITE: {
      return { ...state, error: null, inProgress: true };
    }

    default: {
      return state;
    }
  }
};

const eventRoles = (action, state: AllianceState, stateParams = {}): AllianceState => {
  const { created, updated, removed, updatedMember } = action.payload.data;
  const alliance = state.alliances[state.playerAlliance];
  let Members = [...alliance.Members];
  let Roles = [...alliance.Roles];
  let DefaultRole = alliance.DefaultRole;
  let playerRole = state.role;

  if (updated) {
    updated.forEach((role) => {
      const roleIndex = Roles.findIndex(({ id }) => id === role.id);
      Roles[roleIndex] = role;
      if (role.id === alliance.DefaultRoleId) { DefaultRole = role; }
      if (playerRole.id === role.id) { playerRole = role; }

      Members = Members.map((member) =>  member.AllianceRole.id === role.id ? { ...member, AllianceRole: role } : member);
    });
  }
  if (removed) {
    Roles = Roles.filter(({ id }) => !removed.includes(id));
    if (removed.includes(playerRole.id)) { playerRole = DefaultRole; }

    Members = Members.map((member) => removed.includes(member.AllianceRole.id) ? { ...member, AllianceRole: DefaultRole } : member);
  }
  if (created) {
    Roles.push(...created);
  }
  if (updatedMember) {
    updatedMember.forEach(({ id, role }) => {
      const memberIndex = Members.findIndex((member) => member.id === id);
      Members[memberIndex].AllianceRole = role;
    });
  }
  console.log('wtf', state.alliances, state.playerAlliance, {
    ...state.alliances,
    [state.playerAlliance]: {
      ...alliance,
      Members,
      Roles,
      DefaultRole,
      Events: [action.payload.event, ...alliance.Events],
    }
  });
  return {
    ...state,
    role: playerRole,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        Members,
        Roles,
        DefaultRole,
        Events: [action.payload.event, ...alliance.Events],
      }
    }
  };
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
