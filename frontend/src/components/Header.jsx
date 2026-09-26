import { formatIST, SEVERITY_COLORS } from '../utils/api.js';
import { regionName } from '../utils/i18n.js';

function StatusDot({ online }) {
  return (
    <span
      className={`status-dot ${online ? 'on' : 'off'}`}
      title={online ? 'connected' : 'disconnected'}
    />
  );
}

export default function Header({
  online,
  health,
  cycle,
  counts,
  regions,
  regionId,
  onRegion,
  lang,
  onLang,
  t,
}) {
  const totalCells = counts
    ? Object.values(counts).reduce((a, b) => a + (Number(b) || 0), 0)
    : 0;
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark">🛡️</div>
        <div>
          <div className="brand-title">BhoomiRakshak</div>
          <div className="brand-sub">{t.subtitle}</div>
        </div>
      </div>

      <nav className="region-bar" aria-label={t.region}>
        {regions.map((r) => (
          <button
            key={r.id}
            className={`region-chip ${r.id === regionId ? 'active' : ''}`}
            onClick={() => onRegion(r.id)}
            title={r.name}
          >
            {regionName(r, lang)}
          </button>
        ))}
      </nav>

      <div className="header-right">
        <div className="lang-toggle" role="group" aria-label="language">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => onLang('en')}
          >
            EN
          </button>
          <button
            className={lang === 'hi' ? 'active' : ''}
            onClick={() => onLang('hi')}
          >
            हिंदी
          </button>
        </div>

        <div className="status-block">
          <StatusDot online={online} />
          <span className="status-text">
            {online ? t.live : t.offline}
          </span>
          {health?.mode && (
            <span className={`mode-badge mode-${health.mode}`}>
              {health.mode === 'demo' ? t.demo : t.live}
            </span>
          )}
        </div>

        <div className="cycle-block" title={t.lastCycle}>
          <span className="cycle-label">{t.lastCycle}</span>
          <span className="cycle-time">
            {formatIST(cycle?.valid_time || health?.last_cycle)}
          </span>
        </div>

        <div className="count-badges" title={t.cells}>
          {counts &&
            Object.entries(counts).map(([sev, n]) => (
              <span
                key={sev}
                className="count-badge"
                style={{
                  background: `${SEVERITY_COLORS[sev] || '#888'}22`,
                  borderColor: SEVERITY_COLORS[sev] || '#888',
                  color: SEVERITY_COLORS[sev] || '#888',
                }}
              >
                {n} {sev}
              </span>
            ))}
          {!counts && totalCells === 0 && (
            <span className="count-badge idle">— {t.cells}</span>
          )}
        </div>
      </div>
    </header>
  );
}
