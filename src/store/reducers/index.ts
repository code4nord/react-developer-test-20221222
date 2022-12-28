import { UserAction, ActionType, UserState, State, ProjectAction } from '../actions/index';

const userInitState: State = {
  data: [],
  loading: false,
  errResp: {
    errMsg: ""
  }
};

const projectInitState: State = {
  data: [],
  loading: false,
  errResp: {
    errMsg: ""
  }
};

export const UserReducer = (state: UserState = userInitState, action: UserAction): UserState => {
  switch (action.type) {
    case ActionType.SORT_USERS_DESC: {
      return {
        data: state.data.slice().sort((a, b) => b.timestamp - a.timestamp),
        loading: false,
        errResp: {
          errMsg: ""
        }
      }
    }
    case ActionType.SORT_USERS_ASC: {
      return {
        data: state.data.slice().sort((a, b) => a.timestamp - b.timestamp),
        loading: false,
        errResp: {
          errMsg: ""
        }
      }
    }
    case ActionType.GET_USERS_PENDING: {
      return {
        ...state,
        loading: true,
        errResp: {
          errMsg: ""
        }
      }
    }
    case ActionType.GET_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }
    case ActionType.GET_USERS_FAIL: {
      return {
        ...state,
        loading: false,
        errResp: {
          errMsg: action.payload
        }
      }
    }
    default:
      return state;
  }
}

export const ProjectReducer = (state: State = projectInitState, action: ProjectAction): State => {
  switch (action.type) {
    case ActionType.GET_PROJECTS_PENDING: {
      return {
        ...state,
        loading: true,
        errResp: {
          errMsg: ""
        }
      }
    }
    case ActionType.GET_PROJECTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }
    case ActionType.GET_PROJECTS_FAIL: {
      return {
        ...state,
        loading: false,
        errResp: {
          errMsg: action.payload
        }
      }
    }
    default:
      return state;
  }
}
