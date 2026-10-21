/* @ds-bundle: {"format":4,"namespace":"Energypedia","components":[{"name":"Logo"},{"name":"Button"},{"name":"Chip"},{"name":"Badge"},{"name":"SectionHeader"},{"name":"AskBox"},{"name":"AnswerCard"},{"name":"SegmentPicker"},{"name":"StatTile"},{"name":"ContentCard"},{"name":"TrackerCard"},{"name":"FaqList"},{"name":"NewsletterForm"},{"name":"AdSlot"},{"name":"SponsorBand"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) { if (arguments[i]) out.push(arguments[i]); }
    return out.join(' ');
  }
  function omit(obj, keys) {
    var r = {};
    for (var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) r[k] = obj[k]; }
    return r;
  }
  var uid = 0;
  function useId(given) {
    var ref = React.useRef(null);
    if (ref.current === null) { uid += 1; ref.current = given || ('ep-' + uid); }
    return ref.current;
  }
  function Icon(props) {
    var paths = {
      search: [h('circle', { key: 1, cx: 11, cy: 11, r: 7 }), h('path', { key: 2, d: 'M20 20 L16 16' })],
      sparkle: [h('path', { key: 1, d: 'M12 3 L14 9 L20 11 L14 13 L12 19 L10 13 L4 11 L10 9 Z' })],
      arrow: [h('path', { key: 1, d: 'M5 12 H19' }), h('path', { key: 2, d: 'M13 6 L19 12 L13 18' })]
    };
    return h('svg', { width: props.size || 20, height: props.size || 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', className: props.className }, paths[props.name]);
  }

  function Logo(p) {
    var inverse = p.tone === 'inverse';
    var size = p.size === 'sm' ? 26 : 30;
    var inner = [
      h('svg', { key: 'm', width: size, height: size, viewBox: '0 0 32 32', 'aria-hidden': 'true' },
        h('rect', { width: 32, height: 32, rx: 8, className: inverse ? 'ep-logo-tile-inv' : 'ep-logo-tile' }),
        h('path', { d: 'M18 5 L9 18 H15 L13 27 L23 13 H17 Z', className: inverse ? 'ep-logo-bolt-inv' : 'ep-logo-bolt' })),
      h('span', { key: 'w', className: cx('ep-logo-word', p.size === 'sm' && 'ep-logo-word-sm', inverse && 'ep-logo-word-inv') }, 'energypedia', h('span', { className: inverse ? 'ep-logo-tld-inv' : 'ep-logo-tld' }, '.pl'))
    ];
    if (p.href) return h('a', { href: p.href, className: 'ep-logo', 'aria-label': 'Energypedia – strona główna' }, inner);
    return h('span', { className: 'ep-logo', role: 'img', 'aria-label': 'Energypedia' }, inner);
  }

  function Button(p) {
    var rest = omit(p, ['variant', 'size', 'className', 'children', 'href', 'iconOnly']);
    var cls = cx('ep-btn', 'ep-btn-' + (p.variant || 'primary'), p.size === 'lg' && 'ep-btn-lg', p.size === 'sm' && 'ep-btn-sm', p.iconOnly && 'ep-btn-icon', p.className);
    if (p.href) return h('a', Object.assign({ href: p.href, className: cls }, rest), p.children);
    return h('button', Object.assign({ type: 'button', className: cls }, rest), p.children);
  }

  function Chip(p) {
    var rest = omit(p, ['pressed', 'className', 'children']);
    return h('button', Object.assign({ type: 'button', 'aria-pressed': p.pressed ? 'true' : 'false', className: cx('ep-chip', p.pressed && 'ep-chip-on', p.className) }, rest), p.children);
  }

  function Badge(p) {
    return h('span', { className: cx('ep-badge', 'ep-badge-' + (p.tone || 'status'), p.className) }, p.children);
  }

  function SectionHeader(p) {
    var Tag = 'h' + (p.level || 2);
    return h('div', { className: 'ep-sechead' },
      h('div', { className: 'ep-sechead-text' },
        p.eyebrow ? h('span', { className: 'ep-eyebrow' }, p.eyebrow) : null,
        h(Tag, { className: 'ep-sechead-title', id: p.id }, p.live ? h('span', { className: 'ep-live', 'aria-hidden': 'true' }) : null, p.title),
        p.description ? h('span', { className: 'ep-sechead-desc' }, p.description) : null),
      p.action ? h('a', { href: p.action.href || '#', className: 'ep-more' }, p.action.label, ' ', h(Icon, { name: 'arrow', size: 16 })) : null);
  }

  function AskBox(p) {
    var id = useId(p.id);
    var big = p.size !== 'md';
    function submit(e) { e.preventDefault(); if (p.onSubmit) p.onSubmit(e.target.elements[id] ? e.target.elements[id].value : ''); }
    return h('form', { role: 'search', className: cx('ep-ask', big ? 'ep-ask-lg' : 'ep-ask-md'), onSubmit: submit },
      h('label', { htmlFor: id, className: 'ep-sr' }, p.label || 'Twoje pytanie o energię'),
      big ? h(Icon, { name: 'search', size: 22, className: 'ep-ask-icon' }) : null,
      h('input', { id: id, name: id, type: 'search', className: 'ep-ask-input', placeholder: p.placeholder || 'np. Ile kosztuje 1 kWh prądu w mojej firmie?', defaultValue: p.defaultValue }),
      h('button', { type: 'submit', className: 'ep-btn ep-btn-primary ep-ask-btn' }, p.buttonLabel || 'Zapytaj'));
  }

  function AnswerCard(p) {
    var sources = p.sources || [];
    return h('article', { className: 'ep-answer', 'aria-live': 'polite' },
      h('span', { className: 'ep-answer-kicker' }, h(Icon, { name: 'sparkle', size: 16 }), p.kicker || 'Odpowiedź AI na podstawie artykułów Energypedii'),
      h('h3', { className: 'ep-answer-q' }, p.question),
      h('p', { className: 'ep-answer-a' }, p.answer),
      sources.length ? h('div', { className: 'ep-answer-src' },
        h('span', { className: 'ep-muted' }, 'Źródła:'),
        sources.map(function (s, i) { return h('a', { key: i, href: s.href || '#' }, s.label); })) : null,
      h('span', { className: 'ep-caption' }, p.disclaimer || 'Treść wygenerowana przez AI. Ma charakter informacyjny i nie jest poradą prawną w indywidualnej sprawie.'));
  }

  function SegmentPicker(p) {
    var opts = p.options || [];
    var st = React.useState(p.defaultValue || (opts[0] && opts[0].id));
    var value = p.value !== undefined ? p.value : st[0];
    function pick(id) { if (p.value === undefined) st[1](id); if (p.onChange) p.onChange(id); }
    return h('div', { role: 'group', 'aria-label': p.label || 'Kim jesteś', className: cx('ep-seg', p.compact && 'ep-seg-compact') },
      opts.map(function (o) {
        var on = o.id === value;
        return h('button', { key: o.id, type: 'button', 'aria-pressed': on ? 'true' : 'false', className: cx('ep-seg-item', on && 'ep-seg-on'), onClick: function () { pick(o.id); } },
          h('span', { className: 'ep-seg-name' }, o.name),
          o.description ? h('span', { className: 'ep-seg-desc' }, o.description) : null);
      }));
  }

  function StatTile(p) {
    var Tag = p.href ? 'a' : 'div';
    return h(Tag, { href: p.href, className: cx('ep-stat', p.href && 'ep-card-hover') },
      h('span', { className: 'ep-stat-label' }, p.live ? h('span', { className: 'ep-live', 'aria-hidden': 'true' }) : null, p.label),
      h('span', { className: 'ep-stat-value' }, p.value),
      p.note ? h('span', { className: 'ep-stat-note' }, p.note) : null);
  }

  function ContentCard(p) {
    var partner = !!p.partner;
    var kind = partner ? ('MATERIAŁ PARTNERA' + (p.partnerName ? ' · ' + p.partnerName : '')) : p.kind;
    return h('a', { href: p.href || '#', rel: partner ? 'sponsored' : undefined, className: cx('ep-content', partner && 'ep-content-partner', 'ep-card-hover') },
      kind ? h('span', { className: partner ? 'ep-content-kind-partner' : 'ep-content-kind' }, kind) : null,
      h('span', { className: 'ep-content-title' }, p.title),
      p.lead ? h('span', { className: 'ep-content-lead' }, p.lead) : null);
  }

  function TrackerCard(p) {
    return h('a', { href: p.href || '#', className: 'ep-tracker ep-card-hover' },
      h(Badge, { tone: 'status' }, p.status),
      h('span', { className: 'ep-tracker-title' }, p.title),
      p.description ? h('span', { className: 'ep-tracker-desc' }, p.description) : null,
      h('span', { className: 'ep-caption' }, 'Ostatnia aktualizacja: ' + (p.updated || '[data, godzina]')));
  }

  function FaqList(p) {
    return h('div', { className: 'ep-faq' }, (p.items || []).map(function (it, i) {
      return h('a', { key: i, href: it.href || '#', className: 'ep-faq-item' },
        h('span', { className: 'ep-faq-q' }, it.question),
        it.answer ? h('span', { className: 'ep-faq-a' }, it.answer) : null);
    }));
  }

  function NewsletterForm(p) {
    var id = useId(p.id);
    var st = React.useState(false);
    function submit(e) { e.preventDefault(); st[1](true); if (p.onSubmit) p.onSubmit(e.target.elements[id].value); }
    return h('section', { className: 'ep-news', 'aria-label': p.title || 'Newsletter' },
      h('div', { className: 'ep-news-text' },
        h('h2', { className: 'ep-news-title' }, p.title || 'Energia w 5 minut'),
        h('p', { className: 'ep-news-desc' }, p.description || 'Codziennie o 7:30. Jedna zmiana na rynku, jedno wyjaśnienie, jedna rzecz do zrobienia.')),
      st[0] ? h('p', { className: 'ep-news-done', role: 'status' }, 'Zapisano. Sprawdź skrzynkę i potwierdź adres.') :
        h('form', { className: 'ep-news-form', onSubmit: submit },
          h('div', { className: 'ep-field' },
            h('label', { htmlFor: id, className: 'ep-news-label' }, 'Adres e-mail'),
            h('input', { id: id, name: id, type: 'email', required: true, placeholder: 'np. jan@firma.pl', className: 'ep-input' })),
          h('button', { type: 'submit', className: 'ep-btn ep-btn-primary' }, p.buttonLabel || 'Zapisz mnie'),
          h('span', { className: 'ep-news-legal' }, 'Możesz wypisać się w każdej chwili. ', h('a', { href: p.privacyHref || '#' }, 'Polityka prywatności'))));
  }

  var AD_SIZES = { '970x250': [970, 250], '750x200': [750, 200], '728x90': [728, 90], '300x600': [300, 600], '300x250': [300, 250], '320x100': [320, 100], '320x50': [320, 50] };
  function AdSlot(p) {
    var s = AD_SIZES[p.size] || AD_SIZES['300x250'];
    return h('aside', { 'aria-label': 'Reklama', className: 'ep-ad', style: { maxWidth: s[0] + 'px', height: s[1] + 'px' }, 'data-slot': p.slotId },
      h('span', { className: 'ep-ad-label' }, 'REKLAMA'),
      p.showMeta === false ? null : h('span', { className: 'ep-ad-meta' }, (p.slotId || 'EP_SLOT') + ' · ' + (p.size || '300x250').replace('x', '×')));
  }

  function SponsorBand(p) {
    return h('section', { className: 'ep-sponsor', 'aria-label': p.title },
      h('div', { className: 'ep-sponsor-text' },
        h('h2', { className: 'ep-sponsor-title' }, p.title),
        p.subtitle ? h('span', { className: 'ep-muted' }, p.subtitle) : null),
      h('div', { className: 'ep-sponsor-partner' },
        h('span', null, p.partnerLabel || 'Partner działu'),
        p.logo || h('span', { className: 'ep-sponsor-logo' }, '[logo]'),
        h('a', { href: p.disclosureHref || '#' }, 'Jak zarabiamy')));
  }

  var api = { Logo: Logo, Button: Button, Chip: Chip, Badge: Badge, SectionHeader: SectionHeader, AskBox: AskBox, AnswerCard: AnswerCard, SegmentPicker: SegmentPicker, StatTile: StatTile, ContentCard: ContentCard, TrackerCard: TrackerCard, FaqList: FaqList, NewsletterForm: NewsletterForm, AdSlot: AdSlot, SponsorBand: SponsorBand };
  window.Energypedia = window.Energypedia || {};
  Object.assign(window.Energypedia, api);
})();
