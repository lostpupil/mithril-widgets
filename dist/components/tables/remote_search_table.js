import m from 'mithril';

export default class simpleSearchTable {
    constructor(vnode) {
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
    loadData() {
        let that = this;
        console.log('loading...');
        return m.request({
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
    oncreate(vnode) {
        this.loadData();
    }
    prev_page() {
        if (this.has_prev) {
            this.page -= 1;
            this.loadData();
        }
    }
    next_page() {
        if (this.has_next) {
            this.page += 1;
            this.loadData();
        }
    }
    view(vnode) {
        return m('div.table-responsive', [m("div.field", m("p.control.has-icons-left", [m("input.input", {
            type: "text",
            placeholder: "Search",
            oninput: e => {
                this.q = e.target.value;
                this.loadData();
            }
        }), m("span.icon.is-small.is-left", m("i.fas.fa-search"))])), m("table.table.is-fullwidth.is-striped", [m("thead", m("tr", this.headers.map(({
            key,
            text
        }) => {
            return m('th', text);
        }))), m("tbody", this.ds.map(itm => {
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
        }, "Next page"), m("ul.pagination-list", [...Array(this.total_pages).keys()].map(itm => {
            return m("li", m(`a.pagination-link[aria-label="go to ${itm}"]`, {
                class: this.page == itm ? 'is-current' : '',
                onclick: () => {
                    this.page = itm;
                    this.loadData();
                }
            }, itm + 1));
        }))])]);
    }
}