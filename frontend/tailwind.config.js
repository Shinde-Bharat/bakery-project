/** @type {import('tailwindcss').Config} */
const { nextui, colors, button } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Cormorant: ['Cormorant Garamond', 'sans-serif'],
        Montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        bprimaryDark: '#421F0C',
        bprimary: '#753F21',
        bsecondary: '#A35A32',
        bternary: '#FFF3EA',
        background: 'hsl(var(--background))',
        // foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  darkMode: ["class", "class"],
  plugins: [nextui({
    themes: {
      light: {
        colors: {

          primary: {
            "700": '#421F0C',
            foreground: "#ffffff",
            DEFAULT: '#753F21',

          },
          secondary: {
            foreground: '#421F0C',
            DEFAULT: '#A35A32',
          },
          ternary: '#FFF3EA',
          bblue: {
            DEFAULT: '#006FEE',
            foreground: '#fff'
          }
        },

      },

    }
  }),
  require("tailwindcss-animate")
  ]
}

