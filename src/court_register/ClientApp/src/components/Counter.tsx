import * as React from 'react';
import { observer } from 'mobx-react';

import { store } from '../store2'

type CounterProps = {
    count: number;
    increment(): void;
    decrement(): void;
}

class Counter extends React.PureComponent<CounterProps> {
    public render() {
        return (
            <React.Fragment>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p aria-live="polite">Current count: <strong>{this.props.count}</strong></p>

                <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => { this.props.increment(); }}>
                    Increment
                </button>
            </React.Fragment>
        );
    }
};

export default observer(() => <Counter
    count={store.counter.count}
    increment={store.counter.increment}
    decrement={store.counter.decrement}
/>);
