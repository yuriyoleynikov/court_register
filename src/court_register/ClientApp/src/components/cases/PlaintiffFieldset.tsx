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


export default observer(({ plaintiff }) => (<div>
    <div>_type id name</div>
    <MaterialTextField field={plaintiff.$('_type')} />
    <MaterialTextField field={plaintiff.$('_id')} />
    <MaterialTextField field={plaintiff.$('name')} />
</div>));