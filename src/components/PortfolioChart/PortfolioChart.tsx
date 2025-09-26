
import { memo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { usePortfolioChart } from './usePortfolioChart';
import { useTheme } from '@/contexts/ThemeContext';

function PortfolioChart() {
    const { series, timeframe } = usePortfolioChart();
    const { theme } = useTheme();

    const chartClass = theme === 'light'
        ? 'bg-white border border-slate-200 shadow-sm'
        : 'bg-white/10 backdrop-blur-sm border border-white/20';

    const textClass = theme === 'light' ? 'text-slate-600' : 'text-purple-200';
    const gridColor = theme === 'light' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(255,255,255,0.1)';
    const axisColor = theme === 'light' ? 'rgba(148, 163, 184, 0.4)' : 'rgba(255,255,255,0.2)';
    const tickColor = theme === 'light' ? '#64748b' : '#e9d5ff';
    const tooltipBg = theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(147, 51, 234, 0.9)';
    const tooltipBorder = theme === 'light' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(255,255,255,0.2)';
    const tooltipText = theme === 'light' ? '#1e293b' : '#ffffff';
    const tooltipLabel = theme === 'light' ? '#64748b' : '#e9d5ff';

    if (!series.length) {
        return (
            <div className={`h-80 rounded-2xl ${chartClass} grid place-items-center ${textClass} transition-all duration-300`}>
                Cargando gráfico…
            </div>
        );
    }

    return (
        <div className={`h-80 rounded-2xl ${chartClass} p-4 transition-all duration-300`}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart key={timeframe} data={series}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis
                        dataKey="x"
                        tick={{ fill: tickColor, fontSize: 12 }}
                        axisLine={{ stroke: axisColor }}
                    />
                    <YAxis
                        tick={{ fill: tickColor, fontSize: 12 }}
                        axisLine={{ stroke: axisColor }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            background: tooltipBg,
                            border: `1px solid ${tooltipBorder}`,
                            color: tooltipText,
                            borderRadius: '12px',
                            backdropFilter: 'blur(10px)'
                        }}
                        labelStyle={{ color: tooltipLabel }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Valor']}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        dot={false}
                        strokeWidth={3}
                        stroke="#14b8a6"
                        strokeLinecap="round"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default memo(PortfolioChart);
