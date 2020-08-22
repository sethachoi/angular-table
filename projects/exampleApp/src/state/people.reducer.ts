import { createReducer, on } from '@ngrx/store'
import { setData } from './people.actions'

export const initialPeopleState = []

const reducer = createReducer(
  initialPeopleState,
  on(setData, (state, { data }) => [...data])
)

export function stateReducer(state, action): any[] {
  return reducer(state, action)
}
