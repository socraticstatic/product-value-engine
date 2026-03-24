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
        sans: ['ATT Aleck Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        /* SDCI Figma type scale */
        'figma-xs': ['0.625rem', { lineHeight: '1' }],       /* 10px */
        'figma-sm': ['0.75rem', { lineHeight: '1.33' }],     /* 12px */
        'figma-base': ['0.875rem', { lineHeight: '1.43' }],  /* 14px */
        'figma-lg': ['1rem', { lineHeight: '1.5' }],         /* 16px */
        'figma-xl': ['1.5rem', { lineHeight: '1.33' }],      /* 24px */
        'figma-2xl': ['2rem', { lineHeight: '1.25' }],       /* 32px */
        'figma-3xl': ['2.5rem', { lineHeight: '1.2' }],      /* 40px */
        'figma-4xl': ['3rem', { lineHeight: '1.17' }],       /* 48px */
        'figma-5xl': ['3.5rem', { lineHeight: '1.14' }],     /* 56px */
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        mint: {
          DEFAULT: "hsl(var(--mint))",
          foreground: "hsl(var(--mint-foreground))",
        },
        cobalt: {
          DEFAULT: "hsl(var(--cobalt))",
          foreground: "hsl(var(--cobalt-foreground))",
        },
        lime: {
          DEFAULT: "hsl(var(--lime))",
          foreground: "hsl(var(--lime-foreground))",
        },
        "att-blue": {
          DEFAULT: "hsl(var(--att-blue))",
          foreground: "hsl(var(--att-blue-foreground))",
        },
        "light-blue": {
          DEFAULT: "hsl(var(--light-blue))",
          foreground: "hsl(var(--light-blue-foreground))",
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
      borderRadius: {
        /* SDCI border-radius scale */
        '3xl': '1.5rem',   /* 24px — modals, role cards */
        '2xl': '1rem',     /* 16px — cards, containers */
        'xl': '0.75rem',   /* 12px */
        'lg': '0.5rem',    /* 8px — inputs, dropdowns */
        'md': '0.375rem',  /* 6px — segmented controls */
        'sm': '0.25rem',   /* 4px */
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
