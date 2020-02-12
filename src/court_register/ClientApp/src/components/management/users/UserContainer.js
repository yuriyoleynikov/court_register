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
        React.createElement("div", null,
            React.createElement(core_1.CardContent, null,
                React.createElement(core_1.Typography, { gutterBottom: true, variant: "h5", component: "h2" },
                    "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0438 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 ",
                    form.$('email').value)),
            React.createElement(core_1.CardContent, null,
                React.createElement(core_1.Typography, { gutterBottom: true, variant: "h6", component: "h2" }, "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435"),
                React.createElement(core_1.Typography, { variant: "body2", component: "p" },
                    React.createElement(MaterialTextField_1.default, { field: form.$('second_name') }),
                    React.createElement(MaterialTextField_1.default, { field: form.$('first_name') }),
                    React.createElement(MaterialTextField_1.default, { field: form.$('third_name') }))),
            React.createElement(core_1.CardContent, null,
                React.createElement(core_1.Typography, { gutterBottom: true, variant: "h6", component: "h2" }, "\u0421\u0442\u0430\u0442\u0443\u0441"),
                React.createElement(core_1.Typography, { variant: "body2", component: "p" },
                    React.createElement(MaterialCheckbox_1.default, { field: form.$('active') }))),
            React.createElement(core_1.CardContent, null,
                React.createElement(core_1.Typography, { gutterBottom: true, variant: "h6", component: "h2" }, "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F"),
                React.createElement(core_1.Typography, { variant: "body2", component: "p" },
                    React.createElement(MaterialCheckbox_1.default, { field: form.$('admin') }),
                    React.createElement(MaterialCheckbox_1.default, { field: form.$('unitAdmin') }))),
            React.createElement(core_1.CardContent, null,
                React.createElement(core_1.Button, { type: "submit", variant: "contained", size: "small", color: "secondary", onClick: form.onSubmit }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))),
        React.createElement("p", null, form.error)));
});
//# sourceMappingURL=ManagementProfile.js.map