import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './models/store';

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));

registerServiceWorker();