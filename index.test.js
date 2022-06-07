const { strictEqual: same } = require('assert');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

md.use(require('.'));

same(
  md.renderInline(`![foo](foo.jpg)`),
  `<img src="foo.jpg" alt="foo" loading="lazy">`
);

same(
  md.renderInline(`![foo](foo.jpg "=100x80")`),
  `<img src="foo.jpg" alt="foo" title="=100x80" loading="lazy" width="100" height="80">`
);

same(
  md.renderInline(`![foo](foo.jpg "My caption")`),
  `<figure><img src="foo.jpg" alt="foo" loading="lazy"><figcaption>My caption</figcaption></figure>`
);

same(
  md.renderInline(`![foo](foo.jpg "Some caption=100x80")`),
  `<figure><img src="foo.jpg" alt="foo" loading="lazy" width="100" height="80"><figcaption>Some caption</figcaption></figure>`
);
