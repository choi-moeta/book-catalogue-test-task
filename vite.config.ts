import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

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
  ],
})
