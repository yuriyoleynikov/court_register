import * as React from 'react';
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';

export default observer(({
    field,
    type = 'text',
    placeholder = null,
    validatingText = 'validating...',
}) => (
        <span>
            <TextField id="standard-basic" label="Standard" style={{ width: 300 }}
                {...field.bind({ type, placeholder, validatingText })}
            />
        </span>
    ));