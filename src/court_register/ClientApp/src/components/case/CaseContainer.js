"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var core_1 = require("@material-ui/core");
var MaterialTextField_1 = require("../inputs/MaterialTextField");
var AutocompleteField_1 = require("../inputs/AutocompleteField");
exports.default = mobx_react_1.observer(function (_a) {
    var form = _a.form;
    return (React.createElement("form", { onSubmit: form.onSubmit },
        React.createElement(core_1.CardContent, null,
            React.createElement(core_1.Typography, { gutterBottom: true, variant: "h5", component: "h2" }, "\u0414\u0435\u043B\u043E")),
        React.createElement(core_1.CardContent, null,
            React.createElement(core_1.Typography, { variant: "body2", component: "p" },
                React.createElement(MaterialTextField_1.default, { field: form.$('reg_number') }),
                React.createElement(AutocompleteField_1.default, { field: form.$('unit') }),
                React.createElement(AutocompleteField_1.default, { field: form.$('executor') }),
                React.createElement(AutocompleteField_1.default, { field: form.$('type_role') }),
                React.createElement(AutocompleteField_1.default, { field: form.$('category') })),
            React.createElement(core_1.Typography, { variant: "h6", component: "p" },
                React.createElement("div", null, "\u0414\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u043B\u0430")),
            React.createElement(core_1.Typography, { variant: "body2", component: "p" },
                React.createElement(MaterialTextField_1.default, { field: form.$('case_move') }),
                React.createElement(MaterialTextField_1.default, { field: form.$('case_number') }),
                React.createElement(AutocompleteField_1.default, { field: form.$('court') }),
                React.createElement(core_1.Button, { onClick: function () { console.log('test'); } }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0438\u043D\u0441\u0442\u0430\u043D\u0446\u0438\u044E"))),
        React.createElement(core_1.CardContent, null,
            React.createElement(core_1.Button, { type: "submit", variant: "contained", size: "small", color: "primary", onClick: form.onSubmit }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")),
        React.createElement("p", null, form.error)));
});
//# sourceMappingURL=ComponentCase.js.map