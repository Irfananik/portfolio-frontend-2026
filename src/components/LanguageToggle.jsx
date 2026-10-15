import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'bn', label: 'বাংলা' },
  ];

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
        <Globe className="w-4 h-4 text-base-content/80" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[10] menu p-2 shadow-xl bg-base-200 border border-base-300 rounded-box w-36 mt-2 text-xs font-medium space-y-1"
      >
        {languages.map((item) => (
          <li key={item.code}>
            <button
              onClick={() => {
                setLang(item.code);
                document.activeElement?.blur();
              }}
              className={`flex justify-between items-center ${
                lang === item.code ? 'active text-primary font-bold' : ''
              }`}
            >
              <span>{item.label}</span>
              <span className="uppercase text-[10px] opacity-60">{item.code}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}