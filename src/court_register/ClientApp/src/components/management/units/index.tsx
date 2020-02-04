import * as React from 'react';
import { observer } from 'mobx-react';

import { store } from '../../../models/store';
import { User, Unit } from '../../../models';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import * as queryString from 'query-string';
import useStyles from '../../../models/useStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, CardContent, Button, IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type UnitsProps = {
    units: Unit[] | null;
    loading: boolean;
    loadUnits(): void;
    createUnit(): void;
    deleteUnitById(id: number | null): void;
    deletedId: number | null;
    setDeletedId(id: number | null): void;
}

const Units = (props: UnitsProps) => {
    React.useEffect(() => { props.loadUnits(); }, [])

    const classes = useStyles();
    const history = useHistory();

    const CreateUnit = () => {
        props.createUnit();        
    };

    const openUnit = (_id: number | null) => {
        history.push(`/management/unit?_id=${_id}`);
    };

    const handleClickOpenDeleteModal = (id: number | null) => {
        props.setDeletedId(id);
    };

    const handleClose = () => {
        props.setDeletedId(null);
    };

    const handleDelete = () => {
        props.deleteUnitById(props.deletedId);        
    };

    return (
        <>
            <Button onClick={CreateUnit}>Добавить</Button>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell>Полное название</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.units ?
                        props.units.map((unit: Unit) =>
                            <TableRow key={unit._id ? unit._id : undefined}>
                                <TableCell align="left">
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <EditIcon fontSize="inherit" onClick={() => { openUnit(unit._id) }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <DeleteIcon fontSize="inherit" onClick={() => { handleClickOpenDeleteModal(unit._id) }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{unit._id}</TableCell>
                                <TableCell>{unit.name}</TableCell>
                                <TableCell>{unit.full_name}</TableCell>
                            </TableRow>
                        ) : null}
                </TableBody>
            </Table>
            <Dialog
                open={!!props.deletedId}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Подтвержение на удаление"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы действительно хотите удалить подразделение id: {props.deletedId}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отменить
          </Button>
                    <Button onClick={handleDelete} variant="contained" color="secondary" autoFocus>
                        Подтвердить
          </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default observer(() => <Units
    units={store.page.units.units}
    loading={store.page.units.loading}
    loadUnits={store.page.units.loadUnits}
    createUnit={store.page.units.createUnit}
    deletedId={store.page.units.deletedId}
    setDeletedId={store.page.units.setDeletedId}
    deleteUnitById={store.page.units.deleteUnitById}
/>);