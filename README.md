# test-documentation
Test Run of Documentation Site

## Editing the docs

The site is built by GitHub Pages (Jekyll) straight from this repository — there is nothing to install or build.

- **Pages** live in `documentation/` as Markdown files.
- **The menu** (sidebar, welcome-page cards, previous/next links and search) is driven by
  [`_data/navigation.yml`](_data/navigation.yml). A new page only appears in the menu and in search
  once it is listed there.
- **Section links** use the existing `<a class="offset" name="..."></a>` lines placed just above a heading;
  link to them with `page-name#name`.
- **Tip / Remember boxes** are blockquotes followed by `{: .alert.alert-info}` on its own line.
- **Screenshots** can be clicked to enlarge. Leave a blank line between an image and a `---` line below it,
  otherwise the image is turned into a heading.
- **Support details** (phone, email, hours) shown in the header, sidebar and footer are set once in
  [`_config.yml`](_config.yml).

### Theme files

| File | Purpose |
| --- | --- |
| `_layouts/default.html` | Page shell: header, sidebar, footer |
| `_layouts/article.html` | Documentation pages: breadcrumbs, "On this page", previous/next |
| `_includes/` | Header, sidebar, cards, icons and other pieces |
| `stylesheets/docs.css` | All styling, including dark mode and mobile layout |
| `javascripts/docs.js` | Search, menu, "On this page" tracking, screenshot zoom |
| `search.json` | Search index, generated automatically on each build |
