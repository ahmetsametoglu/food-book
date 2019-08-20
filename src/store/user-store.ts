import {ActionType} from './action-types';
import {Reducer, Dispatch} from 'react';

export type UserStateType = {};

export type UserActionType = {
  type: ActionType;
  payload?: UserPayloadType;
};

type UserPayloadType = {};

export class UserService {
  constructor(private dispatch: Dispatch<UserActionType>) {}
}

export const initialUserState: UserStateType = {};

export const UserReducer: Reducer<UserStateType, UserActionType> = (
  state = initialUserState,
  action,
) => {
  console.log(`[User Reducer]: ${action.type}`);

  switch (action.type) {
    default:
      return {...state};
  }
};
