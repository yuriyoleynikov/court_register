import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

declare var window: any;

export interface AuthenticationState {
    isLoading: boolean;
    isLoadingAuth2: boolean;
    isDownloadAuth2: boolean;
    isAuth: boolean;
    email: string;
}

interface DownloadAuth2Action {
    type: 'DOWNLOAD_AUTH_2';
}

interface SetUserAction {
    type: 'SET_USER';
    payload: {
        isAuth: boolean;
        email: string;
    }
}

interface LoadingInOutAction {
    type: 'LOADING_IN_OUT';
}

type KnownAction = DownloadAuth2Action | SetUserAction | LoadingInOutAction;

export const actionCreators = {
    loadingAuth2: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        window.gapi.load('auth2', function () {
            window.gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
            }).then(() => { console.log('init ok'); dispatch({ type: 'DOWNLOAD_AUTH_2' }); })
        });
    },
    CheckAuth: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let googleAuth = window.gapi.auth2.getAuthInstance();
        if (googleAuth.isSignedIn.get())
            dispatch({
                type: 'SET_USER',
                payload: {
                    isAuth: true,
                    email: googleAuth.currentUser.get().getBasicProfile().getEmail()
                }
            });
    },
    requestLogIn: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({ type: 'LOADING_IN_OUT' })
        let googleAuth = window.gapi.auth2.getAuthInstance();
        let response = await googleAuth.signIn({
            scope: 'profile email'
        });
        dispatch({
            type: 'SET_USER',
            payload: {
                isAuth: true,
                email: googleAuth.currentUser.get().getBasicProfile().getEmail()
            }
        });
    },
    requestLogOut: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({ type: 'LOADING_IN_OUT' })
        let googleAuth = window.gapi.auth2.getAuthInstance();
        let response = await googleAuth.signOut();

        dispatch({
            type: 'SET_USER',
            payload: {
                isAuth: false,
                email: ''
            }
        });
    }
};

const unloadedState: AuthenticationState = {
    isLoading: false,
    isLoadingAuth2: true,
    isDownloadAuth2: false,
    isAuth: false,
    email: ''
};

export const reducer: Reducer<AuthenticationState> = (state: AuthenticationState | undefined, incomingAction: Action): AuthenticationState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'DOWNLOAD_AUTH_2':
            return {
                ...state,
                isLoadingAuth2: false,
                isDownloadAuth2: true
            };
        case 'SET_USER':
            return {
                ...state,
                isLoading: false,
                isAuth: action.payload.isAuth,
                email: action.payload.email
            };
        case 'LOADING_IN_OUT':
            return {
                ...state,
                isLoading: true
            };
            break;
    }

    return state;
};
