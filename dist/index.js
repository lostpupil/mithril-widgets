"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _simple_table = _interopRequireDefault(require("./components/tables/simple_table.js"));

var _simple_search_table = _interopRequireDefault(require("./components/tables/simple_search_table.js"));

var _remote_search_table = _interopRequireDefault(require("./components/tables/remote_search_table.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MithrilWidgets = {
  simpleTable: _simple_table.default,
  simpleSearchTable: _simple_search_table.default,
  remoteSearchTable: _remote_search_table.default
};
var _default = MithrilWidgets;
exports.default = _default;