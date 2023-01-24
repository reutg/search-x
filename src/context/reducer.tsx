import { getStorage, removeFromStorage, saveToStorage } from "../Helpers";
import { AppStateType, HistoryType } from "./context";

export type AppActions = AddToHistory | RemoveFromHistory | GetHistory;

export enum ActionType {
  GetHistory,
  AddToHistory,
  RemoveFromHistory,
}

const AppReducer = (state: AppStateType, action: AppActions): AppStateType => {
  switch (action.type) {
    case ActionType.GetHistory:
      return {
        ...state,
        history: action.payload,
      };
    case ActionType.AddToHistory:
      return {
        ...state,
        history: { ...state.history, [action.payload]: true },
      };
    case ActionType.RemoveFromHistory:
      const newHistory = { ...state.history };
      newHistory[action.payload] = undefined;
      return {
        ...state,
        history: newHistory,
      };
    default:
      return state;
  }
};

type GetHistory = {
  type: ActionType.GetHistory;
  payload: HistoryType;
};

type AddToHistory = {
  type: ActionType.AddToHistory;
  payload: string;
};

type RemoveFromHistory = {
  type: ActionType.RemoveFromHistory;
  payload: string;
};

export const getHistoryFromStorage = (): GetHistory => {
  const data = getStorage();
  return {
    type: ActionType.GetHistory,
    payload: data,
  };
};

export const addToHistory = (key: string): AddToHistory => {
  saveToStorage(key);
  return {
    type: ActionType.AddToHistory,
    payload: key,
  };
};

export const removeFromHistory = (key: string): RemoveFromHistory => {
  removeFromStorage(key.toLowerCase());
  return {
    type: ActionType.RemoveFromHistory,
    payload: key,
  };
};

export default AppReducer;
