import { HttpErrorResponse } from '@angular/common/http';
import { BarCreationRequest, BarCreationResponse, LoginResponse } from '@bar-manager/api';
import { createAction, props } from '@ngrx/store';

export const loadBar = createAction('[bar] load bar', props<{ barCode: string }>());

export const loadBarSuccess = createAction('[bar] load bar success', props<{ loginResponse: LoginResponse }>());

export const loadBarFailure = createAction('[bar] load bar failure', props<{ error: HttpErrorResponse }>());

export const addBar = createAction('[bar] add bar', props<{ barCreationRequest: BarCreationRequest }>());
export const addBarSuccess = createAction(
  '[bar] add bar success',
  props<{ barCreationReponse: BarCreationResponse }>()
);
export const addBarFailure = createAction('[bar] add bar failure', props<{ error: HttpErrorResponse }>());
