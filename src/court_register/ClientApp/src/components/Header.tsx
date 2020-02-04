import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { store } from '../models/store';
import { Button, makeStyles, Theme, createStyles, Typography, CardActions, CardContent, LinearProgress } from '@material-ui/core';
import { GoogleLoginButton } from './GoogleLoginButton';
import useStyles from '../models/useStyles';

export default observer(() => {
    const classes = useStyles();
    const login = () => {
        store.auth.signIn();
    }

    const logout = () => {
        store.auth.signOut();
    }

    if (store.auth.loading)
        return <></>;

    return <Typography className={classes.root}>
        {!store.auth.isSignedIn ?
            <div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Реестр судебных дел администрации Волгограда
                            </Typography>
                    <Typography variant="body2" component="p">
                        Добро пожаловать в реестр судебных дел администрации Волгограда. Для дальнейшей работы необходимо выполнить вход!
                            </Typography>
                </CardContent>
                <CardContent>
                    <GoogleLoginButton />
                </CardContent>
            </div> :
            null
        }

        {store.auth.isSignedIn && store.auth.user && !store.auth.user.active ?
            <div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Реестр судебных дел администрации Волгограда
                            </Typography>
                    <Typography variant="body2" component="p">
                        Здравствуйте {store.auth.user.email}! Ваша учетная запись не активированна либо заблокированна.
                        Обратитесь к администратору системы.
                        </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" component="p">
                        Если пользователь был активирован, попробуйте обновить страницу.
                    </Typography>
                </CardContent>
                <CardContent>
                    <Button variant="contained" size="small" color="primary" onClick={logout}>Выйти</Button>
                </CardContent>
            </div> :
            null
        }

        {store.auth.isSignedIn && store.auth.user && store.auth.user.active ?
            <div>
                <CardContent>
                    <Typography variant="body2" component="p">
                        Здравствуйте {`${store.auth.user.first_name} ${store.auth.user.second_name}! Email: ${store.auth.user.email}`}, <
                            NavLink
                            to={`/`}
                            onClick={logout}>выход</NavLink>
                        </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" component="p">
                        <NavLink
                            activeClassName={classes.active}
                            type="button"
                            color="inherit"
                            to={`/cases`}>Реестр судебных дел</NavLink> / <
                            NavLink
                            activeClassName={classes.active}
                            to={`/management/user?email=${store.auth.user.email}`}
                        >Управление</NavLink> / <
                            NavLink
                            activeClassName={classes.active}
                            className="text-dark"
                            to={`/statistic`}>Статистика</NavLink>
                    </Typography>
                </CardContent>
            </div> :
            null
        }
    </Typography>;
});