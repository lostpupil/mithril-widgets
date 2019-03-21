"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var simpleSearchTable =
/*#__PURE__*/
function () {
  function simpleSearchTable(vnode) {
    _classCallCheck(this, simpleSearchTable);

    this.headers = vnode.attrs.headers;
    this.ds = [];
    this.ds_url = vnode.attrs.ds_url;
    this.q = '';
    this.page = 0;
    this.limit = vnode.attrs.limit || 10;
    this.has_prev = false;
    this.has_next = false;
    this.total_pages = 0;
  }

  _createClass(simpleSearchTable, [{
    key: "loadData",
    value: function loadData() {
      var that = this;
      console.log('loading...');
      return _mithril.default.request({
        method: "GET",
        url: this.ds_url,
        data: {
          page: this.page,
          limit: this.limit,
          q: this.q
        }
      }).then(function (resp) {
        that.has_prev = resp.data.has_prev;
        that.has_next = resp.data.has_next;
        that.total_pages = resp.data.total_pages;
        that.ds = resp.data.items;
      });
    }
  }, {
    key: "oncreate",
    value: function oncreate(vnode) {
      this.loadData();
    }
  }, {
    key: "prev_page",
    value: function prev_page() {
      if (this.has_prev) {
        this.page -= 1;
        this.loadData();
      }
    }
  }, {
    key: "next_page",
    value: function next_page() {
      if (this.has_next) {
        this.page += 1;
        this.loadData();
      }
    }
  }, {
    key: "view",
    value: function view(vnode) {
      var _this = this;

      return (0, _mithril.default)('div.table-responsive', [(0, _mithril.default)("div.field", (0, _mithril.default)("p.control.has-icons-left", [(0, _mithril.default)("input.input", {
        type: "text",
        placeholder: "Search",
        oninput: function oninput(e) {
          _this.q = e.target.value;

          _this.loadData();
        }
      }), (0, _mithril.default)("span.icon.is-small.is-left", (0, _mithril.default)("i.fas.fa-search"))])), (0, _mithril.default)("table.table.is-fullwidth.is-striped", [(0, _mithril.default)("thead", (0, _mithril.default)("tr", this.headers.map(function (_ref) {
        var key = _ref.key,
            text = _ref.text;
        return (0, _mithril.default)('th', text);
      }))), (0, _mithril.default)("tbody", this.ds.map(function (itm) {
        return (0, _mithril.default)("tr", _this.headers.map(function (_ref2) {
          var key = _ref2.key,
              text = _ref2.text;
          return (0, _mithril.default)("td", itm[key]);
        }));
      }))]), (0, _mithril.default)("nav.pagination.is-centered", {
        "role": "navigation",
        "aria-label": "pagination"
      }, [(0, _mithril.default)("a.pagination-previous", {
        onclick: function onclick() {
          _this.prev_page();
        }
      }, "Previous"), (0, _mithril.default)("a.pagination-next", {
        onclick: function onclick() {
          _this.next_page();
        }
      }, "Next page"), (0, _mithril.default)("ul.pagination-list", _toConsumableArray(Array(this.total_pages).keys()).map(function (itm) {
        return (0, _mithril.default)("li", (0, _mithril.default)("a.pagination-link[aria-label=\"go to ".concat(itm, "\"]"), {
          class: _this.page == itm ? 'is-current' : '',
          onclick: function onclick() {
            _this.page = itm;

            _this.loadData();
          }
        }, itm + 1));
      }))])]);
    }
  }]);

  return simpleSearchTable;
}();

exports.default = simpleSearchTable;