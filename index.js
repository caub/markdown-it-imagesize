module.exports = function markdownItImageSize(md, { lazy = true, caption = true } = {}) {
  md.renderer.rules.image = function (tokens, idx, options, env, slf) {
    const token = tokens[idx];

    // "alt" attr MUST be set, even if empty. Because it's mandatory and
    // should be placed on proper position for tests.
    //
    // Replace content with actual value

    token.attrs[token.attrIndex('alt')][1] =
      slf.renderInlineAsText(token.children, options, env);

    if (lazy && token.attrIndex('loading') === -1) { // add loading="lazy" attribute
      token.attrs.push(['loading', 'lazy']);
    }

    // process optional ={width}x{height} title
    const titleIndex = token.attrIndex('title');
    if (titleIndex >= 0) {
      const [title, size] = token.attrs[titleIndex][1].split('=');
      const [width, height] = size ? size.split('x').map(v => v.trim()).filter(Boolean) : [];
      if (title) {
        token.attrs.splice(titleIndex, 1,
          ...typeof caption !== 'boolean' && title ? [['title', title]] : [],
        );
      }
      if (width) {
        token.attrs.push(
          ...width ? [['width', width]] : [],
          ...height ? [['height', height]] : [],
        );
      }

      if (caption && title) return `<figure>${slf.renderToken(tokens, idx, options)}<figcaption>${title}</figcaption></figure>`;
    }

    return slf.renderToken(tokens, idx, options);
  };
};
