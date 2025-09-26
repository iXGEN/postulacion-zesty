# Mini Zesty - Portafolio en Tiempo Real

Una aplicación web que muestra el portafolio de inversión de un usuario con posiciones, valor del portafolio y precios en tiempo casi real.

## 🚀 Características

### ✅ Funcionalidades Implementadas

1. **Dashboard de Portafolio**
   - Cards con valor total, P&L (absoluto y %), cambio intradía
   - Indicador de conexión en tiempo real
   - Estados de carga y error

2. **Tabla de Posiciones**
   - Muestra ticker, cantidad, precio promedio, precio actual, P&L, % del portafolio
   - Filtrado por ticker y rango de P&L
   - Ordenamiento por P&L %, peso en portafolio o precio

3. **Gráfico del Portafolio**
   - Visualización del valor del portafolio con Recharts
   - Selección de temporalidad: Hoy, 1 semana, 1 mes, 2 meses
   - Datos históricos y en tiempo real

4. **Precios en Tiempo Real**
   - Conexión WebSocket al servidor mock
   - Actualizaciones de precios en vivo
   - Histórico diario de 2 meses para cada ticker

5. **Filtros y Búsqueda**
   - Búsqueda por ticker con debounce
   - Filtro por rango de P&L %
   - Ordenamiento dinámico

## 🛠️ Tecnologías Utilizadas

- **React 19** con TypeScript
- **Redux Toolkit** para manejo de estado
- **RTK Query** para WebSocket y datos en tiempo real
- **Tailwind CSS** para estilos
- **Recharts** para gráficos
- **Vite** como bundler

## 📦 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/iXGEN/postulacion-zesty.git
   cd zesty-web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # El archivo .env ya está configurado con:
   VITE_WS_URL=ws://localhost:8081
   ```

4. **Iniciar el entorno completo (recomendado)**
   ```bash
   npm run dev:full
   ```

   **O alternativamente, en terminales separadas:**
   ```bash
   # Terminal 1: WebSocket mock
   npm run dev:ws
   
   # Terminal 2: Aplicación
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   └── store.ts                 # Configuración Redux
├── components/
│   ├── FiltersBar/              # Barra de filtros
│   ├── PortfolioChart/          # Gráfico del portafolio
│   ├── PortfolioDashboard/      # Dashboard principal
│   ├── PositionsTable/          # Tabla de posiciones
│   └── TimeframeSwitcher/       # Selector de temporalidad
├── features/
│   ├── filters/                 # Slice de filtros
│   └── portfolio/               # Slice del portafolio
├── hooks/
│   └── useDebouncedValue.ts     # Hook para debounce
├── services/
│   └── pricesApi.ts             # API WebSocket
└── utils/
    └── format.ts                # Utilidades de formato
```

## 🎯 Decisiones Técnicas

### 1. **Redux Toolkit + RTK Query**
- **Razón**: Manejo eficiente del estado global y WebSocket
- **Beneficio**: Caché automático, revalidación, y manejo de errores

### 2. **WebSocket con Reconexión Automática**
- **Razón**: Garantizar conexión estable para datos en tiempo real
- **Implementación**: Reintentos exponenciales con backoff

### 3. **Debounce en Filtros**
- **Razón**: Optimizar performance evitando búsquedas excesivas
- **Implementación**: 250ms para búsqueda, 300ms para rangos

### 4. **Memoización de Componentes**
- **Razón**: Prevenir re-renders innecesarios
- **Implementación**: React.memo en componentes pesados

### 5. **Responsive Design**
- **Razón**: Experiencia óptima en todos los dispositivos
- **Implementación**: Tailwind CSS con breakpoints

## 🔧 Límites Conocidos

1. **Datos Mock**: Las posiciones están hardcodeadas (requisito del desafío)
2. **WebSocket**: Solo funciona con el servidor mock local
3. **Persistencia**: No hay persistencia de datos entre sesiones
4. **Autenticación**: No implementada (no requerida)

## ⏱️ Tiempo Invertido

- **Desarrollo**: ~4 horas
- **Testing y Debugging**: ~1 hora
- **Documentación**: ~30 minutos
- **Total**: ~5.5 horas

## 🤖 Uso de IA

### Generado por IA:
- Estructura inicial del proyecto
- Configuración de Redux Toolkit
- Implementación de WebSocket con RTK Query
- Componentes base con Tailwind CSS
- Lógica de cálculos del portafolio

### Optimizado Manualmente:
- Performance con memoización
- Manejo de errores y estados de carga
- Responsive design mejorado
- UX/UI refinado
- Documentación completa

## 🚀 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run dev:full     # Entorno completo (WebSocket + App)
npm run dev:ws       # Solo servidor WebSocket mock
```

## 📱 Demo

La aplicación incluye:
- Dashboard con métricas en tiempo real
- Gráfico interactivo del portafolio
- Tabla de posiciones con filtros
- Indicadores de conexión
- Diseño responsive
---

**Desarrollado por Ignacio Barra Zagal.**