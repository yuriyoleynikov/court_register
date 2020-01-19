"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var core_1 = require("@material-ui/core");
var MaterialTextField_1 = require("../../inputs/MaterialTextField");
var MaterialCheckbox_1 = require("../../inputs/MaterialCheckbox");
exports.default = mobx_react_1.observer(function (_a) {
    var form = _a.form;
    return (React.createElement("form", { onSubmit: form.onSubmit },
        React.createElement("div", null, "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435"),
        React.createElement(MaterialTextField_1.default, { field: form.$('second_name') }),
        React.createElement(MaterialTextField_1.default, { field: form.$('first_name') }),
        React.createElement(MaterialTextField_1.default, { field: form.$('third_name') }),
        React.createElement("br", null),
        React.createElement("div", null, "\u0421\u0442\u0430\u0442\u0443\u0441 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438"),
        React.createElement(MaterialCheckbox_1.default, { field: form.$('active') }),
        React.createElement("br", null),
        React.createElement("div", null, "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F"),
        React.createElement(MaterialCheckbox_1.default, { field: form.$('admin') }),
        React.createElement(MaterialCheckbox_1.default, { field: form.$('unitAdmin') }),
        React.createElement("br", null),
        React.createElement(core_1.Button, { type: "submit", variant: "contained", color: "primary", onClick: form.onSubmit }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"),
        React.createElement("p", null, form.error)));
});
//# sourceMappingURL=ManagementProfile.js.map