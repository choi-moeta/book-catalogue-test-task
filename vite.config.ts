import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    Vue(),
    Components({
      resolvers: [
        IconsResolver({
          componentPrefix: 'icon',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
    AutoImport({
      imports: [
        'vue',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    WindiCSS(),
  ],
})
