import React from "react";
import { AppActions } from "./reducer";

export type HistoryType = { [key: string]: boolean | undefined };

export type AppStateType = { history: HistoryType };

type AppContextType = {
  state: AppStateType;
  dispatch: React.Dispatch<AppActions>;
};

export const initialState: AppStateType = { history: {} };

export const AppContext = React.createContext<AppContextType>({
  state: initialState,
  dispatch: () => undefined,
});
