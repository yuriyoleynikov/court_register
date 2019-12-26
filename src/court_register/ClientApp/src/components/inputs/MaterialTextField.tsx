import * as React from 'react';
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';

export default observer(({
    field,
    type = 'text',
    placeholder = null,
    validatingText = 'validating...',
}) => (
        <div>
            <TextField id="standard-basic" label="Standard"
                {...field.bind({ type, placeholder, validatingText })}
            /><br />
        </div>
    ));