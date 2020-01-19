import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';

import MaterialTextField from '../../inputs/MaterialTextField';
import MaterialCheckbox from '../../inputs/MaterialCheckbox';


export default observer(({ form }) => (
    <form onSubmit={form.onSubmit}>        
        <div>Персональные данные</div>
        <MaterialTextField field={form.$('second_name')} />
        <MaterialTextField field={form.$('first_name')} />        
        <MaterialTextField field={form.$('third_name')} />
        <br />

        <div>Статус учетной записи</div>
        <MaterialCheckbox field={form.$('active')} />
        <br />

        <div>Разрешения</div>
        
        <MaterialCheckbox field={form.$('admin')} />
        <MaterialCheckbox field={form.$('unitAdmin')} />
        <br />

        <Button type="submit" variant="contained" color="primary" onClick={form.onSubmit}>Сохранить</Button>
        {/*
        <button type="submit" className={$btn} onClick={form.onSubmit}>Submit</button>
        <button type="button" className={$btn} onClick={form.onClear}>Clear</button>
        <button type="button" className={$btn} onClick={form.onReset}>Reset</button>
        */}
        <p>{form.error}</p>
    </form>
));
