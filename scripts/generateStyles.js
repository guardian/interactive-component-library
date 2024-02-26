import theme from '../src/lib/styles/theme.config.js'
import fs from 'fs'

// RESETS
fs.writeFileSync('src/lib/styles/generated/reset.css', theme.resets)

// SPACING
let spacingCSS = ':root {'
for (const [key, value] of Object.entries(theme.space)) {
  spacingCSS = spacingCSS.concat('\n', `--space-${key}: ${value}px;`)
}
spacingCSS = spacingCSS.concat('\n', '}')

fs.writeFileSync('src/lib/styles/generated/spacing.css', spacingCSS)

// FONT FAMILIES
let fontFamilyCSS = ':root {'
for (const [key, values] of Object.entries(theme.fontFamily)) {
  fontFamilyCSS = fontFamilyCSS.concat('\n', `--text-${key}: ${values.map((d) => `"${d}"`).join(', ')};`)
}
fontFamilyCSS = fontFamilyCSS.concat('\n', '}')

fs.writeFileSync('src/lib/styles/generated/font-families.css', fontFamilyCSS)

// FONT SIZES
let fontSizeCSS = ':root {'
for (const [font, sizes] of Object.entries(theme.textSizes)) {
  for (const [key, size] of Object.entries(sizes)) {
    fontSizeCSS = fontSizeCSS.concat('\n', `--${font}-${key}: ${size}px;`)
  }
  fontSizeCSS = fontSizeCSS.concat('\n')
}

for (const [key, height] of Object.entries(theme.lineHeights)) {
  fontSizeCSS = fontSizeCSS.concat('\n', `--line-height-${key}: ${height}px;`)
}

fontSizeCSS = fontSizeCSS.concat('\n')

for (const [font, lineHeight] of Object.entries(theme.defaultLineHeights)) {
  fontSizeCSS = fontSizeCSS.concat('\n', `--${font}-line-height: ${theme.lineHeights[lineHeight]};`)
}

fontSizeCSS = fontSizeCSS.concat('\n', '}')

fs.writeFileSync('src/lib/styles/generated/font-sizes.css', fontSizeCSS)

// BREAKPOINTS
let breakpointsCSS = '$mq-breakpoints: ('
for (const [key, value] of Object.entries(theme.breakpoints)) {
  breakpointsCSS = breakpointsCSS.concat('\n', `  ${key}: ${value}px,`)
}
breakpointsCSS = breakpointsCSS.concat('\n', ');')

const mqSass = `
// Breakpoints generated from definitions in @guardian/source-foundations
// See: https://guardian.github.io/csnx/?path=/docs/source-foundations_media-queries--docs
${breakpointsCSS}

// To enable support for browsers that do not support @media queries,
// (IE <= 8, Firefox <= 3, Opera <= 9) set $mq-responsive to false
// Create a separate stylesheet served exclusively to these browsers,
// meaning @media queries will be rasterized, relying on the cascade itself
$mq-responsive: true;

// Define the breakpoint from the $mq-breakpoints list that should
// be used as the target width when outputting a static stylesheet
// (i.e. when $mq-responsive is set to 'false').
$mq-static-breakpoint: desktop;

// If you want to display the currently active breakpoint in the top
// right corner of your site during development, add the breakpoints
// to this list, ordered by width, e.g. (mobile, tablet, desktop).
// $mq-show-breakpoints: (mobile, mobileLandscape, tablet, desktop, leftCol, wide);

@import 'node_modules/sass-mq/mq';
`

fs.writeFileSync('src/lib/styles/generated/mq.scss', mqSass)
