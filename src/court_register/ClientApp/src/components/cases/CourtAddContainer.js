"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var NewCourt_1 = require("./NewCourt");
var formNewCourt_1 = require("../../models/formNewCourt");
var mobx_react_1 = require("mobx-react");
var CourtAddContainer = function (props) {
    //if (!props.loading) {
    //    if (props.settingsCase.units != null) {
    //        let nameUnitsList = props.settingsCase.units.map(u => u.name);
    //        formNewCase.$('unit').$extra = nameUnitsList;
    //    }
    //    if (props.settingsCase.courts != null) {
    //        let nameCourtList = props.settingsCase.courts.map(u => u.name);
    //        formNewCase.$('court').$extra = nameCourtList;
    //    }
    //}
    //if (props.loading) {
    //    return <Loading />;
    //}
    return (React.createElement("div", null,
        React.createElement(NewCourt_1.default, { form: formNewCourt_1.default })));
};
exports.default = mobx_react_1.observer(function () { return React.createElement(CourtAddContainer
//settingsCase={store.new_case.settingsCase}
//loading={store.new_case.loading}
//loadSettingsCase={store.new_case.loadSettingsCase}
//toggle={store.court.toggle}
//isOpenStatus={store.court.isOpenStatus}
, null); });
//# sourceMappingURL=CourtAddContainer.js.map