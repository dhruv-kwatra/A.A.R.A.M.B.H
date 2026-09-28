import { Logo, IconArrowRight } from '../icons.jsx';
import { go } from '../../router.js';
import { useISTClock } from '../../hooks/useLive.js';

/** Glassy sticky nav: logo, section links, live IST clock, lang toggle, CTA. */
export function SiteNav({ t, lang, onLang, online }) {
  const clock = useISTClock();
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <a className="nav-brand" onClick={() => go('/')} role="link" tabIndex={0}
           onKeyDown={(e) => e.key === 'Enter' && go('/')}>
          <Logo />
          <span>A.A.R.A.<span className="grad-text">M.B.H</span></span>
        </a>
        <div className="nav-links">
          <a href="#live">{t.navLive}</a>
          <a href="#hazards">{t.navHazards}</a>
          <a href="#how">{t.navHow}</a>
          <a href="#regions">{t.navRegions}</a>
          <a href="#proof">{t.navProof}</a>
          <a href="#data">{t.navData}</a>
        </div>
        <div className="nav-right">
          <span className="nav-clock">
            <span className={`live-badge ${online ? '' : 'off'}`}>
              <span className="dot" />
              {online ? t.liveNow : t.offline}
            </span>
            <span className="clock-text">{clock}</span>
          </span>
          <div className="nav-lang" role="group" aria-label="language">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => onLang('en')}>EN</button>
            <button className={lang === 'hi' ? 'active' : ''} onClick={() => onLang('hi')}>हिंदी</button>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => go('/relocation')} style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}>
            Relocation Engine
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => go('/app')}>
            {t.launchDemo} <IconArrowRight size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}

/** Site footer: brand, product/docs links, provenance note. */
export function SiteFooter({ t }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="nav-brand" onClick={() => go('/')} role="link" tabIndex={0}
               onKeyDown={(e) => e.key === 'Enter' && go('/')}>
              <Logo />
              <span>A.A.R.A.<span className="grad-text">M.B.H</span></span>
            </a>
            <div style={{ fontSize: 13, color: '#38bdf8', fontWeight: 600, marginTop: 4, letterSpacing: '0.01em' }}>
              Atmospheric Analysis &amp; Rapid Alert Monitoring for Bursts &amp; Hazards
            </div>
            <p>{t.footTag}</p>
          </div>
          <div className="foot-col">
            <h4>{t.footProduct}</h4>
            <button className="link" onClick={() => go('/app')}>{t.launchDemo}</button>
            <a href="#live">{t.navLive}</a>
            <a href="#proof">{t.navProof}</a>
            <a href="#data">{t.navData}</a>
          </div>
          <div className="foot-col">
            <h4>{t.footExplore}</h4>
            <a href="#hazards">{t.navHazards}</a>
            <a href="#how">{t.navHow}</a>
            <a href="#regions">{t.navRegions}</a>
          </div>
        </div>
        <div className="foot-base">
          <span>{t.footRights}</span>
          <span>{t.footSih}</span>
        </div>
        <div className="foot-note">{t.footDemo}</div>
      </div>
    </footer>
  );
}
