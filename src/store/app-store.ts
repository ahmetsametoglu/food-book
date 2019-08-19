import {ActionType} from './action-types';
import {Reducer, Dispatch} from 'react';

export type AppStateType = {
  showLoading: boolean;
  loadingText: string;
};

export type AppActionType = {
  type: ActionType;
  payload: AppPayloadType;
};

type AppPayloadType = {
  loadingText?: string;
};

export class AppAction {
  constructor(private dispatch: Dispatch<AppActionType>) {}

  public showLoading(text?: string) {
    return this.dispatch({
      type: 'ShowLoading',
      payload: {loadingText: text},
    });
  }

  public hideLoading() {
    return this.dispatch({
      type: 'HideLoading',
      payload: {},
    });
  }
}

export const initialAppState: AppStateType = {
  showLoading: false,
  loadingText: '',
};

export const AppReducer: Reducer<AppStateType, AppActionType> = (
  state = initialAppState,
  action,
) => {
  console.log(`[App Reducer]: ${action.type}`);

  switch (action.type) {
    case 'ShowLoading':
      return {
        ...state,
        showLoading: true,
        loadingText: !!action.payload.loadingText ? action.payload.loadingText : '',
      };

    case 'HideLoading':
      return {...state, showLoading: false, loadingText: ''};

    default:
      return {...state};
  }
};
