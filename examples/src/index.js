import m from 'mithril'
import MithrilWidgets from 'mithril-widgets'
let root = document.querySelector('.app')

const times = n => f => {
    let iter = i => {
        if (i === n) return
        f(i)
        iter(i + 1)
    }
    return iter(0)
}
let tbl_headers = [{
    key: 'id',
    text: 'ID'
}, {
    key: 'username',
    text: "USERNAME"
}, {
    key: 'lorem',
    text: 'LOREM'
}]

let tbl_ds = []

times(66)((i) => {
    tbl_ds.push({
        id: i,
        username: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        lorem: Math.random().toString(36).substring(2, 15)
    })
})

class App {
    constructor(vnode) {

    }
    view() {
        return m("div", [
            m('h3.is-size-3', 'Table'),
            m(MithrilWidgets.simpleTable, {
                headers: tbl_headers,
                ds: tbl_ds,
                limit: 10
            }),
        ])

    }
    oncreate() {
        console.log("where amazing happens...")
    }
}

m.route(root, "/", {
    "/": App
})