import { createAction, props } from '@ngrx/store'

export const setLoading = createAction('[Loading State] set', props<{loading: boolean}>())
