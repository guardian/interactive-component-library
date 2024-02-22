import * as source from '@guardian/source-foundations'

console.log('src', source)

//  breakpoints: {
//       mobile: 320,
//       mobileMedium: 375,
//       mobileLandscape: 480,
//       phablet: 660,
//       tablet: 740,
//       desktop: 980,
//       leftCol: 1140,
//       wide: 1300
//     },

export default {
  screens: {
    mobile: '320px',
    'mobile-xl': '480px',
    tablet: '740px',
    desktop: '980px',
    leftCol: '1140px',
    wide: '1300px',
  },
  space: source.space,
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
  textSizes: {
    headline: source.headlineSizes,
    sans: source.textSansSizes,
    titlepiece: source.titlepieceSizes,
    body: source.bodySizes,
  },
  lineHeights: { tight: 1.15, regular: 1.3, loose: 1.4 },
  defaultLineHeights: {
    headline: 'tight',
    sans: 'regular',
    titlepiece: 'tight',
    body: 'loose',
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
}
