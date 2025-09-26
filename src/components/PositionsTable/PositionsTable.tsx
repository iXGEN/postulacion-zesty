import { memo } from 'react';
import { formatCurrencyUSD, formatPercentage } from '@/utils/format';
import { usePositionsTable } from './usePositionsTable';
import { useTheme } from '@/contexts/ThemeContext';

function PositionsTable() {
  const { rows, tickerQuery } = usePositionsTable();
  const { theme } = useTheme();

  const tableClass = theme === 'light'
    ? 'bg-white border border-slate-200 shadow-sm'
    : 'bg-white/10 backdrop-blur-sm border border-white/20';

  const headerClass = theme === 'light' ? 'bg-slate-50' : 'bg-white/5';
  const headerTextClass = theme === 'light' ? 'text-slate-600' : 'text-purple-200';
  const bodyTextClass = theme === 'light' ? 'text-slate-700' : 'text-purple-200';
  const primaryTextClass = theme === 'light' ? 'text-slate-900' : 'text-white';
  const dividerClass = theme === 'light' ? 'divide-slate-200' : 'divide-white/10';
  const hoverClass = theme === 'light' ? 'hover:bg-slate-50' : 'hover:bg-white/5';
  const noResultsClass = theme === 'light' ? 'text-slate-500' : 'text-purple-300';
  const noResultsHighlightClass = theme === 'light' ? 'text-slate-700' : 'text-white';

  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${tableClass}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full min-h-[400px]">
          <thead className={headerClass}>
            <tr className="text-left text-sm">
              <th className={`px-3 sm:px-6 py-4 font-medium ${headerTextClass}`}>Ticker</th>
              <th className={`px-3 sm:px-6 py-4 font-medium ${headerTextClass}`}>Qty</th>
              <th className={`px-3 sm:px-6 py-4 font-medium ${headerTextClass}`}>Avg</th>
              <th className={`px-3 sm:px-6 py-4 font-medium ${headerTextClass}`}>Precio</th>
              <th className={`px-3 sm:px-6 py-4 font-medium ${headerTextClass}`}>Valor</th>
              <th className={`px-3 sm:px-6 py-4 font-medium ${headerTextClass}`}>P&amp;L</th>
              <th className={`px-3 sm:px-6 py-4 font-medium ${headerTextClass}`}>P&amp;L %</th>
              <th className={`px-3 sm:px-6 py-4 font-medium ${headerTextClass}`}>% Portafolio</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${dividerClass}`}>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className={`px-6 py-16 text-center ${noResultsClass}`}>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-lg">
                      Sin resultados <span className={`font-semibold ${noResultsHighlightClass}`}>{tickerQuery}</span>
                    </div>
                    <div className="text-sm opacity-75">
                      Intenta ajustar los filtros de búsqueda
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map(r => (
                <tr key={r.ticker} className={`text-sm ${hoverClass} transition-colors duration-200`}>
                  <td className={`px-3 sm:px-6 py-4 font-semibold ${primaryTextClass}`}>{r.ticker}</td>
                  <td className={`px-3 sm:px-6 py-4 ${bodyTextClass}`}>{r.qty}</td>
                  <td className={`px-3 sm:px-6 py-4 ${bodyTextClass}`}>{formatCurrencyUSD(r.avgPrice)}</td>
                  <td className={`px-3 sm:px-6 py-4 ${bodyTextClass}`}>{formatCurrencyUSD(r.price)}</td>
                  <td className={`px-3 sm:px-6 py-4 ${bodyTextClass}`}>{formatCurrencyUSD(r.value)}</td>
                  <td className={`px-3 sm:px-6 py-4 font-medium ${r.pnlAbs >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                    {formatCurrencyUSD(r.pnlAbs)}
                  </td>
                  <td className={`px-3 sm:px-6 py-4 font-medium ${r.pnlPct >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                    {formatPercentage(r.pnlPct)}
                  </td>
                  <td className={`px-3 sm:px-6 py-4 ${bodyTextClass}`}>{formatPercentage(r.weight)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(PositionsTable);
