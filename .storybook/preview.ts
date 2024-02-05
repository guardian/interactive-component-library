import '../src/lib/tailwind/theme.css'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
}

export default preview
