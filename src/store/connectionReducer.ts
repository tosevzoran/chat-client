import { createReducer, createSelector } from '@reduxjs/toolkit';
import { AppState } from './types';

const connectionReducer = createReducer(
  {
    isLive: false,
  },
  {
    WS_CONNECTED: () => ({ isLive: true }),
    WS_DISCONNECTED: () => ({ isLive: false }),
  }
);

export const connectionSelector = createSelector(
  (state: AppState) => state.connection.isLive,
  (isLive) => isLive
);

export default connectionReducer;
