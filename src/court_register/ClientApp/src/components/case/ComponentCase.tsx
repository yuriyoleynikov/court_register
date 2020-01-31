import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, CardContent, Typography } from '@material-ui/core';

import MaterialTextField from '../inputs/MaterialTextField';
import AutocompleteField from '../inputs/AutocompleteField';

//import CourtAddContainer from './CourtAddContainer';

export default observer(({ form /*, toggle, isOpenStatus*/ }) => (
    <form onSubmit={form.onSubmit}>
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

                <MaterialTextField field={form.$('case_number')} />
                <AutocompleteField field={form.$('category')} />
            </Typography>

            <Typography variant="h6" component="p">
                <div>Движение дела</div>
            </Typography>

            <Typography variant="body2" component="p">
                <AutocompleteField field={form.$('state')} />
                <AutocompleteField field={form.$('court')} />
            </Typography>
        </CardContent>

        <CardContent>
            <Button type="submit" variant="contained" size="small" color="primary" onClick={form.onSubmit}>Сохранить</Button>
        </CardContent>
        <p>{form.error}</p>
    </form>
));