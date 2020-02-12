import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, CardContent, Typography, Fab, IconButton, TextField, Grid, Paper } from '@material-ui/core';

import MaterialTextField from '../inputs/MaterialTextField';
import AutocompleteField from '../inputs/AutocompleteField';
import AddIcon from '@material-ui/icons/Add';
import useStyles from '../../models/useStyles';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SidesFieldset from './SidesFieldset';


export default observer(({ form }) => {
    const classes = useStyles();
    return (<form onSubmit={form.onSubmit}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Дело
                </Typography>
        </CardContent>
        <CardContent>
            <Typography variant="body2" component="p">
                <MaterialTextField field={form.$('reg_number')} />
                <AutocompleteField field={form.$('unit')} />
                <AutocompleteField field={form.$('executor')} />
                <AutocompleteField field={form.$('type_role')} />
                <AutocompleteField field={form.$('category')} />
            </Typography>
            <Typography variant="h6" component="p">
                <div>Стороны дела</div>
                
                <SidesFieldset sides={form.$('sides')} />
                
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ width: 100 }}>
                                <IconButton aria-label="delete" className={classes.margin} size="small">
                                    <AddIcon fontSize="inherit" onClick={() => { console.log('test3'); }} />
                                </IconButton>
                            </TableCell>
                            <TableCell align="left">Истец</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                1
                            </TableCell>
                            <TableCell><AutocompleteField field={form.$('unit')} /></TableCell>
                        </TableRow>
                    </TableBody>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ width: 100 }}>
                                <IconButton aria-label="delete" className={classes.margin} size="small">
                                    <AddIcon fontSize="inherit" onClick={() => { console.log('test3'); }} />
                                </IconButton>
                            </TableCell>
                            <TableCell align="left">Ответчик</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                1
                            </TableCell>
                            <TableCell>
                                test
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ width: 100 }}>
                                <IconButton aria-label="delete" className={classes.margin} size="small">
                                    <AddIcon fontSize="inherit" onClick={() => { console.log('test3'); }} />
                                </IconButton>
                            </TableCell>
                            <TableCell align="left">Третья сторона</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                1
                            </TableCell>
                            <TableCell>test</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Typography>
            <Typography variant="h6" component="p">
                <div>Движение дела</div>
            </Typography>

            <Typography variant="body2" component="p">
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ width: 100 }}>
                                <IconButton aria-label="delete" className={classes.margin} size="small">
                                    <AddIcon fontSize="inherit" onClick={() => { console.log('test3'); }} />
                                </IconButton>
                                Инстанция
                            </TableCell>
                            <TableCell align="left">Номер дела</TableCell>
                            <TableCell align="left">Суд</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                1
                            </TableCell>
                            <TableCell>1234567-апро</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Typography>
        </CardContent>

        <CardContent>
            <Button type="submit" variant="contained" size="small" color="primary" onClick={form.onSubmit}>Сохранить</Button>
        </CardContent>

        <p>{form.error}</p>
    </form>)
});