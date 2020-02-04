import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, CardContent, Typography } from '@material-ui/core';
import MaterialTextField from '../../inputs/MaterialTextField';

export default observer(({ form }) => (
    <form onSubmit={form.onSubmit}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Подразделение
                </Typography>
        </CardContent>
        <CardContent>
            <Typography variant="body2" component="p">
                <MaterialTextField field={form.$('name')} />
                <MaterialTextField field={form.$('full_name')} />
            </Typography>
        </CardContent>

        <CardContent>
            <Button type="submit" variant="contained" size="small" color="primary" onClick={form.onSubmit}>Сохранить</Button>
        </CardContent>
        <p>{form.error}</p>
    </form>
));