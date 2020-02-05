import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, CardContent, Typography } from '@material-ui/core';
import MaterialTextField from '../../inputs/MaterialTextField';

export default observer(({ form }) => (
    <form onSubmit={form.onSubmit}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Суд, Id: {form.$('_id').value}
                </Typography>
        </CardContent>
        <CardContent>
            <Typography variant="body2" component="p">
                <div><MaterialTextField field={form.$('name')} /></div>
                <div><MaterialTextField field={form.$('full_name')} /></div>
                <div><MaterialTextField field={form.$('address')} /></div>
                
                
            </Typography>
        </CardContent>

        <CardContent>
            <Button type="submit" variant="contained" size="small" color="primary" onClick={form.onSubmit}>Сохранить</Button>
        </CardContent>
        <p>{form.error}</p>
    </form>
));