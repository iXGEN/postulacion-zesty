import { useTheme } from '@/contexts/ThemeContext';
import { Icon, ICON_NAMES } from '@/components/Icon';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const buttonClass = theme === 'light'
        ? 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50'
        : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15';

    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-2xl transition-all duration-300 group ${buttonClass}`}
            title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
        >
            <div className="relative w-6 h-6">
                {/* Sun icon */}
                <Icon
                    name={ICON_NAMES.SUN}
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${theme === 'light'
                        ? 'opacity-100 rotate-0 scale-100 text-teal-400'
                        : 'opacity-0 rotate-90 scale-75 text-slate-400'
                        }`}
                />

                {/* Moon icon */}
                <Icon
                    name={ICON_NAMES.MOON}
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${theme === 'dark'
                        ? 'opacity-100 rotate-0 scale-100 text-teal-400'
                        : 'opacity-0 -rotate-90 scale-75 text-slate-400'
                        }`}
                />
            </div>
        </button>
    );
}
