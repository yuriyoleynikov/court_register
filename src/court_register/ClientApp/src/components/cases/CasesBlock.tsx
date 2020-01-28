import * as React from 'react';
import { observer } from 'mobx-react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';

import { store } from '../../store';
import { Case } from '../../models/MyClasses';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Fab, IconButton, CardContent, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { SettingsCase } from "./../../models/MyClasses";
import filterForCases from '../../models/filterForCases';
import MaterialTextField from '../inputs/MaterialTextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CasesStore } from '../../models/CasesStore';

type CasesContainerProps = {
    cases: Case[] | null;
    loading: boolean;
    isCreateCaseLoaded: boolean;
    settingsCase: SettingsCase;
    loadCases(): void;
    loadSettingsCase(): void;
    currentId: string | null;


    reg_number: string | null;
    case_number: string | null;
    court: string | null;
    unit: string | null;
    type_role: string | null;
    category: string | null;
    status: string | null;
    executor: string | null;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
        title: {
            flex: '1 1 100%',
        },
        margin: {
            margin: theme.spacing(1),
        }
    }));

const CasesContainer = observer((props: CasesContainerProps) => {
    const classes = useStyles();
    const history = useHistory();

    const createCase = () => {
        store.case_edit.createCase();
        store.case_edit.isCreateCaseLoaded = false;
    }

    const openCase = (id: number | null) => {
        history.push(`/case?_id=${id}`);
    }

    const changeUrl = (param: string, value: string | null) => {
        let newUrl = `/cases`;

        if (props.reg_number || props.case_number || props.court || props.unit ||
            props.type_role || props.category || props.status || props.executor || value) {
            newUrl = newUrl + '?';
        }
        else {
            history.replace(newUrl);
            return;
        }

        let noParamUrl = newUrl;
        const addAnd = () => (newUrl.length == noParamUrl.length ? '' : '&');

        if (param == 'reg_number') {
            if (value) {
                newUrl = newUrl + addAnd() + param + '=' + value;
            }
        }
        else {
            if (props.reg_number) {
                newUrl = newUrl + addAnd() + 'reg_number' + '=' + props.reg_number;
            }
        }

        if (param == 'case_number') {
            if (value) {
                newUrl = newUrl + addAnd() + param + '=' + value;
            }
        }
        else {
            if (props.case_number) {
                newUrl = newUrl + addAnd() + 'case_number' + '=' + props.case_number;
            }
        }

        if (param == 'court') {
            if (value) {
                newUrl = newUrl + addAnd() + param + '=' + value;
            }
        }
        else {
            if (props.court) {
                newUrl = newUrl + addAnd() + 'court' + '=' + props.court;
            }
        }

        if (param == 'unit') {
            if (value) {
                newUrl = newUrl + addAnd() + param + '=' + value;
            }
        }
        else {
            if (props.unit) {
                newUrl = newUrl + addAnd() + 'unit' + '=' + props.unit;
            }
        }

        if (param == 'type_role') {
            if (value) {
                newUrl = newUrl + addAnd() + param + '=' + value;
            }
        }
        else {
            if (props.type_role) {
                newUrl = newUrl + addAnd() + 'type_role' + '=' + props.type_role;
            }
        }

        if (param == 'category') {
            if (value) {
                newUrl = newUrl + addAnd() + param + '=' + value;
            }
        }
        else {
            if (props.category) {
                newUrl = newUrl + addAnd() + 'category' + '=' + props.category;
            }
        }

        if (param == 'status') {
            if (value) {
                newUrl = newUrl + addAnd() + param + '=' + value;
            }
        }
        else {
            if (props.status) {
                newUrl = newUrl + addAnd() + 'status' + '=' + props.status;
            }
        }

        if (param == 'executor') {
            if (value) {
                newUrl = newUrl + addAnd() + param + '=' + value;
            }
        }
        else {
            if (props.executor) {
                newUrl = newUrl + addAnd() + 'executor' + '=' + props.executor;
            }
        }

        history.replace(newUrl);

        console.log(param, value, newUrl);
    };
    React.useEffect(() => {
        props.loadSettingsCase();
        props.loadCases();
        return () => {
            store.cases = new CasesStore();
            store.case_edit.currentId = null;
            store.case_edit.isCreateCaseLoaded = false;
        }
    }, []);

    if (props.loading) {
        return <></>;
    }

    if (props.isCreateCaseLoaded) {
        return <><Redirect to={`/case?_id=${props.currentId}`} /></>;
    }

    return (
        <>
            <Button variant="contained" size="small" color="primary" onClick={createCase}>Добавить</Button>
            <Typography className={classes.title} variant="h6" id="tableTitle">
                {/*<NavLink to="/case">
                    <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
                        <AddIcon />
                    </Fab>
                </NavLink>*/}
                Список дел
        </Typography>

            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="left">
                            <TextField
                                id="outlined-basic"
                                label="N Рег."
                                variant="outlined"
                                defaultValue={props.reg_number ? props.reg_number : undefined}
                                onChange={(event) => { changeUrl(`reg_number`, event.target.value); }}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                disableClearable={true}
                                options={props.settingsCase && props.settingsCase.courts ?
                                    props.settingsCase.courts.map(option => option.name) : undefined}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Суд"
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                defaultValue={props.court ? props.court : undefined}
                                onInputChange={(event, value) => { changeUrl(`court`, value); }}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                defaultValue={props.case_number ? props.case_number : undefined}
                                onChange={(event) => { changeUrl(`case_number`, event.target.value); }}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                disableClearable={true}
                                options={props.settingsCase && props.settingsCase.type_roles ?
                                    props.settingsCase.type_roles.map(option => option.name) : undefined}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                defaultValue={props.type_role ? props.type_role : undefined}
                                onInputChange={(event, value) => { changeUrl(`type_role`, value); }}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                disableClearable={true}
                                options={props.settingsCase && props.settingsCase.category ?
                                    props.settingsCase.category.map(option => option.name) : undefined}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                defaultValue={props.category ? props.category : undefined}
                                onInputChange={(event, value) => { changeUrl(`category`, value); }}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                disableClearable={true}
                                options={props.settingsCase && props.settingsCase.units ?
                                    props.settingsCase.units.map(option => option.name) : undefined}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                defaultValue={props.unit ? props.unit : undefined}
                                onInputChange={(event, value) => { changeUrl(`unit`, value); }}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                disableClearable={true}
                                options={props.settingsCase && props.settingsCase.executors ?
                                    props.settingsCase.executors.map(option => option.full_name) : undefined}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                defaultValue={props.executor ? props.executor : undefined}
                                onInputChange={(event, value) => { changeUrl(`executor`, value); }}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                disableClearable={true}
                                options={props.settingsCase && props.settingsCase.statuses ?
                                    props.settingsCase.statuses.map(option => option.name) : undefined}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                defaultValue={props.status ? props.status : undefined}
                                onInputChange={(event, value) => { changeUrl(`status`, value); }}
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableHead>
                    <TableRow>
                        <TableCell><b>N</b></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="left"><b>N Рег.</b></TableCell>
                        <TableCell align="left"><b>Суд</b></TableCell>
                        <TableCell align="left"><b>N Дела</b></TableCell>
                        <TableCell align="left"><b>Роль</b></TableCell>
                        <TableCell align="left"><b>Категория</b></TableCell>
                        <TableCell align="left"><b>Ответственный</b></TableCell>
                        <TableCell align="left"><b>Исполнитель</b></TableCell>
                        <TableCell align="left"><b>Состояние</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.cases ?
                        props.cases.map((currentCase: Case, index: number) =>
                            <TableRow key={currentCase._id ? currentCase._id : 0}>
                                <TableCell component="th" scope="row">{++index}</TableCell>
                                <TableCell align="left">
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <EditIcon fontSize="inherit" onClick={() => { openCase(currentCase._id) }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left">{currentCase.reg_number}</TableCell>
                                <TableCell align="left">{currentCase.court ? currentCase.court.name : null}</TableCell>
                                <TableCell align="left">{currentCase.case_number}</TableCell>
                                <TableCell align="left">{currentCase.type_role ? currentCase.type_role.name : null}</TableCell>
                                <TableCell align="left">{currentCase.category ? currentCase.category.name : null}</TableCell>
                                <TableCell align="left">{currentCase.unit ? currentCase.unit.name : null}</TableCell>
                                <TableCell align="left">{currentCase.executor ? currentCase.executor.full_name : null}</TableCell>
                                <TableCell align="left">{currentCase.state && currentCase.state[0] ? currentCase.state.map((s, i: number) =>
                                    <div key={i}>{`${++i}(${s ? s.short_sign : ``})`}</div>) : null}</TableCell>
                            </TableRow>
                        ) : null}
                </TableBody>
            </Table>
        </>);
});

