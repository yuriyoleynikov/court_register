import * as React from 'react';
import { observer } from 'mobx-react';

//import SimpleInput from '../../inputs/SimpleInput';
//import MaterialTextField from '../../inputs/MaterialTextField';

const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';

export default observer(({ form }) => (
    <form onSubmit={form.onSubmit}>
        {/*<SimpleInput field={form.$('first_name')} />
        <SimpleInput field={form.$('second_name')} />
        <SimpleInput field={form.$('third_name')} />

        <MaterialTextField field={form.$('first_name')} />*/}

        <br />
        <button type="submit" className={$btn} onClick={form.onSubmit}>Submit</button>
        <button type="button" className={$btn} onClick={form.onClear}>Clear</button>
        <button type="button" className={$btn} onClick={form.onReset}>Reset</button>

        <p>{form.error}</p>
    </form>
));
