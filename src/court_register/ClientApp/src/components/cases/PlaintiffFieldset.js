"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var MaterialTextField_1 = require("../inputs/MaterialTextField");
exports.default = mobx_react_1.observer(function (_a) {
    var plaintiff = _a.plaintiff;
    return (React.createElement("div", null,
        React.createElement("div", null, "_type id name"),
        React.createElement(MaterialTextField_1.default, { field: plaintiff.$('_type') }),
        React.createElement(MaterialTextField_1.default, { field: plaintiff.$('_id') }),
        React.createElement(MaterialTextField_1.default, { field: plaintiff.$('name') })));
});
//# sourceMappingURL=PlaintiffFieldset.js.map