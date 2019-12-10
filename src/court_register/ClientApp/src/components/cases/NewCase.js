"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
//import SimpleInput from '../inputs/SimpleInput';
//import WidgetDropdownList from '../inputs/WidgetDropdownList';
var $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';
exports.default = mobx_react_1.observer(function (_a) {
    var form = _a.form;
    return (React.createElement("form", { onSubmit: form.onSubmit },
        React.createElement("br", null),
        React.createElement("button", { type: "submit", className: $btn, onClick: form.onSubmit }, "Submit"),
        React.createElement("button", { type: "button", className: $btn, onClick: form.onClear }, "Clear"),
        React.createElement("button", { type: "button", className: $btn, onClick: form.onReset }, "Reset"),
        React.createElement("p", null, form.error)));
});
//# sourceMappingURL=NewCase.js.map