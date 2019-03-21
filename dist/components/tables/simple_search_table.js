import m from 'mithril';
import Fuse from 'fuse.js';

export default class simpleSearchTable {
    constructor(vnode) {
        this.headers = vnode.attrs.headers;
        this.ds = vnode.attrs.ds;
        this.q = '';
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
        if (this.ds.length == 0) {
            return [];
        }
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
    query(vnode) {
        const options = {
            keys: this.headers.map(({
                key,
                text
            }) => {
                return key;
            })
        };
        const fuse = new Fuse(this.ds, options);
        this.ds = fuse.search(this.q);
        if (this.q == null || this.q == '') {
            this.ds = vnode.attrs.ds;
        }
    }
    view(vnode) {
        return m('div.table-responsive', [m("div.field", m("p.control.has-icons-left", [m("input.input", {
            type: "text",
            placeholder: "Search",
            oninput: e => {
                this.q = e.target.value;
                this.query(vnode);
            }
        }), m("span.icon.is-small.is-left", m("i.fas.fa-search"))])), m("table.table.is-fullwidth.is-striped", [m("thead", m("tr", this.headers.map(({
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