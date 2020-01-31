import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';

import MaterialTextField from './../inputs/MaterialTextField';

export default observer(({ form }) => (
    <form onSubmit={form.onSubmit}>
        <div style={{ width: 300 }}>
            <MaterialTextField field={form.$('name')} />
            <MaterialTextField field={form.$('full_name')} />
            <MaterialTextField field={form.$('adress')} />
        </div>
        <br />
        <Button type='submit' variant='contained' color='secondary' onClick={form.onSubmit}>Добавить суд</Button>        
        <p>{form.error}</p>
    </form>
));