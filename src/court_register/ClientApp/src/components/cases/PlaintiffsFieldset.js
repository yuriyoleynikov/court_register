"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var PlaintiffFieldset_1 = require("./PlaintiffFieldset");
var store_1 = require("../../models/store");
var models_1 = require("../../models");
exports.default = mobx_react_1.observer(function (_a) {
    var plaintiffs = _a.plaintiffs;
    var addButton = function () {
        var _a, _b, _c;
        console.log('add');
        (_c = (_b = (_a = store_1.store.page.case.currentCase) === null || _a === void 0 ? void 0 : _a.sides) === null || _b === void 0 ? void 0 : _b.plaintiffs) === null || _c === void 0 ? void 0 : _c.push(new models_1.Person());
    };
    return (React.createElement("div", null,
        React.createElement("div", null, "111"),
        React.createElement("button", { onClick: addButton }, "addP--"),
        plaintiffs ? React.createElement("div", null, "plaintiffs true") : React.createElement("div", null, "plaintiffs false"),
        plaintiffs && plaintiffs.map(function (plaintiff) {
            return React.createElement(React.Fragment, null,
                React.createElement("div", null, "123123"),
                React.createElement(PlaintiffFieldset_1.default, { key: plaintiff.key, plaintiff: plaintiff }));
        })));
});
//# sourceMappingURL=PlaintiffsFieldset.js.map