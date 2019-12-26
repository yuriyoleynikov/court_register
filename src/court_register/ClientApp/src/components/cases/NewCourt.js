"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var core_1 = require("@material-ui/core");
var MaterialTextField_1 = require("./../inputs/MaterialTextField");
//import SimpleInput from '../inputs/SimpleInput';
//import WidgetDropdownList from '../inputs/WidgetDropdownList';
//const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';
exports.default = mobx_react_1.observer(function (_a) {
    var form = _a.form;
    return (React.createElement("form", { onSubmit: form.onSubmit },
        React.createElement("div", { style: { width: 300 } },
            React.createElement(MaterialTextField_1.default, { field: form.$('name') }),
            React.createElement(MaterialTextField_1.default, { field: form.$('full_name') }),
            React.createElement(MaterialTextField_1.default, { field: form.$('adress') })),
        React.createElement("br", null),
        React.createElement(core_1.Button, { type: 'submit', variant: 'contained', color: 'secondary', onClick: form.onSubmit }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0443\u0434"),
        React.createElement("p", null, form.error)));
});
//# sourceMappingURL=NewCourt.js.map