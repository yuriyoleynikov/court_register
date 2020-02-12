"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var PlaintiffsFieldset_1 = require("./PlaintiffsFieldset");
exports.default = mobx_react_1.observer(function (_a) {
    var sides = _a.sides;
    return (React.createElement("div", null,
        React.createElement(PlaintiffsFieldset_1.default, { plaintiffs: sides.plaintiffs })));
});
//# sourceMappingURL=SidesFieldset.js.map