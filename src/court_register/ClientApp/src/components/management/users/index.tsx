import * as React from 'react';
import { observer } from 'mobx-react';
import { store } from '../../../models/store';
import { User } from '../../../models';
import { NavLink } from 'react-router-dom';
import * as queryString from 'query-string';
import useStyles from '../../../models/useStyles';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, CardContent } from '@material-ui/core';

type UsersProps = {
    users: User[] | null;
    loading: boolean;
    loadUsers(active: boolean): void;
    active: string | null;
};


const Users = (props: UsersProps) => {
    React.useEffect(() => {
        let queryFilter = queryString.parse(window.location.search);
        props.loadUsers(queryFilter.active == 'true');
    }, [props.active]);

    const classes = useStyles();

    return (
        <>
            <CardContent>
                <Typography variant="body2" component="p">
                    {
                        props.active == `true` ?
                            <NavLink  to={`/management/users?active=false`}
                            >Показать неактивных</NavLink>
                            :
                            <NavLink to={`/management/users?active=true`}
                            >Показать активных</NavLink>
                    }
                </Typography>
            </CardContent>

            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>ФИО</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users ?
                        props.users.map((user: User) =>
                            <TableRow key={user.email ? user.email : undefined}>
                                <TableCell>
                                    <NavLink to={`/management/user?email=${user.email}`}>Открыть</NavLink>
                                </TableCell>
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{`${user.second_name ? user.second_name : ''} ${user.first_name ?
                                    user.first_name : ''} ${user.third_name ? user.third_name : ''}`}</TableCell>
                            </TableRow>
                        ) : null}
                </TableBody>
            </Table>
        </>
    );
};

export default observer((props: {
    active: string | null;
}) => <Users
        active={props.active}
        users={store.page.users.users}
        loading={store.page.users.loading}
        loadUsers={store.page.users.loadUsers}        
    />);