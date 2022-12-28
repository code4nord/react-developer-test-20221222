import { Dispatch } from 'redux';
import { ActionType, UserAction } from '../actions/index';
import api from '../../lib/api'

export const fetchUsers = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: ActionType.GET_USERS_PENDING
    })
    await api.getUsersDiff().then(({ data }) => {
      dispatch({
        type: ActionType.GET_USERS_SUCCESS,
        payload: data,
      })
    }).catch((err) => {
      dispatch({
        type: ActionType.GET_USERS_FAIL,
        payload: err
      })
    })
  }
}

