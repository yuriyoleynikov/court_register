import * as React from 'react';
import NewUnit from './NewUnit';
import formUnit from '../../../model/formUnit';
import { store } from '../../../store2';

const NewUnitContainer = () => {
    return (<div>
        <NewUnit form={formUnit} />
    </div>);
};

export default NewUnitContainer;
