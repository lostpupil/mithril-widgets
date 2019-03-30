# Mithril Widgets

<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg"></a>

It is built upon mithril.js and bulma.css.

## Demo
[Demo](https://lostpupil.github.io/mithril-widgets)

## How to use

```javascript

import MithrilWidgets from 'mithril-widgets'
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
let tbl_ds = [{
    id: 1,
    username: 'banana',
    lorem: 'blah'
}]

m(MithrilWidgets.simpleTable, {
    headers: tbl_headers,
    ds: tbl_ds
})

m(MithrilWidgets.simpleSearchTable, {
    headers: tbl_headers,
    ds: tbl_ds
})
```

## Widgets

### simpleTable

|property name | value | required|
|--------------|-------|--------|
|headers|vnode.attrs.headers|true|
|ds|vnode.attrs.ds|true |
|page|0|false|
|limit|vnode.attrs.limit(10)|false|


### simpleSearchTable

|property name | value | required|
|--------------|-------|--------|
|headers|vnode.attrs.headers|true|
|ds|vnode.attrs.ds|true|
|page|0|false|
|limit|vnode.attrs.limit(10)|false|
|q|input('')|false|

### remoteSearchTable

|property name | value | required|
|--------------|-------|--------|
|headers|vnode.attrs.headers|true|
|ds_url|vnode.attrs.ds_url|true|
|page|0|false|
|limit|vnode.attrs.limit(10)|false|
|has_prev|false|false|
|has_next|false|false|
|total_pages|0|false|

## TODO

* example styling
* nav widget
* sidebar widget
* modal widget