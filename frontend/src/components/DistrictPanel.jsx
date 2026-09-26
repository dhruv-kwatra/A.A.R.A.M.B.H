import { useEffect, useState } from 'react';
import {
  SEVERITY_COLORS,
  HAZARD_META,
  hazardLabel,
} from '../utils/api.js';
import { severityLabel } from '../utils/i18n.js';

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
    return <span className="countdown calm">🟢 {t.noThreat}</span>;
  }
  const remaining = Math.max(
    0,
    Math.round(arrivalMinutes - (now - fetchedAt) / 60000),
  );
  if (remaining <= 0) {
    return <span className="countdown now">🔴 {t.overheadNow}</span>;
  }
  return (
    <span className="countdown">
      ⏳ {t.arrivingIn} <b>{remaining}</b> {t.minutes}
    </span>
  );
}

export default function DistrictPanel({
  districts,
  fetchedAt,
  lang,
  t,
  armedMap,
  onArm,
}) {
  return (
    <aside className="district-panel">
      <div className="panel-title">
        {t.districtAlerts}
        <span className="panel-count">{districts.length}</span>
      </div>
      <div className="district-list">
        {districts.map((d, i) => {
          const sev = d.severity || 'green';
          const color = SEVERITY_COLORS[sev] || SEVERITY_COLORS.green;
          const meta = HAZARD_META[d.hazard] || { icon: '⛈️' };
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
                    background: `${color}22`,
                    borderColor: color,
                    color,
                  }}
                >
                  {severityLabel(sev, lang)}
                </span>
              </div>
              <div className="district-hazard">
                <span>
                  {meta.icon} {hazardLabel(d.hazard, lang)}
                </span>
                {d.probability != null && (
                  <span className="prob">
                    {t.probability}: {Math.round(d.probability * 100)}%
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
                <div className="armed-chip">✅ {t.alertArmed}</div>
              ) : (
                <button
                  className="arm-btn"
                  onClick={() => onArm(d.district)}
                >
                  🔔 {t.armAlert}
                </button>
              )}
            </div>
          );
        })}
        {districts.length === 0 && (
          <div className="district-empty">{t.noThreat}</div>
        )}
      </div>
    </aside>
  );
}
