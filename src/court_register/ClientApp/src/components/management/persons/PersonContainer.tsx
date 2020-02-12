import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, CardContent, Typography } from '@material-ui/core';
import MaterialTextField from '../../inputs/MaterialTextField';

export default observer(({ form }) => (
    <form onSubmit={form.onSubmit}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {form.$('_type').value == 'ul' ? `Юридическое лицо` : null}
                    {form.$('_type').value == 'fl' ? `Физическое лицо` : null}
                    {form.$('_type').value == 'adm' ? `Администрация` : null}
                    {`, Id: ${form.$('_id').value}`}
            </Typography>
        </CardContent>
        <CardContent>
            <Typography variant="body2" component="p">
                {form.$('_type').value == 'ul' ? <div><MaterialTextField field={form.$('name')} /></div> : null}
                {form.$('_type').value == 'ul' ? <div><MaterialTextField field={form.$('inn')} /></div> : null}

                {form.$('_type').value == 'fl' ? <div><MaterialTextField field={form.$('second_name')} /></div> : null}
                {form.$('_type').value == 'fl' ? <div><MaterialTextField field={form.$('first_name')} /></div> : null}
                {form.$('_type').value == 'fl' ? <div><MaterialTextField field={form.$('third_name')} /></div> : null}

                {form.$('_type').value == 'adm' ? <div><MaterialTextField field={form.$('name')} /></div> : null}

                <div><MaterialTextField field={form.$('address')} /></div>
            </Typography>
        </CardContent>
        <CardContent>
            <Button type="submit" variant="contained" size="small" color="primary" onClick={form.onSubmit}>Сохранить</Button>
        </CardContent>
        <p>{form.error}</p>
    </form>
));