import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, CardContent, Typography } from '@material-ui/core';

import MaterialTextField from './../inputs/MaterialTextField';
import AutocompleteField from './../inputs/AutocompleteField';

import CourtAddContainer from './CourtAddContainer';

export default observer(({ form, toggle, isOpenStatus }) => (
    <form onSubmit={form.onSubmit}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Добавление нового дела
                </Typography>
        </CardContent>
        <div style={{ width: 300 }}>
            <CardContent>
                <Typography variant="body2" component="p">
                    <MaterialTextField field={form.$('reg_number')} />
                    <MaterialTextField field={form.$('case_number')} />
                    <AutocompleteField field={form.$('court')} />
                    <Button onClick={toggle}>Добавить суд</ Button>
                    {isOpenStatus ? <CourtAddContainer /> : null}

                    <AutocompleteField field={form.$('unit')} />
                    <AutocompleteField field={form.$('type_role')} />
                    <AutocompleteField field={form.$('category')} />
                    <AutocompleteField field={form.$('executor')} />
                    <AutocompleteField field={form.$('state')} />
                </Typography>
            </CardContent>

            <CardContent>
                <Button type="submit" variant="contained" size="small" color="primary" onClick={form.onSubmit}>Добавить</Button>
            </CardContent>
            <p>{form.error}</p>
        </div>
    </form>
));