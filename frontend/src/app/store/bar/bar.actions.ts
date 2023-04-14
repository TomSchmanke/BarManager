import { createAction, props } from '@ngrx/store';

export const loadBar = createAction(
  '[bar] load bar',
  props<{ uid: string }>()
);

export const loadBarSuccess = createAction(
  '[bar] load bar success',
  props<{ bar: any }>()
);

export const loadBarFailure = createAction(
  '[bar] load bar failure',
  props<{ error: any }>()
);