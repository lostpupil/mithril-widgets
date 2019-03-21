"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _fuse = _interopRequireDefault(require("fuse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var simpleSearchTable =
/*#__PURE__*/
function () {
  function simpleSearchTable(vnode) {
    _classCallCheck(this, simpleSearchTable);

    this.headers = vnode.attrs.headers;
    this.ds = vnode.attrs.ds;
    this.q = '';
    this.page = 0;
    this.limit = vnode.attrs.limit || 10;
  }

  _createClass(simpleSearchTable, [{
    key: "ds_count",
    value: function ds_count() {
      return _.chunk(this.ds, this.limit).length;
    }
  }, {
    key: "page_items",
    value: function page_items() {
      return _.map(_.chunk(this.ds, this.limit), function (value, idx) {
        return idx;
      });
    }
  }, {
    key: "pagination",
    value: function pagination() {
      if (this.ds.length == 0) {
        return [];
      }

      return _.chunk(this.ds, this.limit)[this.page];
    }
  }, {
    key: "prev_page",
    value: function prev_page() {
      if (this.page > 0) {
        this.page -= 1;
      }
    }
  }, {
    key: "next_page",
    value: function next_page() {
      var max = this.ds_count();

      if (this.page < max - 1) {
        this.page += 1;
      }
    }
  }, {
    key: "query",
    value: function query(vnode) {
      this.page = 0;
      var options = {
        keys: this.headers.map(function (_ref) {
          var key = _ref.key,
              text = _ref.text;
          return key;
        })
      };
      var fuse = new _fuse.default(this.ds, options);
      this.ds = fuse.search(this.q);

      if (this.q == null || this.q == '') {
        this.ds = vnode.attrs.ds;
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

          _this.query(vnode);
        }
      }), (0, _mithril.default)("span.icon.is-small.is-left", (0, _mithril.default)("i.fas.fa-search"))])), (0, _mithril.default)("table.table.is-fullwidth.is-striped", [(0, _mithril.default)("thead", (0, _mithril.default)("tr", this.headers.map(function (_ref2) {
        var key = _ref2.key,
            text = _ref2.text;
        return (0, _mithril.default)('th', text);
      }))), (0, _mithril.default)("tbody", this.pagination().map(function (itm) {
        return (0, _mithril.default)("tr", _this.headers.map(function (_ref3) {
          var key = _ref3.key,
              text = _ref3.text;
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
      }, "Next page"), (0, _mithril.default)("ul.pagination-list", this.page_items().map(function (itm) {
        return (0, _mithril.default)("li", (0, _mithril.default)("a.pagination-link[aria-label=\"go to ".concat(itm, "\"]"), {
          class: _this.page == itm ? 'is-current' : '',
          onclick: function onclick() {
            _this.page = itm;
          }
        }, itm + 1));
      }))])]);
    }
  }]);

  return simpleSearchTable;
}();

exports.default = simpleSearchTable;