export default observer((props: {
    reg_number: string | null;
    case_number: string | null;
    court: string | null;
    unit: string | null;
    type_role: string | null;
    category: string | null;
    status: string | null;
    executor: string | null;
}) => <CasesContainer
        reg_number={props.reg_number}
        case_number={props.case_number}
        court={props.court}
        unit={props.unit}
        type_role={props.type_role}
        category={props.category}
        status={props.status}
        executor={props.executor}

        loadSettingsCase={store.cases.loadSettingsCase}
        settingsCase={store.cases.settingsCase}
        loading={store.cases.loading}
        isCreateCaseLoaded={store.case_edit.isCreateCaseLoaded}
        loadCases={store.cases.loadCases}
        cases={store.cases.cases}
        currentId={store.case_edit.currentId}
    />);

//import React from 'react';
//import clsx from 'clsx';
//import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
//import TablePagination from '@material-ui/core/TablePagination';
//import TableRow from '@material-ui/core/TableRow';
//import TableSortLabel from '@material-ui/core/TableSortLabel';
//import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
//import Paper from '@material-ui/core/Paper';
//import Checkbox from '@material-ui/core/Checkbox';
//import IconButton from '@material-ui/core/IconButton';
//import Tooltip from '@material-ui/core/Tooltip';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Switch from '@material-ui/core/Switch';
//import DeleteIcon from '@material-ui/icons/Delete';
//import FilterListIcon from '@material-ui/icons/FilterList';
//import { NavLink } from 'react-router-dom';
//import { Fab } from '@material-ui/core';
//import AddIcon from '@material-ui/icons/Add';

