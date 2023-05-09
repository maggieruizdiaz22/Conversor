const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configura el proxy para redirigir las solicitudes a la API
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:3001/api/v4/timeseries',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
);

// Inicia el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor proxy iniciado en el puerto 3001');
});
