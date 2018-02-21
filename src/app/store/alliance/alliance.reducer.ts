import { AllianceRole, Alliance, AllianceBase, AllianceMember, AllianceEvent, AllianceEventSocketMessage, AllianceRoleSocketPayload, Profile, AllianceDiplomacy } from './alliance.model';
import { AllianceActionTypes, AllianceActions, EventMembership, EventInvitation, EventRoles } from './alliance.actions';
import { Action } from '@ngrx/store';

export interface AllianceState {
  playerAlliance: number;
  alliances: {
    [name: string]: Alliance;
  };
  role: AllianceRole;
  invitations: AllianceBase[];
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
    case AllianceActionTypes.CreateSuccess: {
      const alliances = { ...state.alliances, [action.payload.alliance.id]: action.payload.alliance };
      return {
        ...state,
        alliances,
        playerAlliance: action.payload.alliance.id,
        role: action.payload.role,
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
};

export const getPlayerAlliance = (state: AllianceState) => state.alliances[state.playerAlliance];
export const getPlayerInvitations = (state: AllianceState) => state.invitations;
export const getPlayerAllianceData = (state: AllianceState) => ({
  alliance: state.alliances[state.playerAlliance],
  role: state.role,
});
export const getPlayerAllianceActiveDiplomacy = (state: AllianceState) => {
  const alliance = state.alliances[state.playerAlliance];
  return !alliance ? [] : [...alliance.DiplomacyOrigin, ...alliance.DiplomacyTarget].filter(({ status }) => status === 'ongoing');
};


const eventMembership = (payload: AllianceEventSocketMessage<AllianceMember | number>, state: AllianceState, stateParams = {}): AllianceState => {
  const isJoin = payload.event.status === 'join';
  const alliance = state.alliances[state.playerAlliance];
  return {
    ...state,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        Events: [payload.event, ...alliance.Events],
        Invitations: isJoin ?
          alliance.Invitations.filter(({ id }) => id !== (payload.data as AllianceMember).id) :
          alliance.Invitations,
        Members: isJoin ?
          [payload.data, ...alliance.Members] :
          alliance.Members.filter(({ id }) => id !== payload.data)
      }
    }
  };
};

const eventInvitation = (payload: AllianceEventSocketMessage<Profile | number>, state: AllianceState, stateParams = {}): AllianceState => {
  const isCreated = payload.event.status === 'create';
  const alliance = state.alliances[state.playerAlliance];
  return {
    ...state,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        Events: [payload.event, ...alliance.Events],
        Invitations: isCreated ?
          [payload.data, ...alliance.Invitations] :
          alliance.Invitations.filter(({ id }) => id !== payload.data)
      }
    },
    ...stateParams
  };
};

const eventRoles = (payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>, state: AllianceState, stateParams = {}): AllianceState => {
  const { created, updated, removed, updatedMember } = payload.data;
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
        Events: [payload.event, ...alliance.Events],
      }
    }
  };
};

const eventDiplomacy = (payload: AllianceEventSocketMessage<AllianceDiplomacy | number>, state: AllianceState, stateParams = {}): AllianceState => {
  let diplomacy: { DiplomacyTarget?: AllianceDiplomacy[]; DiplomacyOrigin?: AllianceDiplomacy[] } = {};
  const alliance = state.alliances[state.playerAlliance];
  const hasDiplo = typeof payload.data !== 'number';
  const isDiploStart = !hasDiplo && payload.event.status.includes('start') && !payload.event.status.includes('War');
  if (isDiploStart) {
    diplomacy = {
      DiplomacyTarget: [...alliance.DiplomacyTarget],
      DiplomacyOrigin: [...alliance.DiplomacyOrigin]
    };
    const target = diplomacy.DiplomacyTarget.find(({ id }) => id === payload.data) || diplomacy.DiplomacyOrigin.find(({ id }) => id === payload.data);
    target.status = 'ongoing';
  } else if (!hasDiplo) {
    diplomacy = {
      DiplomacyTarget: alliance.DiplomacyTarget.filter(({id }) => id !== payload.data),
      DiplomacyOrigin: alliance.DiplomacyOrigin.filter(({id }) => id !== payload.data)
    };
  } else {
    // TODO: shouldn't have to use as here, look into TS
    const type = (payload.data as AllianceDiplomacy).TargetAllianceId === state.playerAlliance ? 'DiplomacyTarget' : 'DiplomacyOrigin';
    diplomacy[type] = [payload.data as AllianceDiplomacy, ...alliance[type]];
  }

  console.log('oho', diplomacy);
  return {
    ...state,
    alliances: {
      ...state.alliances,
      [state.playerAlliance]: {
        ...alliance,
        ...diplomacy,
        Events: [payload.event, ...alliance.Events],
      }
    }
  };
}
