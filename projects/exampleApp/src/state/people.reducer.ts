import { createReducer, on } from '@ngrx/store'
import { setData } from './people.actions'

export const initialPeopleState = []

const _reducer = createReducer(
  initialPeopleState,
  on(setData, (state, { data }) => [...data])
)

export function stateReducer(state, action) {
  return _reducer(state, action)
}