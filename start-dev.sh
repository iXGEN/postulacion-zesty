#!/bin/bash

# Script para iniciar el entorno de desarrollo completo

echo "🚀 Iniciando Mini Zesty - Portafolio en Tiempo Real"
echo "=================================================="

# Cambiar al directorio del script
cd "$(dirname "$0")"

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar si el archivo ws-mock.js existe
if [ ! -f "ws-mock.js" ]; then
    echo "❌ Archivo ws-mock.js no encontrado"
    exit 1
fi

echo "🔌 Iniciando servidor WebSocket mock..."
node ws-mock.js &
WS_PID=$!

# Esperar un momento para que el WebSocket se inicie
sleep 2

echo "🌐 Iniciando servidor de desarrollo..."
echo "📱 La aplicación estará disponible en: http://localhost:5173"
echo "🔗 WebSocket mock corriendo en: ws://localhost:8081"
echo ""
echo "Presiona Ctrl+C para detener ambos servidores"

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servidores..."
    kill $WS_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Iniciar el servidor de desarrollo
npm run dev

# Limpiar al salir
cleanup
