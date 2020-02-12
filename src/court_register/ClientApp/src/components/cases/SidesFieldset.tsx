import * as React from 'react';
import { observer } from 'mobx-react';
import PlaintiffsFieldset from './PlaintiffsFieldset';

export default observer(({ sides }) => (<div>
    <PlaintiffsFieldset plaintiffs={sides.plaintiffs} />
</div>));