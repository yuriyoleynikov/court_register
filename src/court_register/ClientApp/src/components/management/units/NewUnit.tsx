import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';

import MaterialTextField from '../../inputs/MaterialTextField';


export default observer(({ form }) => (
    <form onSubmit={form.onSubmit}>
        <MaterialTextField field={form.$('name')} />
        <MaterialTextField field={form.$('full_name')} />

        <br />
        <Button type="submit" variant="contained" color="primary" onClick={form.onSubmit}>Добавить</Button>
        {/*
        <button type="submit" className={$btn} onClick={form.onSubmit}>Submit</button>
        <button type="button" className={$btn} onClick={form.onClear}>Clear</button>
        <button type="button" className={$btn} onClick={form.onReset}>Reset</button>
         */}
        

        <p>{form.error}</p>
    </form>
));
