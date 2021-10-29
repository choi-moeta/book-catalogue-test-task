import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'media',
  preflight: {
    safelist: 'button',
  },
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
      },
    },
  },
})
