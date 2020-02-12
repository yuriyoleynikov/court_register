import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, CardContent, Typography } from '@material-ui/core';

import MaterialTextField from '../../inputs/MaterialTextField';
import MaterialCheckbox from '../../inputs/MaterialCheckbox';


export default observer(({ form }) => (
    <form onSubmit={form.onSubmit}>
        <div>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Просмотр и редактирование {form.$('email').value}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    Персональные данные
                </Typography>
                <Typography variant="body2" component="p">
                    <MaterialTextField field={form.$('second_name')} />
                    <MaterialTextField field={form.$('first_name')} />
                    <MaterialTextField field={form.$('third_name')} />
                </Typography>
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    Статус
                </Typography>
                <Typography variant="body2" component="p">
                    <MaterialCheckbox field={form.$('active')} />
                </Typography>
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    Разрешения
                </Typography>
                <Typography variant="body2" component="p">
                    <MaterialCheckbox field={form.$('admin')} />
                    <MaterialCheckbox field={form.$('unitAdmin')} />
                </Typography>
            </CardContent>
            <CardContent>
                <Button type="submit" variant="contained" size="small" color="secondary" onClick={form.onSubmit}>Сохранить</Button>
            </CardContent>
        </div>
        <p>{form.error}</p>
    </form>
));
