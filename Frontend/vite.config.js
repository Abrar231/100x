import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();

// console.log(`API_URL: ${apiUrl}`);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: apiUrl,
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //       // To handle multipart/form-data requests
  //       transform: (req, res) => {
  //         // Check if the request contains multipart/form-data
  //         if (req.headers['content-type']?.startsWith('multipart/form-data')) {
  //           // Pass through the request body without modifying it
  //           return
  //         }
  //       },
  //     },
  //     // '/uploads': {
  //     //   target: apiUrl,
  //     //   changeOrigin: true,
  //     // },
  //   },
  // },
})
