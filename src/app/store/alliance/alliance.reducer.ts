import { Action } from '@ngrx/store';
import {
  AllianceRole,
  Profile,
  AllianceEventSocketMessage,
  AllianceRoleSocketPayload,
  AllianceDiplomacy,
  AllianceMember,
  EventStatus,
  Alliance,
  DiplomacyStatus
} from 'strat-ego-common';

import { AllianceActionTypes, AllianceActions, EventMembership, EventInvitation, EventRoles } from './alliance.actions';

export interface AllianceState {
  playerAlliance: number;
  alliances: {
    [name: string]: Alliance;
  };
  role: AllianceRole;
  invitations: Profile[];
  inProgress: boolean;
  error: any;
}

export const initialState: AllianceState = {
  playerAlliance: null,
  alliances: {},
  role: null,
  invitations: [],
  inProgress: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: AllianceActions
): AllianceState {
  switch (action.type) {
    case AllianceActionTypes.SetData: {
      const alliance = action.payload.allianceId ? { [action.payload.allianceId]: action.payload.alliance } : {};
      const alliances = { ...state.alliances, ...alliance };
      return {
        ...state,
        alliances,
        playerAlliance: action.payload.allianceId,
        invitations: action.payload.invitations,
        role: action.payload.allianceRole
      };
    }
    case AllianceActionTypes.CreateSuccess: {
      const alliances = { ...state.alliances, [action.payload.id]: action.payload };
      return {
        ...state,
        alliances,
        playerAlliance: action.payload.id,
        role: action.payload.masterRole,
      };
    }

    case AllianceActionTypes.Removed:
    case AllianceActionTypes.LeaveAllianceSuccess: {
      return {
        ...state,
        playerAlliance: null,
        role: null,
      };
    }

    case AllianceActionTypes.DestroySuccess: {
      const alliances = { ...state.alliances, [state.playerAlliance]: null };
      return {
        ...state,
        ...alliances,
        role: null,
        playerAlliance: null,
      };
    }

    case AllianceActionTypes.Invited: {
      return {
        ...state,
        invitations: [...state.invitations, action.payload]
      };
    }

    case AllianceActionTypes.RejectInviteSuccess:
    case AllianceActionTypes.InviteCanceled: {
      return {
        ...state,
        invitations: state.invitations.filter(({ id }) => id !== action.payload)
      };
    }

    case AllianceActionTypes.AcceptInviteSuccess: {
      const alliances = { ...state.alliances, [action.payload.id]: action.payload };
      const role = action.payload.defaultRole;
      const invitations = state.invitations.filter(({ id }) => id !== action.payload.id);
      return {
        ...state,
        alliances,
        role,
        invitations,
        playerAlliance: action.payload.id,
      };
    }

    case AllianceActionTypes.CreateInviteSuccess:
    case AllianceActionTypes.CancelInviteSuccess: {
      return eventInvitation(action.payload, state, { inProgress: false });
    }

    case AllianceActionTypes.EventInvitation: {
      return eventInvitation(action.payload, state);
    }

    case AllianceActionTypes.RemoveMemberSuccess: {
      return eventMembership(action.payload, state, { inProgress: false });
    }

    case AllianceActionTypes.EventMembership: {
      return eventMembership(action.payload, state);
    }

    case AllianceActionTypes.EventRoles: {
      return eventRoles(action.payload, state);
    }

    case AllianceActionTypes.UpdateSelfRole: {
      return {
        ...state,
        role: action.payload,
      };
    }

    case AllianceActionTypes.UpdateRolePermissionsSuccess:
    case AllianceActionTypes.RemoveRoleSuccess:
    case AllianceActionTypes.UpdateMemberRoleSuccess: {
      return eventRoles(action.payload, state, { inProgress: false });
    }

    case AllianceActionTypes.EventDiplomacy: {
      return eventDiplomacy(action.payload, state);
    }

    case AllianceActionTypes.ProposeAllianceSuccess:
    case AllianceActionTypes.ProposeNapSuccess:
    case AllianceActionTypes.CancelAllianceSuccess:
    case AllianceActionTypes.CancelNapSuccess:
    case AllianceActionTypes.RejectAllianceSuccess:
    case AllianceActionTypes.RejectNapSuccess:
    case AllianceActionTypes.AcceptAllianceSuccess:
    case AllianceActionTypes.AcceptNapSuccess:
    case AllianceActionTypes.EndAllianceSuccess:
    case AllianceActionTypes.EndNapSuccess:
    case AllianceActionTypes.DeclareWarSuccess: {
      return eventDiplomacy(action.payload, state, { inProgress: false });
    }

    case AllianceActionTypes.UpdateRolePermissions:
    case AllianceActionTypes.RemoveRole:
    case AllianceActionTypes.UpdateMemberRole:
    case AllianceActionTypes.CancelInvite:
    case AllianceActionTypes.CreateInvite:
    case AllianceActionTypes.ProposeAlliance:
    case AllianceActionTypes.ProposeNap:
    case AllianceActionTypes.CancelAlliance:
    case AllianceActionTypes.CancelNap:
    case AllianceActionTypes.RejectAlliance:
    case AllianceActionTypes.RejectNap:
    case AllianceActionTypes.AcceptAlliance:
    case AllianceActionTypes.AcceptNap:
    case AllianceActionTypes.EndAlliance:
    case AllianceActionTypes.EndNap:
    case AllianceActionTypes.DeclareWar: {
      return { ...state, error: null, inProgress: true };
    }

    default: {
      return state;
    }

    // case AllianceActionTypes.Update: {
    //   return {
    //     ...state,
    //     alliances: {
    //       ...state.alliances,
    //       [state.playerAlliance]: action.payload
    //     }
    //   };
    // }

    // case AllianceActionTypes.CreateForumCategorySuccess: {
    //   const Forum = [ ...state.alliances[state.playerAlliance].Forum, action.payload];
    //   const alliance = { ...state.alliances[state.playerAlliance], Forum };
    //   return {
    //     ...state,
    //     alliances: {
    //       ...state.alliances,
    //       [state.playerAlliance]: alliance
    //     },
    //   };
    // }
  }
}

