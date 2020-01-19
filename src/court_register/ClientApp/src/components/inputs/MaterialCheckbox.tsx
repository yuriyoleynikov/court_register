import * as React from 'react';
import { observer } from 'mobx-react';
import Checkbox from '@material-ui/core/Checkbox';

export default observer(({ field,
    type = 'text',
    placeholder = null,
    validatingText = 'validating...'
}) => {
    const [checked, setChecked] = React.useState(field.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
        setChecked(event.target.checked);
        field.value = value;
    };

    return (<div>
        <Checkbox
            name={field.name}
            checked={checked}
            value={field.name}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            color="primary"
        />
        {field.label}
        </div>);
});
