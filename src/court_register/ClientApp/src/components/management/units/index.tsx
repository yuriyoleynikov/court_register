import * as React from 'react';
import { observer } from 'mobx-react';
import { store } from '../../../models/store';
import { Unit } from '../../../models';
import useStyles from '../../../models/useStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, CardContent, Button, IconButton, Fab } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import { history } from '../../../router';

type UnitsProps = {
    loading: boolean;
    loadUnits(): void;
    units: Unit[] | null;

    createUnit(): void;

    deleteUnitById(id: number | null): void;
    deletedId: number | null;
    setDeletedId(id: number | null): void;
}

const Units = (props: UnitsProps) => {
    React.useEffect(() => { props.loadUnits(); }, [])

    const classes = useStyles();

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
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Fab color="primary" aria-label="add" onClick={CreateUnit}>
                                <AddIcon />
                            </Fab>
                        </TableCell>
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
                open={!(props.deletedId === null)}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Typography className={classes.root}>
                    <div>
                        <CardContent>
                            <Typography variant="body2" component="p">
                                Подтвердите действие
                            </Typography>
                            <Typography variant="body2" component="p">
                                Вы действительно хотите удалить подразделение Id: {props.deletedId}?
                            </Typography>
                        </CardContent>
                    </div>
                </Typography>

                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary" size="small">Отменить</Button>
                    <Button onClick={handleDelete} variant="contained" color="secondary" size="small" autoFocus>Подтвердить</Button>
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