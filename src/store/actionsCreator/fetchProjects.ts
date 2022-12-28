import { Dispatch } from 'redux';
import { ActionType, ProjectAction } from '../actions/index';
import api from '../../lib/api'

export const fetchProjects = () => {
  return async (dispatch: Dispatch<ProjectAction>) => {
    dispatch({
      type: ActionType.GET_PROJECTS_PENDING
    })
    await api.getProjectsDiff().then(({ data }) => {
      dispatch({
        type: ActionType.GET_PROJECTS_SUCCESS,
        payload: data,
      })
    }).catch((err) => {
      dispatch({
        type: ActionType.GET_PROJECTS_FAIL,
        payload: err
      })
    })
  }
}
