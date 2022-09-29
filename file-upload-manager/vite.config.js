import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: path.resolve('src/main.js'),
      name: 'fileUploadManager',
      formats: ['es'],
      fileName: () => 'fileUploadManager.js',
    },
  },
})
