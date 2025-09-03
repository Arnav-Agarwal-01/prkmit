// Navraas'25 Design System
export const navraasTheme = {
  colors: {
    primary: {
      orange: '#f97316', // orange-500
      pink: '#ec4899',   // pink-500
      purple: '#9333ea', // purple-600
    },
    gradients: {
      primary: 'from-orange-500 via-pink-500 to-purple-600',
      primaryHover: 'from-orange-600 via-pink-600 to-purple-700',
      text: 'from-orange-400 via-pink-400 to-purple-400',
      background: 'from-gray-900 via-purple-900 to-black',
      accent: 'from-orange-500/10 to-purple-600/10',
    },
    states: {
      success: {
        primary: '#10b981', // green-500
        light: '#34d399',   // green-400
      },
      error: {
        primary: '#ef4444', // red-500
        light: '#f87171',   // red-400
      },
      warning: {
        primary: '#f59e0b', // amber-500
        light: '#fbbf24',   // amber-400
      }
    }
  },
  
  typography: {
    fontFamilies: {
      primary: 'Sora', // For headings and important text
      secondary: 'Comic Relief', // For body text and casual content
    },
    sizes: {
      xs: 'text-xs',
      sm: 'text-sm', 
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '7xl': 'text-7xl'
    }
  },

  spacing: {
    container: 'container mx-auto px-6 py-12 max-w-4xl',
    section: 'py-12 sm:py-16 md:py-20',
    card: 'p-6 sm:p-8',
  },

  effects: {
    glassmorphism: 'bg-white/10 backdrop-blur-lg border border-white/20',
    shadow: 'shadow-2xl',
    hover: 'hover:scale-105 transition-all duration-300',
    glow: 'shadow-lg hover:shadow-xl',
  },

  animations: {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    },
    fadeInScale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5 }
    }
  }
};

// Helper functions for common patterns
export const getGradientClasses = (type = 'primary') => {
  return `bg-gradient-to-r ${navraasTheme.colors.gradients[type]}`;
};

export const getTextGradientClasses = (type = 'text') => {
  return `bg-gradient-to-r ${navraasTheme.colors.gradients[type]} bg-clip-text text-transparent`;
};

export const getGlassmorphismClasses = () => {
  return `${navraasTheme.effects.glassmorphism} rounded-2xl ${navraasTheme.effects.shadow}`;
};
