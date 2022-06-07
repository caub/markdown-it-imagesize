# markdown-it-imagination

Plugin for markdown-it image, allows to pass image sizes `![foo](foo.jpg "=100x80")`

Options:
- `lazy`: `boolean` [`true`] If enabled, it adds loading="lazy" attribute to the img
- `caption`: `boolean|1` [`true`] If enabled it converts title into a figcaption (and wraps in figure), if sets to 1, it keeps title attr in img

Examples: see index.test.js
