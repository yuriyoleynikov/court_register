import * as React from 'react';
import { store } from '../models/store';

async function attachButton(element: Element) {
    await store.auth.loadAuth2();
    gapi.signin2.render(element, {});
}

export function GoogleLoginButton() {
    const ref = React.useRef<HTMLDivElement | any>();

    React.useEffect(() => {
        if (ref.current)
            attachButton(ref.current);
    }, []);

    return <div ref={ref} />;
}
