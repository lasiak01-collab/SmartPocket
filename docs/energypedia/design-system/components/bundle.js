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

  // Logo 3 „E z danych”: sygnet z 4 słupków + logotyp Manrope 800 zamieniony na krzywe (bez zależności od fontu).
  var EP_WORD = {
    energy: 'M137.7 81.3Q131.3 81.3 126.5 78.5Q121.6 75.8 118.9 71Q116.1 66.1 116.1 59.9Q116.1 53.1 118.8 48.1Q121.5 43.1 126.2 40.3Q130.9 37.5 137.1 37.5Q143.6 37.5 148.2 40.6Q152.7 43.6 154.9 49.2Q157.1 54.8 156.5 62.3H146.1V58.5Q146.1 52.1 144.1 49.3Q142.1 46.6 137.5 46.6Q132.2 46.6 129.7 49.8Q127.2 53 127.2 59.4Q127.2 65.2 129.7 68.3Q132.2 71.5 137.1 71.5Q140.2 71.5 142.3 70.2Q144.5 68.8 145.7 66.3L156.1 69.3Q153.8 75 148.7 78.1Q143.7 81.3 137.7 81.3ZM123.9 62.3V54.5H151.4V62.3ZM188.8 80.1V60.5Q188.8 59.1 188.6 56.9Q188.5 54.7 187.7 52.5Q186.8 50.2 185 48.7Q183.2 47.2 179.9 47.2Q178.5 47.2 177 47.7Q175.4 48.1 174.1 49.3Q172.8 50.5 171.9 52.8Q171 55.2 171 59.1L165 56.2Q165 51.3 167 47Q169 42.7 173 40.1Q177.1 37.4 183.2 37.4Q188 37.4 191.1 39.1Q194.2 40.7 195.9 43.2Q197.6 45.8 198.3 48.5Q199.1 51.3 199.2 53.5Q199.4 55.8 199.4 56.8V80.1ZM160.4 80.1V38.6H169.7V52.4H171V80.1ZM224.4 81.3Q218 81.3 213.2 78.5Q208.3 75.8 205.6 71Q202.8 66.1 202.8 59.9Q202.8 53.1 205.5 48.1Q208.2 43.1 212.9 40.3Q217.6 37.5 223.8 37.5Q230.3 37.5 234.9 40.6Q239.5 43.6 241.6 49.2Q243.8 54.8 243.2 62.3H232.8V58.5Q232.8 52.1 230.8 49.3Q228.8 46.6 224.2 46.6Q218.9 46.6 216.4 49.8Q213.9 53 213.9 59.4Q213.9 65.2 216.4 68.3Q218.9 71.5 223.8 71.5Q226.9 71.5 229 70.2Q231.2 68.8 232.4 66.3L242.8 69.3Q240.5 75 235.4 78.1Q230.4 81.3 224.4 81.3ZM210.7 62.3V54.5H238.1V62.3ZM248.4 80.1V38.6H257.6V48.8L256.6 47.5Q257.4 45.3 258.7 43.6Q260.1 41.8 262 40.6Q263.5 39.7 265.3 39.2Q267.1 38.7 268.9 38.5Q270.8 38.4 272.7 38.6V48.4Q271 47.9 268.7 48Q266.4 48.2 264.6 49.1Q262.7 49.9 261.5 51.3Q260.2 52.7 259.5 54.6Q258.9 56.5 258.9 58.9V80.1ZM292.8 99.7Q289.2 99.7 286 98.6Q282.8 97.4 280.3 95.4Q277.8 93.4 276.2 90.7L285.9 86Q286.9 87.9 288.8 88.8Q290.6 89.8 292.8 89.8Q295.2 89.8 297.2 89Q299.3 88.2 300.6 86.7Q301.8 85.1 301.7 82.8V70.7H303V38.6H312.2V83Q312.2 84.5 312 85.9Q311.9 87.2 311.6 88.6Q310.6 92.4 307.9 94.8Q305.2 97.3 301.2 98.5Q297.3 99.7 292.8 99.7ZM291.8 81.3Q286.1 81.3 281.8 78.4Q277.5 75.5 275.1 70.6Q272.7 65.6 272.7 59.4Q272.7 53 275.1 48.1Q277.6 43.2 282 40.3Q286.4 37.5 292.4 37.5Q298.3 37.5 302.3 40.4Q306.3 43.2 308.4 48.2Q310.5 53.2 310.5 59.4Q310.5 65.6 308.4 70.6Q306.3 75.5 302.2 78.4Q298 81.3 291.8 81.3ZM293.5 72Q297 72 299.1 70.4Q301.2 68.8 302.1 66Q303 63.1 303 59.4Q303 55.6 302.1 52.8Q301.2 49.9 299.2 48.4Q297.2 46.8 293.9 46.8Q290.4 46.8 288.2 48.5Q285.9 50.2 284.8 53.1Q283.8 55.9 283.8 59.4Q283.8 62.9 284.8 65.7Q285.8 68.6 288 70.3Q290.1 72 293.5 72ZM324.8 98.5 332.8 76.6 332.9 83 314.9 38.6H325.7L337.8 70.1H335.4L347.4 38.6H357.9L334.5 98.5Z',
    pedia: 'M380.2 81.3Q374 81.3 369.8 78.4Q365.7 75.5 363.6 70.6Q361.5 65.6 361.5 59.4Q361.5 53.2 363.6 48.2Q365.6 43.2 369.7 40.4Q373.7 37.5 379.6 37.5Q385.6 37.5 390 40.3Q394.4 43.2 396.8 48.1Q399.3 53 399.3 59.4Q399.3 65.6 396.9 70.6Q394.5 75.5 390.2 78.4Q385.9 81.3 380.2 81.3ZM359.7 98.5V38.6H368.9V67.1H370.2V98.5ZM378.5 72Q381.8 72 384 70.3Q386.1 68.6 387.2 65.7Q388.2 62.9 388.2 59.4Q388.2 55.9 387.1 53.1Q386.1 50.2 383.8 48.5Q381.6 46.8 378.1 46.8Q374.8 46.8 372.8 48.4Q370.8 49.9 369.9 52.8Q368.9 55.6 368.9 59.4Q368.9 63.1 369.9 66Q370.8 68.8 372.9 70.4Q375 72 378.5 72ZM423.5 81.3Q417.2 81.3 412.3 78.5Q407.5 75.8 404.7 71Q402 66.1 402 59.9Q402 53.1 404.6 48.1Q407.3 43.1 412.1 40.3Q416.8 37.5 422.9 37.5Q429.5 37.5 434 40.6Q438.6 43.6 440.8 49.2Q443 54.8 442.3 62.3H432V58.5Q432 52.1 430 49.3Q428 46.6 423.4 46.6Q418.1 46.6 415.5 49.8Q413 53 413 59.4Q413 65.2 415.5 68.3Q418.1 71.5 422.9 71.5Q426 71.5 428.2 70.2Q430.4 68.8 431.5 66.3L442 69.3Q439.6 75 434.6 78.1Q429.5 81.3 423.5 81.3ZM409.8 62.3V54.5H437.3V62.3ZM464.3 81.3Q458.6 81.3 454.3 78.4Q450 75.5 447.6 70.6Q445.2 65.6 445.2 59.4Q445.2 53 447.6 48.1Q450.1 43.2 454.5 40.3Q458.9 37.5 464.9 37.5Q470.8 37.5 474.8 40.4Q478.8 43.2 480.9 48.2Q483 53.2 483 59.4Q483 65.6 480.9 70.6Q478.8 75.5 474.7 78.4Q470.5 81.3 464.3 81.3ZM466 72Q469.5 72 471.6 70.4Q473.7 68.8 474.6 66Q475.5 63.1 475.5 59.4Q475.5 55.6 474.6 52.8Q473.7 49.9 471.7 48.4Q469.7 46.8 466.4 46.8Q462.9 46.8 460.7 48.5Q458.4 50.2 457.3 53.1Q456.3 55.9 456.3 59.4Q456.3 62.9 457.3 65.7Q458.3 68.6 460.5 70.3Q462.6 72 466 72ZM475.5 80.1V51.7H474.2V24.8H484.8V80.1ZM492.8 32.9V23.7H503.3V32.9ZM492.8 80.1V38.6H503.3V80.1ZM522.8 81.3Q518.4 81.3 515.3 79.6Q512.2 77.8 510.6 75Q509 72.1 509 68.7Q509 65.8 509.9 63.4Q510.8 61 512.8 59.2Q514.7 57.4 518.1 56.2Q520.4 55.3 523.6 54.7Q526.8 54 530.8 53.4Q534.8 52.8 539.7 52.1L535.9 54.2Q535.9 50.5 534.1 48.7Q532.4 47 528.2 47Q525.9 47 523.4 48.1Q520.9 49.2 519.9 52.1L510.5 49.1Q512.1 43.9 516.4 40.7Q520.7 37.5 528.2 37.5Q533.7 37.5 538 39.2Q542.2 40.9 544.4 45Q545.7 47.3 545.9 49.6Q546.1 51.9 546.1 54.8V80.1H537V71.6L538.3 73.4Q535.2 77.5 531.7 79.4Q528.2 81.3 522.8 81.3ZM525.1 73Q528 73 529.9 72Q531.9 71 533.1 69.7Q534.2 68.4 534.7 67.5Q535.5 65.8 535.6 63.6Q535.7 61.3 535.7 59.8L538.8 60.6Q534.2 61.4 531.3 61.9Q528.4 62.4 526.6 62.8Q524.9 63.3 523.5 63.8Q522 64.4 521.1 65.1Q520.1 65.8 519.7 66.6Q519.2 67.5 519.2 68.5Q519.2 69.9 519.9 71Q520.7 72 522 72.5Q523.3 73 525.1 73Z',
    tld: 'M554.3 80.1V69.7H564.8V80.1ZM594.1 81.3Q587.9 81.3 583.8 78.4Q579.6 75.5 577.5 70.6Q575.5 65.6 575.5 59.4Q575.5 53.2 577.5 48.2Q579.6 43.2 583.6 40.4Q587.7 37.5 593.6 37.5Q599.5 37.5 603.9 40.3Q608.4 43.2 610.8 48.1Q613.2 53 613.2 59.4Q613.2 65.6 610.8 70.6Q608.4 75.5 604.1 78.4Q599.8 81.3 594.1 81.3ZM573.7 98.5V38.6H582.9V67.1H584.2V98.5ZM592.4 72Q595.8 72 598 70.3Q600.1 68.6 601.1 65.7Q602.2 62.9 602.2 59.4Q602.2 55.9 601.1 53.1Q600 50.2 597.8 48.5Q595.5 46.8 592 46.8Q588.8 46.8 586.8 48.4Q584.7 49.9 583.8 52.8Q582.9 55.6 582.9 59.4Q582.9 63.1 583.8 66Q584.7 68.8 586.8 70.4Q588.9 72 592.4 72ZM619 80.1V23.7H629.4V80.1Z'
  };
  function Logo(p) {
    var signet = p.variant === 'signet';
    var withDomain = p.withDomain !== false;
    var anim = p.animate || 'intro-live';
    var height = typeof p.size === 'number' ? p.size : ({ lg: 48, md: 40, sm: 32 })[p.size || 'md'];
    var vb = signet ? '18 18 72 72' : (withDomain ? '18 18 617.59 81.7' : '18 18 532.72 81.7');
    var w = signet ? 72 : (withDomain ? 617.59 : 532.72);
    var mark = h('g', { key: 'e', className: cx('ep-logo-e', anim !== 'none' && 'ep-logo-intro', anim === 'intro-live' && 'ep-logo-live') },
      h('rect', { className: 'ep-logo-spine', x: 18, y: 18, width: 18, height: 72, rx: 6 }),
      h('rect', { className: 'ep-logo-top', x: 18, y: 18, width: 72, height: 18, rx: 6 }),
      h('rect', { className: 'ep-logo-mid', x: 44, y: 45, width: 40, height: 18, rx: 6 }),
      h('rect', { className: 'ep-logo-bot', x: 18, y: 72, width: 60, height: 18, rx: 6 }));
    var parts = [mark];
    if (!signet) {
      parts.push(h('path', { key: 'w1', className: 'ep-logo-ink', d: EP_WORD.energy }));
      parts.push(h('path', { key: 'w2', className: 'ep-logo-word-accent', d: EP_WORD.pedia }));
      if (withDomain) parts.push(h('path', { key: 'w3', className: 'ep-logo-tld', d: EP_WORD.tld }));
    }
    var svg = h('svg', { className: 'ep-logo-svg', viewBox: vb, height: height, width: Math.round(height * w / (signet ? 72 : 81.7)), 'aria-hidden': 'true', focusable: 'false' }, parts);
    var cls = cx('ep-logo', p.tone === 'inverse' && 'ep-logo-inv', p.className);
    if (p.href) return h('a', { href: p.href, className: cls, 'aria-label': 'Energypedia.pl – strona główna' }, svg);
    return h('span', { className: cls, role: 'img', 'aria-label': 'Energypedia.pl' }, svg);
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
