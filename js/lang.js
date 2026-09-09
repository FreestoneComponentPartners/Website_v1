/* Language suggestion bar.
   Suggests the other language version once, based on the browser language.
   Never redirects: crawlers and shared links always land on the requested URL. */
(function () {
  var KEY = 'fcp-lang';

  function remember(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function recall() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  /* a click on the nav switcher counts as an explicit choice */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var a = t.closest('.lang-switch a[hreflang]');
    if (a) remember(a.getAttribute('hreflang'));
  });

  if (recall()) return;                                   /* already decided */

  var here = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  var pref = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
  var want = pref === 'de' ? 'de' : 'en';
  if (want === here) return;                              /* already correct */

  var alt = document.querySelector('link[rel="alternate"][hreflang="' + want + '"]');
  if (!alt) return;

  var copy = want === 'de'
    ? { msg: 'Diese Seite ist auch auf Deutsch verfügbar.', cta: 'Zu Deutsch wechseln', close: 'Schließen' }
    : { msg: 'This page is also available in English.',     cta: 'Switch to English',    close: 'Dismiss' };

  var bar = document.createElement('div');
  bar.className = 'lang-hint';
  bar.setAttribute('role', 'region');
  bar.setAttribute('lang', want);
  bar.setAttribute('aria-label', want === 'de' ? 'Sprachhinweis' : 'Language notice');

  var p = document.createElement('p');
  p.textContent = copy.msg;

  var go = document.createElement('a');
  go.className = 'btn btn-primary';
  go.href = alt.getAttribute('href');
  go.setAttribute('hreflang', want);
  go.textContent = copy.cta;
  go.addEventListener('click', function () { remember(want); });

  var x = document.createElement('button');
  x.className = 'x';
  x.type = 'button';
  x.setAttribute('aria-label', copy.close);
  x.textContent = '✕';
  x.addEventListener('click', function () {
    remember(here);
    bar.classList.remove('in');
    setTimeout(function () { bar.remove(); }, 500);
  });

  bar.appendChild(p); bar.appendChild(go); bar.appendChild(x);
  document.body.appendChild(bar);
  setTimeout(function () { bar.classList.add('in'); }, 900);
})();
