import * as React from 'react';
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default observer(({
    field,
    type = 'text',
    placeholder = null,
    validatingText = 'validating...',
}) => (
        <div>
            <Autocomplete
                options={field.extra}
                //getOptionLabel={field.extra}
                //style={{ width: 300 }}
                id="debug"
                debug
                onChange={(event, value) => { field.value = value; }}
                renderInput={params => (
                    <TextField {...params} label={field.label} margin="normal" fullWidth />
                )}
            />
        </div>
    ));
