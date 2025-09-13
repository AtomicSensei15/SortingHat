import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'magical': ['Cinzel', 'serif'],
        'story': ['Crimson Text', 'serif'],
        'serif': ['Crimson Text', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Magical colors
        'magical-dark': "hsl(var(--magical-dark))",
        'magical-medium': "hsl(var(--magical-medium))",
        'candlelight': "hsl(var(--candlelight))",
        'candlelight-glow': "hsl(var(--candlelight-glow))",
        'parchment': "hsl(var(--parchment))",
        'parchment-dark': "hsl(var(--parchment-dark))",
        
        // House colors
        gryffindor: {
          primary: "hsl(var(--gryffindor-primary))",
          secondary: "hsl(var(--gryffindor-secondary))",
        },
        ravenclaw: {
          primary: "hsl(var(--ravenclaw-primary))",
          secondary: "hsl(var(--ravenclaw-secondary))",
        },
        hufflepuff: {
          primary: "hsl(var(--hufflepuff-primary))",
          secondary: "hsl(var(--hufflepuff-secondary))",
        },
        slytherin: {
          primary: "hsl(var(--slytherin-primary))",
          secondary: "hsl(var(--slytherin-secondary))",
        },
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-magical': 'var(--gradient-magical)',
        'gradient-candlelight': 'var(--gradient-candlelight)',
        'gradient-parchment': 'var(--gradient-parchment)',
        'gradient-gryffindor': 'var(--gradient-gryffindor)',
        'gradient-ravenclaw': 'var(--gradient-ravenclaw)',
        'gradient-hufflepuff': 'var(--gradient-hufflepuff)',
        'gradient-slytherin': 'var(--gradient-slytherin)',
      },
      boxShadow: {
        'magical': 'var(--shadow-magical)',
        'glow': 'var(--shadow-glow)',
        'deep': 'var(--shadow-deep)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px hsl(var(--candlelight) / 0.4)' },
          '100%': { boxShadow: '0 0 40px hsl(var(--candlelight) / 0.8)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-magical': {
          '0%, 100%': { 
            transform: 'translateY(0) scale(1)',
            filter: 'brightness(1)'
          },
          '25%': { 
            transform: 'translateY(-10px) scale(1.05)',
            filter: 'brightness(1.2)'
          },
          '50%': { 
            transform: 'translateY(-20px) scale(1.1)',
            filter: 'brightness(1.3)'
          },
          '75%': { 
            transform: 'translateY(-10px) scale(1.05)',
            filter: 'brightness(1.2)'
          }
        },
        'pulse-magical': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'rotate-magical': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'levitate': {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)'
          },
          '33%': { 
            transform: 'translateY(-15px) rotate(2deg)'
          },
          '66%': { 
            transform: 'translateY(-30px) rotate(-1deg)'
          }
        },
        'magical-reveal': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5) rotate(-180deg)',
            filter: 'blur(10px)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.2) rotate(-90deg)',
            filter: 'blur(5px)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) rotate(0deg)',
            filter: 'blur(0px)'
          }
        },
        'text-sparkle': {
          '0%, 100%': {
            textShadow: `
              0 0 5px hsl(var(--candlelight)),
              0 0 10px hsl(var(--candlelight)),
              0 0 15px hsl(var(--candlelight))
            `
          },
          '50%': {
            textShadow: `
              0 0 10px hsl(var(--candlelight-glow)),
              0 0 20px hsl(var(--candlelight-glow)),
              0 0 30px hsl(var(--candlelight-glow)),
              0 0 40px hsl(var(--candlelight-glow))
            `
          }
        },
        'magical-border': {
          '0%': { borderColor: 'hsl(var(--candlelight) / 0.3)' },
          '50%': { borderColor: 'hsl(var(--candlelight-glow) / 0.8)' },
          '100%': { borderColor: 'hsl(var(--candlelight) / 0.3)' }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        'fade-in-up': "fade-in-up 0.8s ease-out",
        'magical-shimmer': "magical-shimmer 2s linear infinite",
        'bounce-magical': "bounce-magical 2s ease-in-out infinite",
        'pulse-magical': "pulse-magical 1.5s ease-in-out infinite",
        'rotate-magical': "rotate-magical 20s linear infinite",
        'levitate': "levitate 8s ease-in-out infinite",
        'magical-reveal': "magical-reveal 1.2s ease-out",
        'text-sparkle': "text-sparkle 2s ease-in-out infinite",
        'magical-border': "magical-border 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
