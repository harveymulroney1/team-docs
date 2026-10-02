/* Labtrac Documentation — site behaviour (no dependencies). */
(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var header = document.querySelector('.site-header');
  var article = document.querySelector('[data-doc]');

  function $all(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function headerHeight() {
    return header ? header.offsetHeight : 0;
  }

  function onMediaChange(mq, fn) {
    if (mq.addEventListener) mq.addEventListener('change', fn);
    else if (mq.addListener) mq.addListener(fn);
  }

  // Jump without the smooth-scroll animation (used for programmatic corrections).
  function jumpTo(el) {
    var previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    el.scrollIntoView({ block: 'start' });
    root.style.scrollBehavior = previous;
  }

  function findTarget(hash) {
    if (!hash || hash.length < 2) return null;
    var name;
    try { name = decodeURIComponent(hash.slice(1)); } catch (e) { name = hash.slice(1); }
    return document.getElementById(name) || document.getElementsByName(name)[0] || null;
  }

  /* ------------------------------------------------------------------
     Light / dark mode
     ------------------------------------------------------------------ */
  var themeButton = document.querySelector('[data-theme-toggle]');
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('docs-theme', next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ------------------------------------------------------------------
     Sidebar: mobile drawer and expandable sections
     ------------------------------------------------------------------ */
  var sidebar = document.getElementById('site-sidebar');
  var sidebarToggle = document.querySelector('[data-sidebar-toggle]');
  var backdrop = document.querySelector('[data-sidebar-close]');
  var drawerQuery = window.matchMedia('(max-width: 959px)');

  function setSidebar(open) {
    body.classList.toggle('sidebar-open', open);
    if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', String(open));
    if (backdrop) backdrop.hidden = !open;
    if (open && sidebar) {
      var current = sidebar.querySelector('.is-current .nav-link') || sidebar.querySelector('.nav-link');
      if (current) current.focus({ preventScroll: true });
    }
  }

  if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
      setSidebar(!body.classList.contains('sidebar-open'));
    });
    if (backdrop) backdrop.addEventListener('click', function () { setSidebar(false); });
    sidebar.addEventListener('click', function (event) {
      if (drawerQuery.matches && event.target.closest('a')) setSidebar(false);
    });
    onMediaChange(drawerQuery, function (event) { if (!event.matches) setSidebar(false); });

    // Keep the current page visible in a long sidebar.
    var currentItem = sidebar.querySelector('.nav-item.is-current');
    if (currentItem && currentItem.offsetTop + 120 > sidebar.clientHeight) {
      sidebar.scrollTop = currentItem.offsetTop - 80;
    }
  }

  $all('.nav-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      var list = document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded', String(!expanded));
      if (list) list.hidden = expanded;
    });
  });

  /* ------------------------------------------------------------------
     Article: heading links, "On this page", scroll tracking
     ------------------------------------------------------------------ */
  // Pages mark sections with <a name="..."> just before the heading; prefer
  // that name so links match the ones used in the menu.
  function anchorFor(heading) {
    var previous = heading.previousElementSibling;
    if (previous && previous.classList.contains('anchor-p')) {
      var anchors = previous.querySelectorAll('a[name]');
      var name = anchors.length ? anchors[anchors.length - 1].getAttribute('name') : '';
      if (name && name.charAt(0) !== '#') return name;
    }
    return heading.id || '';
  }

  function headingLevel(heading) {
    return Number(heading.tagName.charAt(1));
  }

  var tocEntries = [];
  var sidebarEntries = [];

  if (article) {
    var headings = $all('h1, h2, h3, h4', article).filter(function (h) {
      return h.textContent.trim() && !h.closest('[data-search-skip]');
    });

    headings.forEach(function (h) {
      h.setAttribute('data-anchor', anchorFor(h));
      h.setAttribute('data-label', h.textContent.trim());
    });

    // Build the table of contents from the two most important heading levels,
    // leaving out the page title.
    var candidates = headings.slice();
    if (candidates.length && !candidates.slice(1).some(function (h) {
      return headingLevel(h) <= headingLevel(candidates[0]);
    })) {
      candidates.shift();
    }
    var levels = candidates.map(headingLevel)
      .filter(function (level, i, all) { return all.indexOf(level) === i; })
      .sort();
    var topLevel = levels[0];
    var subLevel = levels[1];
    var tocHeadings = candidates.filter(function (h) {
      var level = headingLevel(h);
      return (level === topLevel || level === subLevel) && h.getAttribute('data-anchor');
    });

    if (tocHeadings.length >= 2) {
      $all('[data-toc-list]').forEach(function (list) {
        tocHeadings.forEach(function (h) {
          var item = document.createElement('li');
          if (headingLevel(h) === subLevel) item.className = 'toc-sub';
          var link = document.createElement('a');
          link.href = '#' + h.getAttribute('data-anchor');
          link.textContent = h.getAttribute('data-label');
          item.appendChild(link);
          list.appendChild(item);
          tocEntries.push({ heading: h, link: link });
        });
      });
      $all('[data-toc], [data-toc-inline]').forEach(function (el) { el.hidden = false; });

      var inlineToc = document.querySelector('[data-toc-inline]');
      if (inlineToc) {
        inlineToc.addEventListener('click', function (event) {
          if (event.target.closest('a')) inlineToc.open = false;
        });
      }
    }

    // "#" link on each section heading, handy for sharing a specific section.
    headings.forEach(function (h) {
      var anchor = h.getAttribute('data-anchor');
      if (!anchor || headingLevel(h) < 2) return;
      var link = document.createElement('a');
      link.className = 'heading-anchor';
      link.href = '#' + anchor;
      link.setAttribute('aria-label', 'Link to “' + h.getAttribute('data-label') + '”');
      link.textContent = '#';
      h.appendChild(link);
    });

    // Sidebar links into sections of the current page.
    $all('.nav-item.is-current .nav-sublink').forEach(function (link) {
      var target = findTarget(link.hash);
      if (target) sidebarEntries.push({ heading: target, link: link });
    });

    // External links open in a new tab so readers don't lose their place.
    $all('a[href]', article).forEach(function (link) {
      if (link.hostname && link.hostname !== location.hostname && /^https?:$/.test(link.protocol)) {
        link.target = '_blank';
        link.rel = 'noopener';
      }
    });
  }

  function updateActive(entries, offset) {
    var active = null;
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].heading.getBoundingClientRect().top - offset <= 0) active = entries[i];
      else break;
    }
    var atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 4;
    if (atBottom && entries.length) active = entries[entries.length - 1];
    entries.forEach(function (entry) {
      entry.link.classList.toggle('is-active', !!active && entry.link.hash === active.link.hash);
    });
  }

  sidebarEntries.sort(function (a, b) {
    return a.heading.getBoundingClientRect().top - b.heading.getBoundingClientRect().top;
  });

  /* ------------------------------------------------------------------
     Back to top + scroll tracking
     ------------------------------------------------------------------ */
  var backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0 });
      var main = document.getElementById('main-content');
      if (main) main.focus({ preventScroll: true });
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      // A section counts as "current" once its heading reaches the top quarter of the screen.
      var offset = headerHeight() + Math.min(160, window.innerHeight * 0.25);
      if (tocEntries.length) updateActive(tocEntries, offset);
      if (sidebarEntries.length) updateActive(sidebarEntries, offset);
      if (backToTop) backToTop.hidden = window.scrollY < 900;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ------------------------------------------------------------------
     Deep links: screenshots load after the browser has jumped to #section,
     pushing it out of view. Keep the section pinned until the page settles,
     unless the reader has started scrolling themselves.
     ------------------------------------------------------------------ */
  (function keepHashTargetInView() {
    var target = findTarget(location.hash);
    if (!target || !article) return;
    var userMoved = false;
    var stop = function () { userMoved = true; };
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (type) {
      window.addEventListener(type, stop, { once: true, passive: true });
    });
    var pin = function () { if (!userMoved) jumpTo(target); };
    $all('img', article).forEach(function (img) {
      if (!img.complete) img.addEventListener('load', pin);
    });
    window.addEventListener('load', function () { pin(); setTimeout(pin, 150); });
  })();

  /* ------------------------------------------------------------------
     Screenshot lightbox
     ------------------------------------------------------------------ */
  var lightbox = document.querySelector('[data-lightbox]');
  var lightboxImg = document.querySelector('[data-lightbox-img]');
  var lightboxCaption = document.querySelector('[data-lightbox-caption]');
  var lastFocus = null;

  function openLightbox(img) {
    lastFocus = document.activeElement;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCaption.textContent = img.title || img.alt || '';
    lightboxCaption.hidden = !lightboxCaption.textContent;
    lightbox.hidden = false;
    body.style.overflow = 'hidden';
    lightbox.querySelector('[data-lightbox-close]').focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.removeAttribute('src');
    body.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  if (article && lightbox) {
    $all('img', article).forEach(function (img) {
      if (img.closest('a')) return;
      img.classList.add('is-zoomable');
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Enlarge screenshot' + (img.alt ? ': ' + img.alt : ''));
      img.addEventListener('click', function () { openLightbox(img); });
      img.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(img);
        }
      });
    });
    lightbox.addEventListener('click', closeLightbox);
  }

  /* ------------------------------------------------------------------
     Search
     ------------------------------------------------------------------ */
  var searchRoot = document.querySelector('[data-search]');
  var searchInput = document.getElementById('site-search-input');
  var searchPanel = document.getElementById('site-search-results');
  var searchToggle = document.querySelector('[data-search-toggle]');
  var sections = null;
  var indexRequest = null;
  var results = [];
  var activeIndex = -1;
  var searchTimer = null;

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Split each page into sections (one per heading) so results can link
  // straight to the relevant part of a page.
  function buildSections(pages) {
    var parser = new DOMParser();
    var list = [];
    pages.forEach(function (page) {
      var html = String(page.html || '')
        .replace(/\{%[\s\S]*?%\}/g, '')
        .replace(/\{\{[\s\S]*?\}\}/g, '');
      var container = parser.parseFromString('<div>' + html + '</div>', 'text/html').body.firstElementChild;
      if (!container) return;
      $all('[data-search-skip], script, style, video', container).forEach(function (n) { n.remove(); });

      var current = { page: page.title, url: page.url, title: page.title, anchor: '', parts: [] };
      var pendingAnchor = '';
      list.push(current);

      (function walk(node) {
        for (var child = node.firstChild; child; child = child.nextSibling) {
          if (child.nodeType === 3) {
            if (child.nodeValue.trim()) pendingAnchor = '';
            current.parts.push(child.nodeValue);
            continue;
          }
          if (child.nodeType !== 1) continue;
          var tag = child.tagName;
          if (/^H[1-6]$/.test(tag)) {
            var title = child.textContent.trim();
            if (!title) continue;
            current = { page: page.title, url: page.url, title: title, anchor: pendingAnchor || child.id || '', parts: [] };
            list.push(current);
            pendingAnchor = '';
            continue;
          }
          if (tag === 'A' && child.getAttribute('name') && !child.textContent.trim()) {
            var name = child.getAttribute('name');
            if (name.charAt(0) !== '#') pendingAnchor = name;
            continue;
          }
          walk(child);
          if (/^(P|LI|DIV|BLOCKQUOTE|TR|TD|TH|BR)$/.test(tag)) current.parts.push(' ');
        }
      })(container);
    });

    return list.map(function (s) {
      var text = s.parts.join('').replace(/\s+/g, ' ').trim();
      return {
        page: s.page,
        url: s.url + (s.anchor ? '#' + encodeURIComponent(s.anchor) : ''),
        title: s.title,
        text: text,
        titleL: s.title.toLowerCase(),
        pageL: s.page.toLowerCase(),
        textL: text.toLowerCase()
      };
    }).filter(function (s) { return s.text || s.title !== s.page; });
  }

  function loadIndex() {
    if (!indexRequest) {
      indexRequest = fetch(searchInput.getAttribute('data-search-index'))
        .then(function (response) {
          if (!response.ok) throw new Error('Search index ' + response.status);
          return response.json();
        })
        .then(function (pages) { sections = buildSections(pages); return sections; })
        .catch(function (error) { indexRequest = null; throw error; });
    }
    return indexRequest;
  }

  function countOf(haystack, needle) {
    var count = 0;
    var pos = haystack.indexOf(needle);
    while (pos !== -1 && count < 6) { count++; pos = haystack.indexOf(needle, pos + needle.length); }
    return count;
  }

  function startsWord(text, pos) {
    return pos === 0 || /[^a-z0-9]/.test(text.charAt(pos - 1));
  }

  function runSearch(query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var phrase = terms.join(' ');
    var scored = [];
    sections.forEach(function (s) {
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var term = terms[i];
        var inTitle = s.titleL.indexOf(term);
        var inPage = s.pageL.indexOf(term);
        var inText = s.textL.indexOf(term);
        if (inTitle < 0 && inPage < 0 && inText < 0) return;
        if (inTitle >= 0) score += inTitle === 0 ? 16 : startsWord(s.titleL, inTitle) ? 12 : 5;
        if (inPage >= 0) score += 2;
        if (inText >= 0) score += (startsWord(s.textL, inText) ? 2 : 1) + countOf(s.textL, term) * 0.5;
      }
      if (terms.length > 1 && (s.titleL.indexOf(phrase) >= 0 || s.textL.indexOf(phrase) >= 0)) score += 8;
      if (s.titleL === phrase) score += 20;
      scored.push({ section: s, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, 12).map(function (r) { return r.section; });
  }

  function highlight(text, terms) {
    var safe = escapeHtml(text);
    if (!terms.length) return safe;
    var pattern = new RegExp('(' + terms.map(function (t) { return escapeRegExp(escapeHtml(t)); }).join('|') + ')', 'gi');
    return safe.replace(pattern, '<mark>$1</mark>');
  }

  function snippetFor(section, terms) {
    var text = section.text;
    if (!text) return '';
    var first = -1;
    terms.forEach(function (t) {
      var pos = section.textL.indexOf(t);
      if (pos >= 0 && (first < 0 || pos < first)) first = pos;
    });
    if (first < 0) return text.length > 150 ? text.slice(0, 150) + '…' : text;
    var start = Math.max(0, first - 50);
    var end = Math.min(text.length, start + 160);
    if (start > 0) start = text.indexOf(' ', start) + 1 || start;
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }

  function setActive(index) {
    activeIndex = index;
    var options = $all('.search-result', searchPanel);
    options.forEach(function (option, i) {
      option.setAttribute('aria-selected', String(i === index));
    });
    if (options[index]) {
      searchInput.setAttribute('aria-activedescendant', options[index].id);
      options[index].scrollIntoView({ block: 'nearest' });
    } else {
      searchInput.removeAttribute('aria-activedescendant');
    }
  }

  function openPanel() {
    searchPanel.hidden = false;
    searchInput.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    searchPanel.hidden = true;
    searchInput.setAttribute('aria-expanded', 'false');
    searchInput.removeAttribute('aria-activedescendant');
    activeIndex = -1;
  }

  function showMessage(html) {
    results = [];
    searchPanel.innerHTML = '<p class="search-message">' + html + '</p>';
    openPanel();
  }

  function render(query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    results = runSearch(query);
    activeIndex = -1;
    if (!results.length) {
      showMessage('No results for “' + escapeHtml(query) + '”. Try fewer or different words.');
      return;
    }
    searchPanel.innerHTML = results.map(function (s, i) {
      var path = s.title !== s.page ? '<span class="search-result-path">' + escapeHtml(s.page) + '</span>' : '';
      var snippet = snippetFor(s, terms);
      return '<a class="search-result" role="option" aria-selected="false" id="search-result-' + i + '" href="' + escapeHtml(s.url) + '">' +
        path +
        '<span class="search-result-title">' + highlight(s.title, terms) + '</span>' +
        (snippet ? '<span class="search-result-snippet">' + highlight(snippet, terms) + '</span>' : '') +
        '</a>';
    }).join('');
    openPanel();
  }

  function update() {
    var query = searchInput.value.trim();
    if (!query) { closePanel(); return; }
    if (sections) { render(query); return; }
    showMessage('Loading…');
    loadIndex().then(function () {
      if (searchInput.value.trim() === query) render(query);
    }, function () {
      showMessage('Search is unavailable right now. Please use the menu instead.');
    });
  }

  function closeMobileSearch() {
    if (header) header.classList.remove('search-open');
  }

  if (searchRoot && searchInput && searchPanel) {
    searchInput.addEventListener('focus', function () {
      loadIndex().catch(function () { /* reported when searching */ });
      if (searchInput.value.trim()) update();
    });

    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(update, 80);
    });

    searchInput.addEventListener('keydown', function (event) {
      var count = results.length;
      if (event.key === 'ArrowDown' && count) {
        event.preventDefault();
        setActive((activeIndex + 1) % count);
      } else if (event.key === 'ArrowUp' && count) {
        event.preventDefault();
        setActive(activeIndex <= 0 ? count - 1 : activeIndex - 1);
      } else if (event.key === 'Enter') {
        var options = $all('.search-result', searchPanel);
        var chosen = options[activeIndex >= 0 ? activeIndex : 0];
        if (chosen) {
          event.preventDefault();
          chosen.click();
        }
      } else if (event.key === 'Escape') {
        if (searchInput.value) {
          searchInput.value = '';
          closePanel();
        } else {
          closePanel();
          closeMobileSearch();
          searchInput.blur();
        }
      }
    });

    searchPanel.addEventListener('click', function (event) {
      if (event.target.closest('.search-result')) {
        closePanel();
        closeMobileSearch();
        searchInput.blur();
      }
    });

    document.addEventListener('pointerdown', function (event) {
      if (!searchRoot.contains(event.target) && !(searchToggle && searchToggle.contains(event.target))) {
        closePanel();
      }
    });

    if (searchToggle) {
      searchToggle.addEventListener('click', function () {
        var open = !header.classList.contains('search-open');
        header.classList.toggle('search-open', open);
        if (open) searchInput.focus();
        else closePanel();
      });
    }
  }

  /* ------------------------------------------------------------------
     Keyboard shortcuts: "/" or Ctrl/⌘+K to search, Esc to close things
     ------------------------------------------------------------------ */
  document.addEventListener('keydown', function (event) {
    var key = event.key || '';
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable;
    if (searchInput && ((key === '/' && !typing) || (key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)))) {
      event.preventDefault();
      if (header && getComputedStyle(searchRoot).display === 'none') header.classList.add('search-open');
      searchInput.focus();
      searchInput.select();
      return;
    }
    if (event.key === 'Escape') {
      if (lightbox && !lightbox.hidden) closeLightbox();
      else if (body.classList.contains('sidebar-open')) {
        setSidebar(false);
        if (sidebarToggle) sidebarToggle.focus();
      }
    }
  });
})();
