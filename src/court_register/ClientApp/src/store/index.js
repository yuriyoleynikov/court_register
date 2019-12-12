"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Auth_1 = require("./../models/Auth");
var Admin_1 = require("./../models/Admin");
var UnitStore_1 = require("./../models/UnitStore");
var CaseStore_1 = require("./../models/CaseStore");
var NewCase_1 = require("./../models/NewCase");
var CourtStore_1 = require("./../models/CourtStore");
var Store = /** @class */ (function () {
    function Store() {
        this.auth = new Auth_1.Auth();
        this.units = new UnitStore_1.UnitStore();
        this.admin = new Admin_1.Admin();
        this.case = new CaseStore_1.CaseStore();
        this.new_case = new NewCase_1.NewCase();
        this.court = new CourtStore_1.CourtStore();
    }
    return Store;
}());
exports.Store = Store;
exports.store = new Store();
window.store = exports.store;
//# sourceMappingURL=index.js.map