//interface Data {
//    calories: number;
//    carbs: number;
//    fat: number;
//    name: string;
//    protein: number;
//}

//function createData(
//    name: string,
//    calories: number,
//    fat: number,
//    carbs: number,
//    protein: number,
//): Data {
//    return { name, calories, fat, carbs, protein };
//}

//const rows = [
//    createData('Капкейк', 305, 3.7, 67, 4.3),
//    createData('Пончик', 452, 25.0, 51, 4.9),
//    createData('Эклер', 262, 16.0, 24, 6.0),
//    createData('Йогуртовое мороженное', 159, 6.0, 24, 4.0),
//    createData('Имбирный пряник', 356, 16.0, 49, 3.9),
//    createData('Honeycomb', 408, 3.2, 87, 6.5),
//    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//    createData('Jelly Bean', 375, 0.0, 94, 0.0),
//    createData('KitKat', 518, 26.0, 65, 7.0),
//    createData('Lollipop', 392, 0.2, 98, 0.0),
//    createData('Marshmallow', 318, 0, 81, 2.0),
//    createData('Nougat', 360, 19.0, 9, 37.0),
//    createData('Oreo', 437, 18.0, 63, 4.0),
//];

//function desc<T>(a: T, b: T, orderBy: keyof T) {
//    if (b[orderBy] < a[orderBy]) {
//        return -1;
//    }
//    if (b[orderBy] > a[orderBy]) {
//        return 1;
//    }
//    return 0;
//}

//function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
//    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//    stabilizedThis.sort((a, b) => {
//        const order = cmp(a[0], b[0]);
//        if (order !== 0) return order;
//        return a[1] - b[1];
//    });
//    return stabilizedThis.map(el => el[0]);
//}

//type Order = 'asc' | 'desc';

//function getSorting<K extends keyof any>(
//    order: Order,
//    orderBy: K,
//): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
//    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
//}

//interface HeadCell {
//    disablePadding: boolean;
//    id: keyof Data;
//    label: string;
//    numeric: boolean;
//}

//const headCells: HeadCell[] = [
//    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
//];

