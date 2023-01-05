import { Dispatch } from 'redux';
import { ActionType, UserAction, DefaultState } from '../actions/index';
import api from '../../lib/api';


export const fetchUsers = (sort: Boolean) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: ActionType.GET_USERS_PENDING
    })
    await api.getUsersDiff().then(({ data }) => {

      dispatch({
        type: ActionType.GET_USERS_SUCCESS,
        payload: (sort ? data.slice().sort((a: DefaultState, b: DefaultState) => b.timestamp - a.timestamp) : data.slice().sort((a: DefaultState, b: DefaultState) => a.timestamp - b.timestamp)),
      })
    }).catch((err) => {
      dispatch({
        type: ActionType.GET_USERS_FAIL,
        payload: err
      })
    })
  }
}

