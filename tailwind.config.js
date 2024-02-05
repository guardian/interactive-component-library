/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    spacing: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '40px',
    },
    fontFamily: {
      sans: [
        'GuardianTextSans',
        'Guardian Text Sans Web',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'Lucida Grande',
        'sans-serif',
      ],
      serif: ['GuardianTextEgyptian', 'Guardian Text Egyptian Web', 'Georgia', 'serif'],
      headline: ['GH Guardian Headline', 'Guardian Egyptian Web', 'Georgia', 'serif'],
      titlepiece: [
        'Guardian Titlepiece',
        'Guardian Headline Full',
        'Guardian Headline',
        'Guardian Egyptian Web',
        'Georgia',
        'serif',
      ],
    },
    fontSize: {
      // 12pz
      '2xs': ['0.75rem', { lineHeight: '0.975rem' }],
      // 14px
      xs: ['0.875rem', { lineHeight: '1.18125rem' }],
      // 15px
      sm: ['0.9375rem', { lineHeight: '1.3125rem' }],
      // 16px
      base: ['1rem', { lineHeight: '1.4rem' }],
      // 17px
      body: ['1.0625rem', { lineHeight: '1.4875rem' }],
      // 20px (H2)
      lg: ['1.25rem', { lineHeight: '1.4375rem' }],
      // FIXME
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      // 34px (H1)
      '2xl': ['2.125rem', { lineHeight: '2.44375rem' }],
    },
    extend: {},
  },
  plugins: [],
}
