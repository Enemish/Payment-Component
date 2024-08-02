import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy'; // Изменен импорт

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        { src: 'src/assets/images/icons/*', dest: 'assets/images/icons' }
      ]
    })
  ],
  define: {
    'process.env': {} 
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        assetFileNames: 'assets/images/icons/[name].[hash].[ext]',
      },
    },
  },
});