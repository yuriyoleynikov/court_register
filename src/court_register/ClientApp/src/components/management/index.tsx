import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { store } from '../../models/store';
import { CardContent, Typography } from '@material-ui/core';
import useStyles from '../../models/useStyles';

export default observer(() => {
    const classes = useStyles();
    return (<div>
        {store.auth.isSignedIn && store.auth.user && store.auth.user.active ?
            <div>
                <CardContent>
                    <Typography variant="body2" component="p">
                        <NavLink
                            activeClassName={classes.active}
                            to={`/management/users?active=true`}
                        >Пользователи</NavLink> / <
                            NavLink
                            activeClassName={classes.active}
                            to={`/management/units`}
                        >Подразделения</NavLink> / <
                            NavLink
                            activeClassName={classes.active}
                            to={`/management/courts`}
                        >Суды</NavLink>
                    </Typography>
                </CardContent>
            </div> :
            null
        }
    </div>)
});
