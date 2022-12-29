import { Dispatch } from 'redux';
import { ActionType, ProjectAction, DefaultState } from '../actions/index';
import api from '../../lib/api'

export const fetchProjects = (sort: Boolean) => {
  return async (dispatch: Dispatch<ProjectAction>) => {
    dispatch({
      type: ActionType.GET_PROJECTS_PENDING
    })
    await api.getProjectsDiff().then(({ data }) => {
      dispatch({
        type: ActionType.GET_PROJECTS_SUCCESS,
        payload: data.slice().sort((a: DefaultState, b: DefaultState) => b.timestamp - a.timestamp),
      })
    }).catch((err) => {
      dispatch({
        type: ActionType.GET_PROJECTS_FAIL,
        payload: err
      })
    })
  }
}
