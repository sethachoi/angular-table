import { createReducer, on } from '@ngrx/store'
import { setLoading } from './loading.actions'

export const initialState = false

const reducer = createReducer(
  initialState,
  on(setLoading, (state, { loading }) => loading)
)

export function loadingReducer(state, action): boolean {
  return reducer(state, action)
}
