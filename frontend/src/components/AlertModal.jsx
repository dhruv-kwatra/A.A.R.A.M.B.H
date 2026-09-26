import { useState } from 'react';

const LS_KEY = 'bhoomirakshak_alerts_v1';

export function loadArmed() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveArmed(map) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(map));
  } catch {
    /* storage unavailable — alert state stays in memory */
  }
}

export default function AlertModal({ district, regionId, lang, t, onClose, onSaved }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const map = loadArmed();
    map[`${regionId}::${district}`] = {
      name: name.trim(),
      contact: contact.trim(),
      armedAt: new Date().toISOString(),
    };
    saveArmed(map);
    setDone(true);
    onSaved(district);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          🔔 {t.alertModalTitle} — {district}
        </div>
        <div className="modal-sub">{t.alertModalSub}</div>
        {done ? (
          <div className="modal-done">
            <div className="done-icon">✅</div>
            <div>{t.alertSaved}</div>
            <button className="arm-btn" onClick={onClose}>
              {lang === 'hi' ? 'ठीक है' : 'OK'}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="alert-form">
            <label>
              {t.nameLabel}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={80}
                placeholder={lang === 'hi' ? 'आपका नाम' : 'Your name'}
              />
            </label>
            <label>
              {t.contactLabel}
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                maxLength={120}
                placeholder={lang === 'hi' ? 'मोबाइल / ईमेल' : 'Mobile / email'}
              />
            </label>
            <div className="modal-actions">
              <button type="button" className="ghost-btn" onClick={onClose}>
                {t.cancel}
              </button>
              <button type="submit" className="arm-btn">
                {t.saveAlert}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
