import { configureStore } from '@reduxjs/toolkit'

import { UserReducer, ProjectReducer } from './reducers'

export const store = configureStore({
  reducer: {
    user: UserReducer,
    project: ProjectReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch