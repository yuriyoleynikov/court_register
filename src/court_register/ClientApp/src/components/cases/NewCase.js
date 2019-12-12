"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var core_1 = require("@material-ui/core");
var MaterialTextField_1 = require("./../inputs/MaterialTextField");
var AutocompleteField_1 = require("./../inputs/AutocompleteField");
//import SimpleInput from '../inputs/SimpleInput';
//import WidgetDropdownList from '../inputs/WidgetDropdownList';
//const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';
exports.default = mobx_react_1.observer(function (_a) {
    var form = _a.form;
    return (React.createElement("form", { onSubmit: form.onSubmit },
        React.createElement("div", { style: { width: 300 } },
            React.createElement(MaterialTextField_1.default, { field: form.$('reg_number') }),
            React.createElement(AutocompleteField_1.default, { field: form.$('court') }),
            React.createElement(MaterialTextField_1.default, { field: form.$('case_number') }),
            React.createElement(AutocompleteField_1.default, { field: form.$('unit') })),
        React.createElement("br", null),
        React.createElement(core_1.Button, { type: "submit", variant: "contained", color: "primary", onClick: form.onSubmit }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"),
        React.createElement("p", null, form.error)));
});
//# sourceMappingURL=NewCase.js.map