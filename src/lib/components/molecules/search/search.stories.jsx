import { action } from '@storybook/addon-actions'
import { userEvent, within } from '@storybook/test'
import { Search } from '.'

const suggestions = [
  { text: 'Suggestion 1', value: 1 },
  { text: 'Suggestion 2', value: 2 },
  { text: 'Suggestion 3', value: 3 },
]

const meta = {
  title: 'Molecules/Search',
  component: Search,
  args: {
    placeholder: 'Search',
    onSelect: action('select'),
    onSubmit: action('submit'),
    onInputChange: (e) => {
      action('input change')()
      return suggestions.filter((d) => d.text.toLowerCase().includes(e.target.value.toLowerCase()))
    },
  },
}

export default meta

export const Default = {}

export const WithSuggestions = {
  args: {
    placeholder: 'Search',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByPlaceholderText('Search'), 'Suggest')
  },
}
