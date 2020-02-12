import * as React from 'react';
import { observer } from 'mobx-react';
import { store } from '../../../models/store';
import { Person } from '../../../models';
import useStyles from '../../../models/useStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, CardContent, Button, IconButton, Fab } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import { history } from '../../../router';
import { NavLink } from 'react-router-dom';

type PersonsProps = {
    _type: string | null;

    loading: boolean;
    loadPersons(_type: string | null): void;
    persons: Person[] | null;
    createPerson(_type: string | null): void;
    deletePersonById(id: number | null): void;
    deletedId: number | null;
    setDeletedId(id: number | null): void;
}

const Persons = (props: PersonsProps) => {
    React.useEffect(() => { props.loadPersons(props._type); }, [props._type])

    const classes = useStyles();

    const CreatePerson = (_type: string | null) => {
        props.createPerson(_type);
    };

    const openPerson = (_id: number | null) => {
        history.push(`/management/person?_id=${_id}`);
    };

    const handleClickOpenDeleteModal = (id: number | null) => {
        props.setDeletedId(id);
    };

    const handleClose = () => {
        props.setDeletedId(null);
    };

    const handleDelete = () => {
        props.deletePersonById(props.deletedId);
    };

    return (
        <>
            <CardContent>
                <Typography variant="body2" component="p">
                    <div>{props._type !== `ul` ? <NavLink to={`/management/persons?_type=ul`}>Юридические лица</NavLink> :
                        <>Юридические лица</>}</div>
                    <div>{props._type !== `fl` ? <NavLink to={`/management/persons?_type=fl`}>Физические лица</NavLink> :
                        <>Физические лица</>}</div>
                    <div>{props._type !== `adm` ? <NavLink to={`/management/persons?_type=adm`}>Администрация</NavLink> :
                        <>Администрация</>}</div>
                </Typography>
            </CardContent>

            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Fab color="primary" aria-label="add" onClick={() => { CreatePerson(props._type) }}>
                                <AddIcon />
                            </Fab>
                        </TableCell>
                        <TableCell>Id</TableCell>
                        {props._type == `ul` || props._type == `adm` ? <TableCell>Название</TableCell> : null}
                        {props._type == `ul` ? <TableCell>ИНН</TableCell> : null}
                        {props._type == `fl` ? <TableCell>Фамилия</TableCell> : null}
                        {props._type == `fl` ? <TableCell>Имя</TableCell> : null}
                        {props._type == `fl` ? <TableCell>Отчество</TableCell> : null}
                        <TableCell>Адрес</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.persons ?
                        props.persons.map((person: Person) =>
                            <TableRow key={person._id ? person._id : undefined}>
                                <TableCell align="left">
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <EditIcon fontSize="inherit" onClick={() => { openPerson(person._id) }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <DeleteIcon fontSize="inherit" onClick={() => { handleClickOpenDeleteModal(person._id) }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{person._id}</TableCell>
                                {props._type == `ul` || props._type == `adm` ? <TableCell>{person.entity ? person.entity.name : null}</TableCell> : null}
                                {props._type == `ul` ? <TableCell>{person.entity ? person.entity.inn : null}</TableCell> : null}
                                {props._type == `fl` ? <TableCell>{person.individual ? person.individual.second_name
                                    : null}</TableCell> : null}
                                {props._type == `fl` ? <TableCell>{person.individual ? person.individual.first_name
                                    : null}</TableCell> : null}
                                {props._type == `fl` ? <TableCell>{person.individual ? person.individual.third_name
                                    : null}</TableCell> : null}
                                <TableCell>{person.address}</TableCell>
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
                                Вы действительно хотите удалить Id: {props.deletedId}?
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

export default observer((props: {
    _type: string | null
}) => <Persons
        _type={props._type}

        persons={store.page.persons.persons}
        loading={store.page.persons.loading}
        loadPersons={store.page.persons.loadPersons}
        createPerson={store.page.persons.createPerson}
        deletedId={store.page.persons.deletedId}
        setDeletedId={store.page.persons.setDeletedId}
        deletePersonById={store.page.persons.deletePersonById}
    />);