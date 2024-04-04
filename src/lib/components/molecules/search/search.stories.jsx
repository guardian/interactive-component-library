import { action } from '@storybook/addon-actions'
import { userEvent, within, expect, waitForElementToBeRemoved } from '@storybook/test'
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
      if (e.target.value === '') return
      return suggestions.filter((d) => d.text.toLowerCase().includes(e.target.value.toLowerCase()))
    },
  },
}

export default meta

export const Default = {}

export const ShowSuggestions = {
  args: {
    placeholder: 'Search',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText('Search'), 'Suggest')
    expect(canvas.getByLabelText('Suggestion 1')).toBeInTheDocument()
  },
}

export const SelectSuggestion = {
  args: {
    placeholder: 'Search',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText('Search'), 'Suggest')
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}')
  },
}

export const ClearSearchInput = {
  args: {
    placeholder: 'Search',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText('Search'), 'Suggest')
    await userEvent.clear(canvas.getByPlaceholderText('Search'))
    expect(canvas.queryByLabelText('Search suggestions')).not.toBeInTheDocument()
  },
}

export const SelectInputOnFocus = {
  args: {
    placeholder: 'Search',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText('Search'), 'Suggest')

    const searchInput = canvas.getByLabelText('Search input')
    searchInput.blur()
    searchInput.focus()

    expect(searchInput.selectionEnd).toEqual('Suggest'.length)
  },
}
