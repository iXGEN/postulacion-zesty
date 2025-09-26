import { useTimeframeSwitcher } from './useTimeframeSwitcher';
import { useTheme } from '@/contexts/ThemeContext';

export default function TimeframeSwitcher() {
    const { currentTimeframe, handleTimeframeChange, options } = useTimeframeSwitcher();
    const { theme } = useTheme();

    const containerClass = theme === 'light'
        ? 'bg-slate-100 border border-slate-200'
        : 'bg-white/10 backdrop-blur-sm border border-white/20';

    const activeClass = theme === 'light'
        ? 'bg-purple-600 text-white shadow-md'
        : 'bg-teal-400 text-white shadow-lg';

    const inactiveClass = theme === 'light'
        ? 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
        : 'text-purple-200 hover:text-white hover:bg-white/10';

    return (
        <div className={`inline-flex rounded-2xl p-1 gap-1 transition-all duration-300 ${containerClass}`}>
            {options.map(o => (
                <button
                    key={o.key}
                    onClick={() => handleTimeframeChange(o.key)}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300
            ${currentTimeframe === o.key ? activeClass : inactiveClass}`}
                >
                    {o.label}
                </button>
            ))}
        </div>
    );
}
