import m from 'mithril';
import _ from 'lodash';

export default class simpleTable {
    constructor(vnode) {
        this.headers = vnode.attrs.headers;
        this.ds = vnode.attrs.ds;
        this.page = 0;
        this.limit = vnode.attrs.limit || 10;
    }
    ds_count() {
        return _.chunk(this.ds, this.limit).length;
    }
    page_items() {
        return _.map(_.chunk(this.ds, this.limit), (value, idx) => {
            return idx;
        });
    }
    pagination() {
        return _.chunk(this.ds, this.limit)[this.page];
    }
    prev_page() {
        if (this.page > 0) {
            this.page -= 1;
        }
    }
    next_page() {
        let max = this.ds_count();
        if (this.page < max - 1) {
            this.page += 1;
        }
    }
    view() {
        return m('div.table-responsive', [m("table.table.is-fullwidth.is-striped", [m("thead", m("tr", this.headers.map(({
            key,
            text
        }) => {
            return m('th', text);
        }))), m("tbody", this.pagination().map(itm => {
            return m("tr", this.headers.map(({
                key,
                text
            }) => {
                return m("td", itm[key]);
            }));
        }))]), m("nav.pagination.is-centered", {
            "role": "navigation",
            "aria-label": "pagination"
        }, [m("a.pagination-previous", {
            onclick: () => {
                this.prev_page();
            }
        }, "Previous"), m("a.pagination-next", {
            onclick: () => {
                this.next_page();
            }
        }, "Next page"), m("ul.pagination-list", this.page_items().map(itm => {
            return m("li", m(`a.pagination-link[aria-label="go to ${itm}"]`, {
                class: this.page == itm ? 'is-current' : '',
                onclick: () => {
                    this.page = itm;
                }
            }, itm + 1));
        }))])]);
    }
}