# Mithril Widgets

It is built upon mithril.js and bulma.css.

## How to use

You only need these two files.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mithril Widgets</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.0/css/all.css" integrity="sha384-Mmxa0mLqhmOeaE8vgOSbKacftZcsNYDjQzuCOm6D02luYSzBG8vpaOykv9lFQ51Y" crossorigin="anonymous">
  </head>
  <body>
    <div class="app"></div>
    <script src="./dist/dev/index.js"></script>
  </body>
</html>
```

```javascript
import m from 'mithril'
import MithrilWidgets from 'mithril-widgets'
let root = document.querySelector('.app')

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

let tbl_ds = [{id: 1, username: 'banana', lorem: 'blah'}]
class App {
    view() {
        return m("div", [
            m('h3.is-size-3', 'Table'),
            m(MithrilWidgets.simpleTable, {
                headers: tbl_headers,
                ds: tbl_ds
            }),
        ])
    }
}

m.route(root, "/", {
    "/": App
})
```
## Widgets