import { observable, action } from "mobx";

export class Counter {
    @observable count = 0;

    @action.bound increment() { this.count++ }
    @action.bound decrement() { this.count-- }
}
