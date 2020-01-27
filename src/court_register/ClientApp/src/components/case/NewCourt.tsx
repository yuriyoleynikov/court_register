import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';

import MaterialTextField from './../inputs/MaterialTextField';

//import SimpleInput from '../inputs/SimpleInput';
//import WidgetDropdownList from '../inputs/WidgetDropdownList';

//const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';

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