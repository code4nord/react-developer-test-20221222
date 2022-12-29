import { Dispatch } from 'redux';
import { ActionType, UserAction, ProjectAction } from '../actions/index';

export const userSorting = (sortType: boolean) => {
  if (sortType)
    return (dispatch: Dispatch<UserAction>) => {
      dispatch({
        type: ActionType.SORT_USERS_DESC,
      })
    }
  else {
    return (dispatch: Dispatch<UserAction>) => {
      dispatch({
        type: ActionType.SORT_USERS_ASC,
      })
    }
  }
}

export const projectSorting = (sortType: boolean) => {
  if (sortType)
    return (dispatch: Dispatch<ProjectAction>) => {
      dispatch({
        type: ActionType.SORT_PROJECTS_DESC,
      })
    }
  else {
    return (dispatch: Dispatch<ProjectAction>) => {
      dispatch({
        type: ActionType.SORT_PROJECTS_ASC,
      })
    }
  }
}