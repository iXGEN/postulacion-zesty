import { TimeframeSwitcher } from './components/TimeframeSwitcher';
import { PortfolioChart } from './components/PortfolioChart';
import { FiltersBar } from './components/FiltersBar';
import { PositionsTable } from './components/PositionsTable';
import { PortfolioDashboard } from './components/PortfolioDashboard';
import { ThemeToggle } from './components/ThemeToggle';
import { useStreamPricesQuery } from './services/pricesApi';
import { useTheme } from './contexts/ThemeContext';

export default function App() {
  const { data } = useStreamPricesQuery();
  const { theme } = useTheme();
  const isConnected = data?.connected ?? false;

  const backgroundClass = theme === 'light'
    ? 'bg-gradient-to-br from-slate-50 via-white to-purple-50'
    : 'bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800';

  const textClass = theme === 'light' ? 'text-slate-800' : 'text-white';
  const subtitleClass = theme === 'light' ? 'text-slate-600' : 'text-purple-200';

  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-300`}>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${theme === 'light'
        ? 'bg-white/90 border-slate-200 shadow-sm'
        : 'bg-purple-900/90 border-white/20 shadow-lg'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <h1 className={`text-xl sm:text-2xl font-bold ${textClass}`}>ZESTY Portfolio</h1>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-teal-400' : 'bg-red-400'}`} />
                <span className={`text-xs ${subtitleClass}`}>
                  {isConnected ? 'En vivo' : 'Desconectado'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 sm:pt-24 lg:pt-24 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

          {/* Portfolio Dashboard Cards */}
          <PortfolioDashboard />

          {/* Portfolio Chart */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className={`text-xl font-semibold ${textClass}`}>Valor del portafolio</h2>
            <TimeframeSwitcher />
          </div>
          <PortfolioChart />

          {/* Filters and Positions Table */}
          <FiltersBar />
          <PositionsTable />
        </div>
      </div>
    </div>
  );
}
