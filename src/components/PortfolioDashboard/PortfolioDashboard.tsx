
import { useTheme } from '@/contexts/ThemeContext';
import { usePortfolioDashboard } from './usePortfolioDashboard';

export default function PortfolioDashboard() {
    const { metrics, isLoading, isConnected, isError, error, reconnectAttempts } = usePortfolioDashboard();
    const { theme } = useTheme();

    const cardClass = theme === 'light'
        ? 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
        : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15';

    const textClass = theme === 'light' ? 'text-slate-600' : 'text-purple-200';
    const titleClass = theme === 'light' ? 'text-slate-800' : 'text-white';
    const subtitleClass = theme === 'light' ? 'text-slate-500' : 'text-purple-300';

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className={`${cardClass} rounded-2xl p-6 animate-pulse transition-all duration-300`}>
                        <div className={`h-4 ${theme === 'light' ? 'bg-slate-200' : 'bg-white/20'} rounded mb-2`}></div>
                        <div className={`h-8 ${theme === 'light' ? 'bg-slate-200' : 'bg-white/20'} rounded mb-1`}></div>
                        <div className={`h-3 ${theme === 'light' ? 'bg-slate-200' : 'bg-white/20'} rounded w-2/3`}></div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div>
                        <h3 className="text-red-300 font-medium">Error de conexión</h3>
                        <p className="text-red-200 text-sm mt-1">
                            {error || 'No se pudo conectar al servidor de precios'}
                            {reconnectAttempts > 0 && ` (Reintento ${reconnectAttempts})`}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Value */}
            <div className={`${cardClass} rounded-2xl p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-sm font-medium ${textClass}`}>Valor Total</h3>
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-teal-400' : 'bg-red-400'}`}
                        title={isConnected ? 'Conectado' : 'Desconectado'} />
                </div>
                <div className={`text-2xl font-bold ${titleClass} mb-1`}>
                    ${metrics.totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className={`text-xs ${subtitleClass}`}>
                    {metrics.totalCost > 0 && (
                        <>Costo: ${metrics.totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</>
                    )}
                </div>
            </div>

            {/* P&L Absolute */}
            <div className={`${cardClass} rounded-2xl p-6 transition-all duration-300`}>
                <h3 className={`text-sm font-medium ${textClass} mb-2`}>P&L Total</h3>
                <div className={`text-2xl font-bold mb-1 ${metrics.totalPnLAbs >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                    {metrics.totalPnLAbs >= 0 ? '+' : ''}${metrics.totalPnLAbs.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
                <div className={`text-xs ${metrics.totalPnLPct >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                    {metrics.totalPnLPct >= 0 ? '+' : ''}{metrics.totalPnLPct.toFixed(2)}%
                </div>
            </div>

            {/* Intraday Change */}
            <div className={`${cardClass} rounded-2xl p-6 transition-all duration-300`}>
                <h3 className={`text-sm font-medium ${textClass} mb-2`}>Cambio Intradía</h3>
                <div className={`text-2xl font-bold mb-1 ${metrics.intradayChange >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                    {metrics.intradayChange >= 0 ? '+' : ''}${metrics.intradayChange.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
                <div className={`text-xs ${metrics.intradayChangePct >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                    {metrics.intradayChangePct >= 0 ? '+' : ''}{metrics.intradayChangePct.toFixed(2)}%
                </div>
            </div>

            {/* Portfolio Performance */}
            <div className={`${cardClass} rounded-2xl p-6 transition-all duration-300`}>
                <h3 className={`text-sm font-medium ${textClass} mb-2`}>Rendimiento</h3>
                <div className={`text-2xl font-bold mb-1 ${metrics.totalPnLPct >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                    {metrics.totalPnLPct >= 0 ? '+' : ''}{metrics.totalPnLPct.toFixed(2)}%
                </div>
                <div className={`text-xs ${subtitleClass}`}>
                    {metrics.totalCost > 0 && (
                        <>ROI: {((metrics.totalValue / metrics.totalCost - 1) * 100).toFixed(2)}%</>
                    )}
                </div>
            </div>
        </div>
    );
}
