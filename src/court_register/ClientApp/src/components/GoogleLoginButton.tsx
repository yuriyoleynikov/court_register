import * as React from 'react'
import { store } from '../store';

declare var window: any;

async function attachButton(element: Element) {
    await store.auth.loadAuth2();
    window.gapi.signin2.render(element, {

    })
}

export function GoogleLoginButton() {
    const ref = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        if (ref.current)
            attachButton(ref.current)
    }, []);

    return <div ref={ref} />;
}
