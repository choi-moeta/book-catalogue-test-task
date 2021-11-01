import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'media',
  preflight: {
    safelist: 'button h1 h2 h3 h4 h5 h6',
  },
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
      },
    },
  },
})
