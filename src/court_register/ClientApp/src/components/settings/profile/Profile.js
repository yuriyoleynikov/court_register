"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var core_1 = require("@material-ui/core");
var MaterialTextField_1 = require("../../inputs/MaterialTextField");
exports.default = mobx_react_1.observer(function (_a) {
    var form = _a.form;
    return (React.createElement("form", { onSubmit: form.onSubmit },
        React.createElement(MaterialTextField_1.default, { field: form.$('first_name') }),
        React.createElement(MaterialTextField_1.default, { field: form.$('second_name') }),
        React.createElement(MaterialTextField_1.default, { field: form.$('third_name') }),
        React.createElement("br", null),
        React.createElement(core_1.Button, { type: "submit", variant: "contained", color: "primary", onClick: form.onSubmit }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"),
        React.createElement("p", null, form.error)));
});
//# sourceMappingURL=Profile.js.map