//interface EnhancedTableProps {
//    classes: ReturnType<typeof useStyles>;
//    numSelected: number;
//    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
//    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
//    order: Order;
//    orderBy: string;
//    rowCount: number;
//}

//function EnhancedTableHead(props: EnhancedTableProps) {
//    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//        onRequestSort(event, property);
//    };

//    return (
//        <TableHead>
//            <TableRow>
//                <TableCell padding="checkbox">
//                    <Checkbox
//                        indeterminate={numSelected > 0 && numSelected < rowCount}
//                        checked={numSelected === rowCount}
//                        onChange={onSelectAllClick}
//                        inputProps={{ 'aria-label': 'select all desserts' }}
//                    />
//                </TableCell>
//                {headCells.map(headCell => (
//                    <TableCell
//                        key={headCell.id}
//                        align={headCell.numeric ? 'right' : 'left'}
//                        padding={headCell.disablePadding ? 'none' : 'default'}
//                        sortDirection={orderBy === headCell.id ? order : false}
//                    >
//                        <TableSortLabel
//                            active={orderBy === headCell.id}
//                            direction={order}
//                            onClick={createSortHandler(headCell.id)}
//                        >
//                            {headCell.label}
//                            {orderBy === headCell.id ? (
//                                <span className={classes.visuallyHidden}>
//                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                </span>
//                            ) : null}
//                        </TableSortLabel>
//                    </TableCell>
//                ))}
//            </TableRow>
//        </TableHead>
//    );
//}

//const useToolbarStyles = makeStyles((theme: Theme) =>
//    createStyles({
//        root: {
//            paddingLeft: theme.spacing(2),
//            paddingRight: theme.spacing(1),
//        },
//        highlight:
//            theme.palette.type === 'light'
//                ? {
//                    color: theme.palette.secondary.main,
//                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//                }
//                : {
//                    color: theme.palette.text.primary,
//                    backgroundColor: theme.palette.secondary.dark,
//                },
//        title: {
//            flex: '1 1 100%',
//        },
//        margin: {
//            margin: theme.spacing(1),
//        },
//        extendedIcon: {
//            marginRight: theme.spacing(1),
//        },
//    }),
//);

//interface EnhancedTableToolbarProps {
//    numSelected: number;
//}

//const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
//    const classes = useToolbarStyles();
//    const { numSelected } = props;

//    return (
//        <Toolbar
//            className={clsx(classes.root, {
//                [classes.highlight]: numSelected > 0,
//            })}
//        >
//            {numSelected > 0 ? (
//                <Typography className={classes.title} color="inherit" variant="subtitle1">
//                    {numSelected} selected
//        </Typography>
//            ) : (
//                    <Typography className={classes.title} variant="h6" id="tableTitle">
//                        <NavLink to="/case">
//                            <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
//                                <AddIcon />
//                            </Fab>
//                        </NavLink> Дела
//        </Typography>
//                )}
//            {numSelected > 0 ? (
//                <Tooltip title="Delete">
//                    <IconButton aria-label="delete">
//                        <DeleteIcon />
//                    </IconButton>
//                </Tooltip>
//            ) : (
//                    <Tooltip title="Filter list">
//                        <IconButton aria-label="filter list">
//                            <FilterListIcon />
//                        </IconButton>
//                    </Tooltip>
//                )}
//        </Toolbar>
//    );
//};

//const useStyles = makeStyles((theme: Theme) =>
//    createStyles({
//        root: {
//            width: '100%',
//        },
//        paper: {
//            width: '100%',
//            marginBottom: theme.spacing(2),
//        },
//        table: {
//            minWidth: 750,
//        },
//        tableWrapper: {
//            overflowX: 'auto',
//        },
//        visuallyHidden: {
//            border: 0,
//            clip: 'rect(0 0 0 0)',
//            height: 1,
//            margin: -1,
//            overflow: 'hidden',
//            padding: 0,
//            position: 'absolute',
//            top: 20,
//            width: 1,
//        },
//    }),
//);

