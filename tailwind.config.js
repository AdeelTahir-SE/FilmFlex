/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		keyframes: {
  			scroll: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			},
  			flicker: {
  				'0%': {
  					opacity: '0'
  				},
  				'10%': {
  					opacity: '1'
  				},
  				'20%': {
  					opacity: '0.6'
  				},
  				'30%': {
  					opacity: '1'
  				},
  				'40%': {
  					opacity: '0.3'
  				},
  				'50%': {
  					opacity: '1'
  				},
  				'70%': {
  					opacity: '0.7'
  				},
  				'90%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			glow: {
  				'0%': {
  					textShadow: '0 0 5px #FF0000, 0 0 10px #FF0000'
  				},
  				'50%': {
  					textShadow: '0 0 20px #FF0000, 0 0 30px #FF0000'
  				},
  				'100%': {
  					textShadow: '0 0 5px #FF0000, 0 0 10px #FF0000'
  				}
  			}
  		},
  		animation: {
  			animatescroll: 'scroll 15s linear infinite',
  			flicker: 'flicker 1.5s ease-in-out infinite alternate',
  			glow: 'glow 1.5s ease-in-out 1'
  		},
  		animationPlayState: {
  			paused: 'paused',
  			running: 'running'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.animate-paused': { 'animation-play-state': 'paused' },
          '.animate-running': { 'animation-play-state': 'running' },
        },
        {
        '.text-shadow-sm': {
          'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-md': {
          'text-shadow': '4px 4px 6px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-lg': {
          'text-shadow': '6px 6px 8px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-xl': {
          'text-shadow': '8px 8px 10px rgba(0, 0, 0, 0.5)',
        }}
        ['responsive', 'hover']
      )
    },
      require("tailwindcss-animate")
],
};
