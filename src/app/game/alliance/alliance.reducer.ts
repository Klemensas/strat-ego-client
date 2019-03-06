import {
  AllianceRole,
  Profile,
  AllianceEventSocketMessage,
  AllianceRoleSocketPayload,
  AllianceDiplomacy,
  AllianceMember,
  EventStatus,
  Alliance,
  DiplomacyStatus,
  ProfileUpdate,
  Dict,
  AllianceProfile,
} from 'strat-ego-common';

import { AllianceActionTypes, AllianceActions } from './alliance.actions';

export interface AllianceState {
  inProgress: boolean;
  error: any;
  viewedProfile: number;
  playerAlliance: Alliance;
  alliances: Dict<Alliance>;
  playerRole: number;
  invitations: Profile[];
  ids: number[];
  entities: Dict<AllianceProfile>;
  loadingIds: Dict<number>;
}

export const initialState: AllianceState = {
  inProgress: false,
  error: null,
  viewedProfile: null,
  playerAlliance: null,
  alliances: {},
  playerRole: null,
  invitations: [],
  ids: [],
  entities: {},
  loadingIds: {},
};

export function reducer(
  state = initialState,
  action: AllianceActions
): AllianceState {
  switch (action.type) {
    case AllianceActionTypes.Initialize: {
      const alliance = action.payload.alliance;
      const newState = { ...state };

      newState.invitations = action.payload.invitations;

      if (!alliance) { return newState; }

      const ids = [...state.ids, alliance.id];
      const entities = {
        ...state.entities,
        [alliance.id]: {
          id: alliance.id,
          name: alliance.name,
          members: alliance.members.map(({ id }) => ({ id })),
          avatarUrl: alliance.avatarUrl,
          description: alliance.description,
          createdAt: alliance.createdAt,
        }
      };
      newState.playerAlliance = alliance;
      newState.playerRole = action.payload.player.allianceRoleId;
      newState.ids = ids;
      newState.entities = entities;

      return newState;
    }

    case AllianceActionTypes.CreateSuccess: {
      const alliances = { ...state.alliances, [action.payload.id]: action.payload };
      return {
        ...state,
        alliances,
        playerAlliance: action.payload,
        playerRole: action.payload.masterRoleId,
      };
    }

    case AllianceActionTypes.Removed:
    case AllianceActionTypes.LeaveAllianceSuccess: {
      return {
        ...state,
        playerAlliance: null,
        playerRole: null,
      };
    }

    case AllianceActionTypes.DestroySuccess: {
      const alliances = { ...state.alliances, [state.playerAlliance.id]: null };
      return {
        ...state,
        ...alliances,
        playerRole: null,
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
      const invitations = state.invitations.filter(({ id }) => id !== action.payload.id);
      return {
        ...state,
        alliances,
        invitations,
        playerAlliance: action.payload,
        playerRole: action.payload.defaultRoleId,
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
        // role: action.payload,
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

    case AllianceActionTypes.UpdateProfileSuccess:
    case AllianceActionTypes.RemoveAvatarSuccess: {
      return eventProfile(action.payload, state, { inProgress: false });
    }

    case AllianceActionTypes.EventProfile: {
      return eventProfile(action.payload, state);
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
    case AllianceActionTypes.DeclareWar:
    case AllianceActionTypes.UpdateProfile:
    case AllianceActionTypes.RemoveAvatar: {
      return { ...state, error: null, inProgress: true };
    }

    case AllianceActionTypes.CreateFail:
    case AllianceActionTypes.CreateInviteFail:
    case AllianceActionTypes.CancelInviteFail:
    case AllianceActionTypes.RemoveMemberFail:
    case AllianceActionTypes.UpdateRolePermissionsFail:
    case AllianceActionTypes.RemoveRoleFail:
    case AllianceActionTypes.UpdateMemberRoleFail:
    case AllianceActionTypes.RejectInviteFail:
    case AllianceActionTypes.LeaveAllianceFail:
    case AllianceActionTypes.DestroyFail:
    case AllianceActionTypes.ProposeAllianceFail:
    case AllianceActionTypes.ProposeNapFail:
    case AllianceActionTypes.CancelAllianceFail:
    case AllianceActionTypes.CancelNapFail:
    case AllianceActionTypes.RejectAllianceFail:
    case AllianceActionTypes.RejectNapFail:
    case AllianceActionTypes.AcceptAllianceFail:
    case AllianceActionTypes.AcceptNapFail:
    case AllianceActionTypes.EndAllianceFail:
    case AllianceActionTypes.EndNapFail:
    case AllianceActionTypes.DeclareWarFail:
    case AllianceActionTypes.UpdateProfileFail:
    case AllianceActionTypes.RemoveAvatarFail: {
      return { ...state, error: action.payload, inProgress: false };
    }

    case AllianceActionTypes.ViewProfile: {
      return { ...state, viewedProfile: action.payload };
    }

    case AllianceActionTypes.LoadProfiles: {
      return {
        ...state,
        inProgress: true,
        loadingIds: {
          ...state.loadingIds,
          ...action.payload.reduce((result, id) => {
            result[id] = 1;
            return result;
          }, {}),
        }
      };
    }

    case AllianceActionTypes.LoadProfilesSuccess: {
      const { newIds, loadingIds } = Object.keys(action.payload).reduce((result, id) => {
        if (!state.entities[id]) { result.newIds.push(+id); }
        delete result.loadingIds[id];

        return result;
      }, { newIds: [], loadingIds: { ...state.loadingIds} });

      return {
        ...state,
        ids: state.ids.concat(newIds),
        entities: {
          ...state.entities,
          ...action.payload
        },
        inProgress: false,
        loadingIds,
      };
    }

    default: {
      return state;
    }
  }
}

export const getPlayerAlliance = (state: AllianceState) => state.playerAlliance;
export const getPlayerInvitations = (state: AllianceState) => state.invitations;
export const getPlayerAllianceData = (state: AllianceState) => ({
  alliance: state.playerAlliance,
  role: state.playerAlliance ? state.playerAlliance.roles.find(({ id }) => id === state.playerRole) : null,
});
export const getPlayerAllianceActiveDiplomacy = (state: AllianceState) => {
  const alliance = state.alliances[state.playerAlliance.id];
  return !alliance ? [] : [...alliance.diplomacyOrigin, ...alliance.diplomacyTarget].filter(({ status }) => status === DiplomacyStatus.ongoing);
};
export const getViewedAlliance = (state: AllianceState) => {
  const alliance = state.entities[state.viewedProfile];
  return alliance;
};
export const getAlliances = (state: AllianceState) => state.alliances;
export const getAllianceEntities = (state: AllianceState) => state.entities;

const eventMembership = (payload: AllianceEventSocketMessage<AllianceMember | number>, state: AllianceState, stateParams = {}): AllianceState => {
  const isJoin = payload.event.status === EventStatus.join;
  const alliance = state.playerAlliance;
  return {
    ...state,
    playerAlliance: {
      ...alliance,
      events: [payload.event, ...alliance.events],
      invitations: isJoin ?
        alliance.invitations.filter(({ id }) => id !== (payload.data as AllianceMember).id) :
        alliance.invitations,
      members: isJoin ?
        [{ ...payload.data as AllianceMember, allianceRoleId: alliance.defaultRoleId }, ...alliance.members] :
        alliance.members.filter(({ id }) => id !== payload.data)
    }
  };
};

const eventInvitation = (payload: AllianceEventSocketMessage<Profile | number>, state: AllianceState, stateParams = {}): AllianceState => {
  const isCreated = payload.event.status === EventStatus.create;
  const alliance = state.playerAlliance;
  return {
    ...state,
    playerAlliance: {
      ...alliance,
      events: [payload.event, ...alliance.events],
      invitations: isCreated ?
        [payload.data as Profile, ...alliance.invitations] :
        alliance.invitations.filter(({ id }) => id !== payload.data)
    },
    ...stateParams
  };
};

const eventRoles = (payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>, state: AllianceState, stateParams = {}): AllianceState => {
  const { created, updated, removed, updatedMember } = payload.data;
  const alliance = state.playerAlliance;
  let members = [...alliance.members];
  let roles = [...alliance.roles];
  let defaultRole = alliance.roles.find(({ id }) => id === alliance.defaultRoleId);
  let playerRole = state.playerRole;

  if (updated) {
    updated.forEach((role) => {
      const roleIndex = roles.findIndex(({ id }) => id === role.id);
      roles[roleIndex] = role;
      if (role.id === alliance.defaultRoleId) { defaultRole = role; }
      if (playerRole === role.id) { playerRole = role.id; }

      members = members.map((member) =>  member.allianceRole.id === role.id ? { ...member, allianceRole: role } : member);
    });
  }
  if (removed) {
    roles = roles.filter(({ id }) => !removed.includes(id));
    if (removed.includes(playerRole)) { playerRole = defaultRole.id; }

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
     playerRole,
    playerAlliance: {
      ...alliance,
      members,
      roles,
      defaultRole,
      events: [payload.event, ...alliance.events],
    },
  };
};

const eventDiplomacy = (payload: AllianceEventSocketMessage<AllianceDiplomacy | number>, state: AllianceState, stateParams = {}): AllianceState => {
  let diplomacy: { diplomacyTarget?: Partial<AllianceDiplomacy>[]; diplomacyOrigin?: Partial<AllianceDiplomacy>[] } = {};
  const alliance = state.playerAlliance;
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
    const type = (payload.data as AllianceDiplomacy).targetAllianceId === state.playerAlliance.id ? 'diplomacyTarget' : 'diplomacyOrigin';
    diplomacy[type] = [payload.data as AllianceDiplomacy, ...alliance[type]];
  }

  return {
    ...state,
    playerAlliance: {
      ...alliance,
      ...diplomacy,
      events: [payload.event, ...alliance.events],
    },
  };
};

const eventProfile = (payload: AllianceEventSocketMessage<ProfileUpdate>, state: AllianceState, stateParams = {}): AllianceState => {
  const alliance = state.playerAlliance;
  return {
    ...state,
    playerAlliance: {
      ...alliance,
      ...payload.data,
      events: [payload.event, ...alliance.events],
    },
  };
};
