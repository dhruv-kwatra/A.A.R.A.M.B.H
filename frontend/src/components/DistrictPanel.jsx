import { useEffect, useState } from 'react';
import {
  SEVERITY_COLORS,
  HAZARD_META,
  hazardLabel,
} from '../utils/api.js';
import { severityLabel } from '../utils/i18n.js';
import { HAZARD_ICON, IconBell, IconCheck, IconClock } from './icons.jsx';

function useNow(intervalMs = 20000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function Countdown({ arrivalMinutes, fetchedAt, t }) {
  const now = useNow();
  if (arrivalMinutes == null) {
    return (
      <span className="countdown calm">
        <span className="sev-dot" style={{ background: 'var(--br-green)', margin: 0 }} />
        {t.noThreat}
      </span>
    );
  }
  const remaining = Math.max(
    0,
    Math.round(arrivalMinutes - (now - fetchedAt) / 60000),
  );
  if (remaining <= 0) {
    return (
      <span className="countdown now">
        <span className="sev-dot pulse-ring" style={{ background: 'var(--br-red)', margin: 0 }} />
        {t.overheadNow}
      </span>
    );
  }
  return (
    <span className="countdown">
      <IconClock size={15} />
      {t.arrivingIn} <b>{remaining}</b> {t.minutes}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="skel-card" aria-hidden="true">
      <div className="skel" style={{ width: '55%', height: 16 }} />
      <div className="skel" style={{ width: '85%', height: 12 }} />
      <div className="skel" style={{ width: '40%', height: 12 }} />
    </div>
  );
}

export default function DistrictPanel({
  districts,
  fetchedAt,
  lang,
  t,
  armedMap,
  onArm,
  loading,
}) {
  return (
    <aside className="district-panel">
      <div className="panel-title">
        {t.districtAlerts}
        <span className="panel-count">{districts.length}</span>
      </div>
      <div className="district-list">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
        {!loading &&
          districts.map((d, i) => {
            const sev = d.severity || 'green';
            const color = SEVERITY_COLORS[sev] || SEVERITY_COLORS.green;
            const Icon = HAZARD_ICON[d.hazard] || null;
            const armed = armedMap[d.district];
            const advisory =
              (lang === 'hi' && d.advisory_hi ? d.advisory_hi : d.advisory) ||
              t.noAdvisory;
            return (
              <div
                key={d.district || i}
                className="district-card"
                style={{ borderLeftColor: color }}
              >
                <div className="district-head">
                  <span className="district-name">{d.district}</span>
                  <span
                    className="sev-badge"
                    style={{
                      background: `${color}1f`,
                      borderColor: color,
                      color,
                    }}
                  >
                    {severityLabel(sev, lang)}
                  </span>
                </div>
                <div className="district-hazard">
                  <span className="hz">
                    {Icon ? (
                      <Icon size={15} style={{ color }} />
                    ) : (
                      <span>{(HAZARD_META[d.hazard] || {}).icon || ''}</span>
                    )}
                    {hazardLabel(d.hazard, lang)}
                  </span>
                  {d.probability != null && (
                    <span className="prob">
                      {Math.round(d.probability * 100)}%
                    </span>
                  )}
                </div>
                {d.probability != null && (
                  <div className="prob-bar">
                    <div
                      className="prob-fill"
                      style={{
                        width: `${Math.round(d.probability * 100)}%`,
                        background: color,
                      }}
                    />
                  </div>
                )}
                <Countdown
                  arrivalMinutes={d.arrival_minutes}
                  fetchedAt={fetchedAt}
                  t={t}
                />
                <div className="district-advisory">{advisory}</div>
                {armed ? (
                  <div className="armed-chip">
                    <IconCheck size={14} /> {t.alertArmed}
                  </div>
                ) : (
                  <button
                    className="arm-btn"
                    onClick={() => onArm(d.district)}
                  >
                    <IconBell size={14} /> {t.armAlert}
                  </button>
                )}
              </div>
            );
          })}
        {!loading && districts.length === 0 && (
          <div className="district-empty">{t.noThreat}</div>
        )}
      </div>
    </aside>
  );
}
