import theme from '../src/lib/styles/theme.config.js'
import fs from 'fs'

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
  fontFamilyCSS = fontFamilyCSS.concat('\n', `--text-${key}: ${values.map((d) => `"${d}"`).join(' ')};`)
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
  fontSizeCSS = fontSizeCSS.concat('\n', `--${font}-line-height: ${theme.lineHeights[lineHeight]}px;`)
}

fontSizeCSS = fontSizeCSS.concat('\n', '}')

fs.writeFileSync('src/lib/styles/generated/font-sizes.css', fontSizeCSS)
