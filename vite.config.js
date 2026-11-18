import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'jfif-mime',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.includes('.jfif')) {
            res.setHeader('Content-Type', 'image/jpeg');
          }
          next();
        });
      },
    },
  ],
})
