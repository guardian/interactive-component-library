/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      mobile: '320px',
      'mobile-xl': '480px',
      tablet: '740px',
      desktop: '980px',
      leftCol: '1140px',
      wide: '1300px',
    },
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
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      neutral: {
        7: '#121212',
        10: '#1A1A1A',
        20: '#333333',
        38: '#606060',
        46: '#707070',
        60: '#999999',
        86: '#DCDCDC',
        93: '#EDEDED',
        97: '#F6F6F6',
        100: '#FFFFFF',
      },
      party: {
        // Conservative
        con: '#0077B6',
        // Labour
        lab: '#C70000',
        // Liberal Democrats
        ld: '#E05E00',
        // UKIP
        ukip: '#BB3B80',
        // Independent
        ind: '#333333',
        // SNP
        snp: '#F5DC00',
        // SDLP
        sdlp: '#23B4A9',
        // Plaid Cymru
        pc: '#135E58',
        // Sinn Féin
        sf: '#22874D',
        // DUP
        dup: '#8B0000',
        // Green Party
        green: '#39A566',
        // Alliance
        alliance: '#C9BB19',
        // UUP
        uup: '#004975',
        // Reform UK
        reform: '#3DBBE2',
        // Other
        other: '#848484',
      },
      elex: {
        nocontrol: '#C8C8C8',
        undeclared: '#E7E7E7',
      },
    },
  },
  plugins: [],
}
