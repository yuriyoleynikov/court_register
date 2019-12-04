import * as React from 'react';
import NewCase from './NewCase';
import formNewCase from '../../model/formNewCase';

const NewCaseContainer = () => {
    return (<div>
        <NewCase form={formNewCase} />
    </div>);
};

export default NewCaseContainer;