import * as React from 'react';
import { Court } from '../../../models';
import { store } from '../../../models/store';
import { observer } from 'mobx-react';
import CourtContainer from './CourtContainer';
import formCourt from '../../../models/forms/formCourt';

type CourtComponentProps = {
    _id: string | null;
    court: Court | null;
    loading: boolean;
    loadCourtById(id: string | null): void;
}

const CourtComponent = (props: CourtComponentProps) => {
    React.useEffect(() => { props.loadCourtById(props._id); }, [])

    if (!props.loading) {
        formCourt.$('name').value = props.court && props.court.name ? props.court.name : null;
        formCourt.$('full_name').value = props.court && props.court.full_name ? props.court.full_name : null;
        formCourt.$('address').value = props.court && props.court.address ? props.court.address : null;

        formCourt.$('_id').value = props._id;
    }

    if (props.loading) {
        return <></>;
    }

    return (<>
        <CourtContainer form={formCourt} />
    </>);
};

export default observer((props: { _id: string | null; }) => <CourtComponent
    _id={props._id}

    court={store.page.court.court}
    loading={store.page.court.loading}
    loadCourtById={store.page.court.loadCourtById}
/>);