export const getPlayerAlliance = (state: AllianceState) => state.alliances[state.playerAlliance];
export const getPlayerInvitations = (state: AllianceState) => state.invitations;
export const getPlayerAllianceData = (state: AllianceState) => ({
  alliance: state.alliances[state.playerAlliance],
  role: state.role,
});
export const getPlayerAllianceActiveDiplomacy = (state: AllianceState) => {
  const alliance = state.alliances[state.playerAlliance];
  return !alliance ? [] : [...alliance.diplomacyOrigin, ...alliance.diplomacyTarget].filter(({ status }) => status === DiplomacyStatus.ongoing);
};


const eventMembership = (payload: AllianceEventSocketMessage<AllianceMember | number>, state: AllianceState, stateParams = {}): AllianceState => {
  const isJoin = payload.event.status === EventStatus.join;
  const alliance = state.alliances[state.playerAlliance];
  return {
    ...state,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        eventOrigin: [payload.event, ...alliance.eventOrigin],
        invitations: isJoin ?
          alliance.invitations.filter(({ id }) => id !== (payload.data as AllianceMember).id) :
          alliance.invitations,
        members: isJoin ?
          [payload.data, ...alliance.members] :
          alliance.members.filter(({ id }) => id !== payload.data)
      }
    }
  };
};

const eventInvitation = (payload: AllianceEventSocketMessage<Profile | number>, state: AllianceState, stateParams = {}): AllianceState => {
  const isCreated = payload.event.status === EventStatus.create;
  const alliance = state.alliances[state.playerAlliance];
  return {
    ...state,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        eventOrigin: [payload.event, ...alliance.eventOrigin],
        invitations: isCreated ?
          [payload.data, ...alliance.invitations] :
          alliance.invitations.filter(({ id }) => id !== payload.data)
      }
    },
    ...stateParams
  };
};

const eventRoles = (payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>, state: AllianceState, stateParams = {}): AllianceState => {
  const { created, updated, removed, updatedMember } = payload.data;
  const alliance = state.alliances[state.playerAlliance];
  let members = [...alliance.members];
  let roles = [...alliance.roles];
  let defaultRole = alliance.defaultRole;
  let playerRole = state.role;

  if (updated) {
    updated.forEach((role) => {
      const roleIndex = roles.findIndex(({ id }) => id === role.id);
      roles[roleIndex] = role;
      if (role.id === alliance.defaultRoleId) { defaultRole = role; }
      if (playerRole.id === role.id) { playerRole = role; }

      members = members.map((member) =>  member.allianceRole.id === role.id ? { ...member, allianceRole: role } : member);
    });
  }
  if (removed) {
    roles = roles.filter(({ id }) => !removed.includes(id));
    if (removed.includes(playerRole.id)) { playerRole = defaultRole; }

    members = members.map((member) => removed.includes(member.allianceRole.id) ? { ...member, allianceRole: defaultRole } : member);
  }
  if (created) {
    roles.push(...created);
  }
  if (updatedMember) {
    updatedMember.forEach(({ id, role }) => {
      const memberIndex = members.findIndex((member) => member.id === id);
      members[memberIndex].allianceRole = role;
    });
  }

  return {
    ...state,
    role: playerRole,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        members,
        roles,
        defaultRole,
        eventOrigin: [payload.event, ...alliance.eventOrigin],
      }
    }
  };
};

const eventDiplomacy = (payload: AllianceEventSocketMessage<AllianceDiplomacy | number>, state: AllianceState, stateParams = {}): AllianceState => {
  let diplomacy: { diplomacyTarget?: Partial<AllianceDiplomacy>[]; diplomacyOrigin?: Partial<AllianceDiplomacy>[] } = {};
  const alliance = state.alliances[state.playerAlliance];
  const hasDiplo = typeof payload.data !== 'number';
  const isDiploStart = !hasDiplo && (payload.event.status === EventStatus.startAlliance || payload.event.status === EventStatus.startNap);
  if (isDiploStart) {
    diplomacy = {
      diplomacyTarget: [...alliance.diplomacyTarget],
      diplomacyOrigin: [...alliance.diplomacyOrigin]
    };
    const target = diplomacy.diplomacyTarget.find(({ id }) => id === payload.data) || diplomacy.diplomacyOrigin.find(({ id }) => id === payload.data);
    target.status = DiplomacyStatus.ongoing;
  } else if (!hasDiplo) {
    diplomacy = {
      diplomacyTarget: alliance.diplomacyTarget.filter(({id }) => id !== payload.data),
      diplomacyOrigin: alliance.diplomacyOrigin.filter(({id }) => id !== payload.data)
    };
  } else {
    // TODO: shouldn't have to use as here, look into TS
    const type = (payload.data as AllianceDiplomacy).targetAllianceId === state.playerAlliance ? 'diplomacyTarget' : 'diplomacyOrigin';
    diplomacy[type] = [payload.data as AllianceDiplomacy, ...alliance[type]];
  }

  return {
    ...state,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        ...diplomacy,
        eventOrigin: [payload.event, ...alliance.eventOrigin],
      }
    }
  };
};
