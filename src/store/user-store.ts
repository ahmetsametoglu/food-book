import {ActionType} from './action-types';
import {Reducer, Dispatch} from 'react';
import {User} from '../models/user';

export type UserStateType = {
  user?: User;
};

export type UserActionType = {
  type: ActionType;
  payload: UserPayloadType;
};

type UserPayloadType = {user?: User};

export class UserService {
  constructor(private dispatch: Dispatch<UserActionType>) {}

  setUser(user?: User) {
    this.dispatch({
      payload: {user: user},
      type: 'SetUser',
    });
  }
}

export const initialUserState: UserStateType = {user: undefined};

export const UserReducer: Reducer<UserStateType, UserActionType> = (
  state = initialUserState,
  action,
) => {
  console.log(`[User Reducer]: ${action.type}`);

  switch (action.type) {
    case 'SetUser':
      const user = action.payload.user;
      return {...state, user};

    default:
      return {...state};
  }
};
