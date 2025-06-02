
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-10px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-in-left': {
					'0%': {
						transform: 'translateX(-20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-in-futuristic': {
					'0%': {
						transform: 'translateX(-100px) rotateY(-15deg)',
						opacity: '0',
						filter: 'blur(4px)'
					},
					'50%': {
						transform: 'translateX(-20px) rotateY(-5deg)',
						opacity: '0.7',
						filter: 'blur(2px)'
					},
					'100%': {
						transform: 'translateX(0) rotateY(0deg)',
						opacity: '1',
						filter: 'blur(0px)'
					}
				},
				'hologram-pulse': {
					'0%': {
						textShadow: '0 0 5px currentColor, 0 0 10px currentColor'
					},
					'50%': {
						textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor'
					},
					'100%': {
						textShadow: '0 0 5px currentColor, 0 0 10px currentColor'
					}
				},
				'subtle-glow-rank': {
					'0%': {
						textShadow: '0 0 3px currentColor'
					},
					'50%': {
						textShadow: '0 0 8px currentColor, 0 0 12px currentColor'
					},
					'100%': {
						textShadow: '0 0 3px currentColor'
					}
				},
				'subtle-glow-xp': {
					'0%': {
						boxShadow: '0 0 3px rgba(6, 182, 212, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 8px rgba(6, 182, 212, 0.5), 0 0 12px rgba(6, 182, 212, 0.3)'
					},
					'100%': {
						boxShadow: '0 0 3px rgba(6, 182, 212, 0.3)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.4s ease-out',
				'slide-in-futuristic': 'slide-in-futuristic 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'hologram-pulse': 'hologram-pulse 2s ease-in-out infinite',
				'subtle-glow-rank': 'subtle-glow-rank 3s ease-in-out infinite',
				'subtle-glow-xp': 'subtle-glow-xp 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
