"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var Checkbox_1 = require("@material-ui/core/Checkbox");
exports.default = mobx_react_1.observer(function (_a) {
    var field = _a.field, _b = _a.type, type = _b === void 0 ? 'text' : _b, _c = _a.placeholder, placeholder = _c === void 0 ? null : _c, _d = _a.validatingText, validatingText = _d === void 0 ? 'validating...' : _d;
    var _e = React.useState(field.value), checked = _e[0], setChecked = _e[1];
    var handleChange = function (event, value) {
        setChecked(event.target.checked);
        field.value = value;
    };
    return (React.createElement("div", null,
        React.createElement(Checkbox_1.default, { name: field.name, checked: checked, value: field.name, onChange: handleChange, inputProps: { 'aria-label': 'secondary checkbox' }, color: "primary" }),
        field.label));
});
//# sourceMappingURL=MaterialCheckbox.js.map