//export default function EnhancedTable() {
//    const classes = useStyles();
//    const [order, setOrder] = React.useState<Order>('asc');
//    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
//    const [selected, setSelected] = React.useState<string[]>([]);
//    const [page, setPage] = React.useState(0);
//    const [dense, setDense] = React.useState(false);
//    const [rowsPerPage, setRowsPerPage] = React.useState(5);

//    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
//        const isDesc = orderBy === property && order === 'desc';
//        setOrder(isDesc ? 'asc' : 'desc');
//        setOrderBy(property);
//    };

//    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//        if (event.target.checked) {
//            const newSelecteds = rows.map(n => n.name);
//            setSelected(newSelecteds);
//            return;
//        }
//        setSelected([]);
//    };

//    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
//        const selectedIndex = selected.indexOf(name);
//        let newSelected: string[] = [];

//        if (selectedIndex === -1) {
//            newSelected = newSelected.concat(selected, name);
//        } else if (selectedIndex === 0) {
//            newSelected = newSelected.concat(selected.slice(1));
//        } else if (selectedIndex === selected.length - 1) {
//            newSelected = newSelected.concat(selected.slice(0, -1));
//        } else if (selectedIndex > 0) {
//            newSelected = newSelected.concat(
//                selected.slice(0, selectedIndex),
//                selected.slice(selectedIndex + 1),
//            );
//        }

//        setSelected(newSelected);
//    };

//    const handleChangePage = (event: unknown, newPage: number) => {
//        setPage(newPage);
//    };

//    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//        setRowsPerPage(parseInt(event.target.value, 10));
//        setPage(0);
//    };

//    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
//        setDense(event.target.checked);
//    };

//    const isSelected = (name: string) => selected.indexOf(name) !== -1;

//    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//    return (
//        <div className={classes.root}>
//            <div>
//                <EnhancedTableToolbar numSelected={selected.length} />
//                <div className={classes.tableWrapper}>
//                    <Table
//                        className={classes.table}
//                        aria-labelledby="tableTitle"
//                        size={dense ? 'small' : 'medium'}
//                        aria-label="enhanced table"
//                    >
//                        <EnhancedTableHead
//                            classes={classes}
//                            numSelected={selected.length}
//                            order={order}
//                            orderBy={orderBy}
//                            onSelectAllClick={handleSelectAllClick}
//                            onRequestSort={handleRequestSort}
//                            rowCount={rows.length}
//                        />
//                        <TableBody>
//                            {stableSort(rows, getSorting(order, orderBy))
//                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                .map((row, index) => {
//                                    const isItemSelected = isSelected(row.name);
//                                    const labelId = `enhanced-table-checkbox-${index}`;

//                                    return (
//                                        <TableRow
//                                            hover
//                                            onClick={event => handleClick(event, row.name)}
//                                            role="checkbox"
//                                            aria-checked={isItemSelected}
//                                            tabIndex={-1}
//                                            key={row.name}
//                                            selected={isItemSelected}
//                                        >
//                                            <TableCell padding="checkbox">
//                                                <Checkbox
//                                                    checked={isItemSelected}
//                                                    inputProps={{ 'aria-labelledby': labelId }}
//                                                />
//                                            </TableCell>
//                                            <TableCell component="th" id={labelId} scope="row" padding="none">
//                                                {row.name}
//                                            </TableCell>
//                                            <TableCell align="right">{row.calories}</TableCell>
//                                            <TableCell align="right">{row.fat}</TableCell>
//                                            <TableCell align="right">{row.carbs}</TableCell>
//                                            <TableCell align="right">{row.protein}</TableCell>
//                                        </TableRow>
//                                    );
//                                })}
//                            {emptyRows > 0 && (
//                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                                    <TableCell colSpan={6} />
//                                </TableRow>
//                            )}
//                        </TableBody>
//                    </Table>
//                </div>
//                <TablePagination
//                    rowsPerPageOptions={[5, 10, 25, 50]}
//                    component="div"
//                    count={rows.length}
//                    rowsPerPage={rowsPerPage}
//                    page={page}
//                    onChangePage={handleChangePage}
//                    onChangeRowsPerPage={handleChangeRowsPerPage}
//                />
//            </div>
//            <FormControlLabel
//                control={<Switch checked={dense} onChange={handleChangeDense} />}
//                label="Компактный список"
//            />
//        </div>
//    );
//}