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
import PlaintiffFieldset from './PlaintiffFieldset';
import { store } from '../../models/store';
import { Person } from '../../models';

export default observer(({ plaintiffs }) => {
    const addButton = () => {
        console.log('add');
        store.page.case.currentCase?.sides?.plaintiffs?.push(new Person());
    };
    return (<div>
        <div>plaintiffs</div>
        <button onClick={addButton}>addP--</button>
        {plaintiffs ? <div>plaintiffs true</div> : <div>plaintiffs false</div>}
        {plaintiffs && plaintiffs.map((plaintiff: any) =>
            <>
                <div>123123</div>
                <PlaintiffFieldset
                    key={plaintiff.key}
                    plaintiff={plaintiff}
                />
            </>)}
    </div>)
});