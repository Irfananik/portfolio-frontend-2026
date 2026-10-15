import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content/70">
      <p>© 2026 A R Golam Morshed Bhuiyan. {t.ui.allRightsReserved}</p>
    </footer>
  );
}