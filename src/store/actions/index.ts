export interface DefaultState {
  id: number,
  timestamp: number,
  diff: diff[]
}

export interface Project {
  id: number,
  timestamp: number,
  diff: diff[]
}

export interface diff {
  name: string,
  oldValue: string,
  newValue: string
}

export interface UserState {
  data: DefaultState[],
  loading: boolean,
  errResp: {
    errMsg: string
  }
}

export interface State {
  data: DefaultState[],
  loading: boolean,
  errResp: {
    errMsg: string
  }
}

export enum ActionType {
  GET_USERS_PENDING = 'GET_USERS_PENDING',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_FAIL = 'GET_USERS_FAIL',
  GET_PROJECTS_PENDING = 'GET_PROJECTS_PENDING',
  GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS',
  GET_PROJECTS_FAIL = 'GET_PROJECTS_FAIL',
  SORT_USERS_ASC = 'SORT_USERS_ASC',
  SORT_USERS_DESC = 'SORT_USERS_DESC',
  SORT_PROJECTS_ASC = 'SORT_PROJECTS_ASC',
  SORT_PROJECTS_DESC = 'SORT_PROJECTS_DESC',
}

interface userActionPending {
  type: ActionType.GET_USERS_PENDING;
}

interface userActionSuccess {
  type: ActionType.GET_USERS_SUCCESS;
  payload: DefaultState[];
}

interface userActionFail {
  type: ActionType.GET_USERS_FAIL;
  payload: string;
}

interface projectActionPending {
  type: ActionType.GET_PROJECTS_PENDING;
}

interface projectActionSuccess {
  type: ActionType.GET_PROJECTS_SUCCESS;
  payload: DefaultState[];
}

interface sortUserAscAction {
  type: ActionType.SORT_USERS_ASC;
}
interface sortUserDescAction {
  type: ActionType.SORT_USERS_DESC;
}
interface sortProjectAscAction {
  type: ActionType.SORT_PROJECTS_ASC;
}
interface sortProjectDescAction {
  type: ActionType.SORT_PROJECTS_DESC;
}

interface projectActionFail {
  type: ActionType.GET_PROJECTS_FAIL;
  payload: string;
}

export type UserAction = userActionPending | userActionSuccess | userActionFail | sortUserAscAction | sortUserDescAction;
export type ProjectAction = projectActionPending | projectActionSuccess | projectActionFail | sortProjectAscAction | sortProjectDescAction;