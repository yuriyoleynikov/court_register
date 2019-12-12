import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';

import MaterialTextField from './../inputs/MaterialTextField';
import AutocompleteField from './../inputs/AutocompleteField';
//import SimpleInput from '../inputs/SimpleInput';
//import WidgetDropdownList from '../inputs/WidgetDropdownList';

//const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';

export default observer(({ form }) => (
    <form onSubmit={form.onSubmit}>
        <div style={{ width: 300 }}>
            <MaterialTextField field={form.$('reg_number')} />
            <AutocompleteField field={form.$('court')} />

            <MaterialTextField field={form.$('case_number')} />
            <AutocompleteField field={form.$('unit')} />
        </div>
        <br />
        <Button type="submit" variant="contained" color="primary" onClick={form.onSubmit}>Добавить</Button>
        {/*<button type="submit" className={$btn} onClick={form.onSubmit}>Submit</button>
        <button type="button" className={$btn} onClick={form.onClear}>Clear</button>
        <button type="button" className={$btn} onClick={form.onReset}>Reset</button>*/}


        <p>{form.error}</p>
    </form>
));