import { Dispatch } from 'redux';
import { ActionType, Action } from '../actions/index';
import api from '../../lib/api'

export const fetchUsers = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_USERS_PENDING
    })

    await api.getUsersDiff().then((data) => {
      console.log(data);
      dispatch({
        type: ActionType.GET_USERS_SUCCESS,
        payload: data,
      })
    }).catch((err) => {
      console.log(err);
      dispatch({
        type: ActionType.GET_USERS_FAIL,
        payload: err
      })
    })
  }
}

