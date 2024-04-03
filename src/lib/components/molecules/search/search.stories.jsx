import { action } from '@storybook/addon-actions'
import { Search } from '.'

const meta = {
  title: 'Molecules/Search',
  component: Search,
  args: {
    onSelect: action('select'),
    onSubmit: action('submit'),
  },
}

export default meta

export const Default = {
  args: {
    placeholder: 'Search',
  },
}

export const WithSuggestions = {
  args: {
    placeholder: 'Search',
    inputValue: 'Sugg',
    suggestions: [
      { text: 'Suggestion 1', value: 1 },
      { text: 'Suggestion 2', value: 2 },
      { text: 'Suggestion 3', value: 3 },
    ],
  },
}
