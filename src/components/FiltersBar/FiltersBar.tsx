import { useFiltersBar } from './useFiltersBar';
import { useTheme } from '@/contexts/ThemeContext';
import { Icon, ICON_NAMES } from '@/components/Icon';

export default function FiltersBar() {
  const {
    localTickerQuery,
    setLocalTickerQuery,
    currentSortBy,
    minPnlPercentage,
    maxPnlPercentage,
    clearTickerQuery,
    handleSortByChange,
    handleMinPnlPercentageChange,
    handleMaxPnlPercentageChange,
    clearPnlRange,
  } = useFiltersBar();
  const { theme } = useTheme();

  const inputClass = theme === 'light'
    ? 'bg-white border border-slate-200 text-slate-800 placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500'
    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-purple-200 focus:ring-teal-400 focus:bg-white/15';

  const labelClass = theme === 'light' ? 'text-slate-600' : 'text-purple-200';
  const buttonClass = theme === 'light'
    ? 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-purple-200 hover:text-white hover:bg-white/15';

  const selectClass = theme === 'light'
    ? 'bg-white border border-slate-200 text-slate-800 focus:ring-purple-500'
    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:ring-teal-400 focus:bg-white/15';

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* buscador */}
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          value={localTickerQuery}
          onChange={(event) => setLocalTickerQuery(event.target.value)}
          placeholder="Buscar ticker..."
          className={`w-full rounded-2xl px-4 py-2 pl-10 focus:outline-none focus:ring-2 transition-all duration-300 ${inputClass}`}
        />
        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-slate-500' : 'text-purple-200'}`}>
          <Icon name={ICON_NAMES.SEARCH} className="w-4 h-4" />
        </div>
        {localTickerQuery && (
          <button
            onClick={clearTickerQuery}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-slate-500 hover:text-slate-700' : 'text-purple-200 hover:text-white'} transition-colors duration-200`}
          >
            <Icon name={ICON_NAMES.CLOSE} className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* orden + rango P&L */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex items-center gap-2">
          <label className={`text-sm ${labelClass} whitespace-nowrap`}>Ordenar por</label>
          <select
            value={currentSortBy}
            onChange={handleSortByChange}
            className={`rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 transition-all duration-300 ${selectClass}`}
          >
            <option value="pnlPct" className={theme === 'light' ? 'bg-white text-slate-800' : 'bg-purple-700'}>P&amp;L %</option>
            <option value="weight" className={theme === 'light' ? 'bg-white text-slate-800' : 'bg-purple-700'}>% Portafolio</option>
            <option value="price" className={theme === 'light' ? 'bg-white text-slate-800' : 'bg-purple-700'}>Precio</option>
          </select>
        </div>

        {/* Rango P&L % */}
        <div className="flex items-center gap-2">
          <label className={`text-sm ${labelClass} whitespace-nowrap`}>P&amp;L %</label>
          <input
            inputMode="numeric"
            value={minPnlPercentage}
            onChange={handleMinPnlPercentageChange}
            placeholder="min"
            className={`w-16 sm:w-20 rounded-2xl px-2 py-2 focus:outline-none focus:ring-2 transition-all duration-300 ${inputClass}`}
          />
          <span className={labelClass}>–</span>
          <input
            inputMode="numeric"
            value={maxPnlPercentage}
            onChange={handleMaxPnlPercentageChange}
            placeholder="max"
            className={`w-16 sm:w-20 rounded-2xl px-2 py-2 focus:outline-none focus:ring-2 transition-all duration-300 ${inputClass}`}
          />
          <button
            onClick={clearPnlRange}
            className={`rounded-2xl px-2 sm:px-3 py-2 transition-all duration-300 ${buttonClass} whitespace-nowrap text-xs sm:text-sm`}
            title="Limpiar rango"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
