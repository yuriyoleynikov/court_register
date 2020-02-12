import * as React from 'react';
import { observer } from 'mobx-react';
import { store } from '../../../models/store';
import { Court } from '../../../models';
import useStyles from '../../../models/useStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, CardContent, Button, IconButton, Fab } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import { history } from '../../../router';

type CourtsProps = {
    loading: boolean;
    loadCourts(): void;
    courts: Court[] | null;

    createCourt(): void;

    deleteCourtById(id: number | null): void;
    deletedId: number | null;
    setDeletedId(id: number | null): void;
}

const Courts = (props: CourtsProps) => {
    React.useEffect(() => { props.loadCourts(); }, [])

    const classes = useStyles();

    const CreateCourt = () => {
        props.createCourt();
    };

    const openCourt = (_id: number | null) => {
        history.push(`/management/court?_id=${_id}`);
    };

    const handleClickOpenDeleteModal = (id: number | null) => {
        props.setDeletedId(id);
    };

    const handleClose = () => {
        props.setDeletedId(null);
    };

    const handleDelete = () => {
        props.deleteCourtById(props.deletedId);
    };

    return (
        <>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Fab color="primary" aria-label="add" onClick={CreateCourt}>
                                <AddIcon />
                            </Fab>
                        </TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell>Полное название</TableCell>
                        <TableCell>Адрес</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.courts ?
                        props.courts.map((court: Court) =>
                            <TableRow key={court._id ? court._id : undefined}>
                                <TableCell align="left">
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <EditIcon fontSize="inherit" onClick={() => { openCourt(court._id) }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <DeleteIcon fontSize="inherit" onClick={() => { handleClickOpenDeleteModal(court._id) }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{court._id}</TableCell>
                                <TableCell>{court.name}</TableCell>
                                <TableCell>{court.full_name}</TableCell>
                                <TableCell>{court.address}</TableCell>
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
                                Вы действительно хотите удалить суд Id: {props.deletedId}?
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

export default observer(() => <Courts
    courts={store.page.courts.courts}
    loading={store.page.courts.loading}
    loadCourts={store.page.courts.loadCourts}
    createCourt={store.page.courts.createCourt}
    deletedId={store.page.courts.deletedId}
    setDeletedId={store.page.courts.setDeletedId}
    deleteCourtById={store.page.courts.deleteCourtById}
/>);