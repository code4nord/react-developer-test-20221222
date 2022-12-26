import { Action, ActionType } from '../actions/index';

export interface User {
  id: number,
  timestamp: number,
  diff: Array<diff>
}

interface diff {
  name: string,
  oldValue: string,
  newValue: string
}

interface State {
  users: User[],
  loading: boolean,
  error: string | null
}

const initState = {
  users: [],
  loading: false,
  error: null
}

const UserReducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_USERS_PENDING: {
      return {
        loading: true,
        users: [],
        error: null
      }
    }
    case ActionType.GET_USERS_SUCCESS: {
      return {
        loading: false,
        users: action.payload,
        error: null
      }
    }
    case ActionType.GET_USERS_FAIL: {
      return {
        loading: true,
        users: [],
        error: action.payload
      }
    }
    default:
      return state;
  }
}

export default UserReducer;