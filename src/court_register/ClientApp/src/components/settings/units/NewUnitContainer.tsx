import * as React from 'react';

import NewUnit from './NewUnit';
import formUnit from '../../../models/formUnit';

const NewUnitContainer = () => {
    return (<div>
        <NewUnit form={formUnit} />
    </div>);
};

export default NewUnitContainer;
