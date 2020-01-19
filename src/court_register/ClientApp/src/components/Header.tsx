import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { store } from '../store';
import Settings from './settings/Settings';
import Management from './management/Management';
import CaseLink from './CaseLink';
import { Button, makeStyles, Theme, createStyles, Typography, CircularProgress, Box } from '@material-ui/core';
import { GoogleLoginButton } from './GoogleLoginButton'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            }
        },
    }),
);

export default observer(() => {
    const classes = useStyles();
    const login = () => {
        store.auth.signIn();
    }

    const logout = () => {
        store.auth.signOut();
    }

    if (store.auth.loading)
        return (
            <div className={classes.root}>
                <Box textAlign="justify">
                    <CircularProgress />
                </Box>
            </div>
        );

    return <Typography className={classes.root}>
        {!store.auth.isSignedIn ?
            <div>
                <Typography component="div">
                    <Box textAlign="justify">
                        Добро пожаловать в реестр судебных дел администрации Волгограда.
                        </Box>
                    <Box textAlign="justify">
                        Для дальнейшей работы необходимо выполнить вход!
                        </Box>
                </Typography>
                <Button variant="contained" color="primary" onClick={login}>Войти</Button>
                <GoogleLoginButton />
            </div> :
            null
        }

        {store.auth.isSignedIn && store.auth.user && !store.auth.user.active ?
            <div>
                <Typography component="div">
                    <Box textAlign="justify">
                        Здравствуйте {`${store.auth.user.first_name} ${store.auth.user.second_name}! Email: ${store.auth.user.email}`}, <
                            NavLink to="/" onClick={logout}>Выход</NavLink>.
                    </Box>
                    <Box textAlign="justify">
                        Ваша учетная запись не активированна либо заблокированна.
                        </Box>
                    <Box textAlign="justify">
                        Обратитесь к администратору системы.
                        </Box>
                    <Box textAlign="justify">
                        После активации пользователя перезагрузите страницу.
                        </Box>
                    <Button variant="contained" color="primary" onClick={logout}>Выйти</Button>
                </Typography>
            </div> :
            null
        }

        {store.auth.isSignedIn && store.auth.user && store.auth.user.active ?
            <div>
                <Typography component="div">
                    <Box textAlign="justify">
                        Здравствуйте {`${store.auth.user.first_name} ${store.auth.user.second_name}! Email: ${store.auth.user.email}`}, <
                            NavLink to="/" onClick={logout}>Выход</NavLink>, <
                                NavLink to={`/management/user?email=${store.auth.user.email}`}>Редактировать</NavLink>.
                    </Box>
                    <Box textAlign="justify">
                        <NavLink color="inherit" to="/">Реестр судебных дел</NavLink>
                    </Box>
                </Typography>

                <div>
                    <div><Settings /></div>
                    <div><Management /></div>
                    <div><CaseLink /></div>
                </div>
            </div> :
            null
        }
    </Typography>;
});