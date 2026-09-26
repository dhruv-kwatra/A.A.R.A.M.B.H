export default function Footer({ t, online, apiUrl }) {
  return (
    <footer className="app-footer">
      <div className="footer-line footer-sources">{t.footerSources}</div>
      <div className="footer-line footer-demo">
        ⚠️ {t.footerDemo}
        <span className="footer-conn">
          {online ? ` ● ${apiUrl}` : ' ○ backend unreachable'}
        </span>
      </div>
    </footer>
  );
}
