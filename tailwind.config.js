module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.md'],
  theme: {
    extend: {
      colors: {
        primary: '#000d21',
        'on-primary': '#ffffff',
        'primary-container': '#002347',
        'on-primary-container': '#718bb5',
        'primary-fixed': '#d4e3ff',
        'primary-fixed-dim': '#adc8f5',
        secondary: '#775a19',
        'on-secondary': '#ffffff',
        'secondary-container': '#fed488',
        'on-secondary-container': '#785a1a',
        'secondary-fixed': '#ffdea5',
        'secondary-fixed-dim': '#e9c176',
        tertiary: '#0a0d0e',
        'tertiary-container': '#202324',
        background: '#fcf9f8',
        'on-background': '#1c1b1b',
        surface: '#fcf9f8',
        'on-surface': '#1c1b1b',
        'on-surface-variant': '#43474e',
        'surface-container': '#f0eded',
        'surface-container-low': '#f6f3f2',
        'surface-container-high': '#eae7e7',
        'surface-container-highest': '#e5e2e1',
        'surface-bright': '#fcf9f8',
        'surface-container-lowest': '#ffffff',
        outline: '#74777f',
        'outline-variant': '#c4c6cf'
      },
      spacing: {
        gutter: '24px',
        'margin-mobile': '20px',
        'margin-desktop': '64px',
        'container-max': '1280px',
        'bento-gap': '16px'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        'label-caps': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'headline-sm': ['"Playfair Display"', 'serif'],
        'headline-md': ['"Playfair Display"', 'serif'],
        'display-lg': ['"Playfair Display"', 'serif'],
        button: ['Inter', 'sans-serif']
      },
      fontSize: {
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'display-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg-mobile': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        button: ['14px', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '500' }]
      },
      maxWidth: {
        'container-max': '1280px'
      },
      boxShadow: {
        bento: '0 0 30px rgba(0, 0, 0, 0.04)',
        nav: '0 8px 32px rgba(0, 0, 0, 0.04)'
      }
    }
  },
  plugins: []
};
