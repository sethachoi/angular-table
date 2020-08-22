import { createAction, props } from '@ngrx/store'
import { PersonType } from '../types'

export const setData = createAction('[Global State] set', props<{data: PersonType[]}>())
