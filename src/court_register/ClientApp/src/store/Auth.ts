import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface AuthState {
    isLoading: boolean;
}

export interface RegisterAction { type: 'REGISTERED' }
export interface RequestRegisterAction { type: 'REQUEST_REGISTER' }

export type KnownAction = RegisterAction | RequestRegisterAction;

export const actionCreators = {
    registration: (email: string, password: string, confirm_password: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/registration`)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                dispatch({ type: 'REGISTERED' });
            });
        dispatch({ type: 'REQUEST_REGISTER' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<AuthState> = (state: AuthState | undefined, incomingAction: Action): AuthState => {
    if (state === undefined) {
        return { isLoading: false };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_REGISTER':
            return { isLoading: true };
        case 'REGISTERED':
            return { isLoading: false };
        default:
            return state;
    }
};
