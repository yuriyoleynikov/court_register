"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var TextField_1 = require("@material-ui/core/TextField");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
exports.default = mobx_react_1.observer(function (_a) {
    var field = _a.field, _b = _a.type, type = _b === void 0 ? 'text' : _b, _c = _a.placeholder, placeholder = _c === void 0 ? null : _c, _d = _a.validatingText, validatingText = _d === void 0 ? 'validating...' : _d;
    return (React.createElement("div", null,
        React.createElement(Autocomplete_1.default, { options: field.extra, defaultValue: field.value, 
            //getOptionLabel={field.extra}
            //style={{ width: 300 }}
            id: "debug", debug: true, onChange: function (event, value) { field.value = value; }, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: field.label, margin: "normal", fullWidth: true }))); } })));
});
//# sourceMappingURL=AutocompleteField.js.map