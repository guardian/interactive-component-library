import { action } from "@storybook/addon-actions"
import { userEvent, within, expect } from "@storybook/test"
import { SearchInput } from "."

const suggestions = [
  { text: "Suggestion 1", value: 1 },
  { text: "Suggestion 2", value: 2 },
  { text: "Suggestion 3", value: 3 },
]

const meta = {
  title: "Molecules/SearchInput",
  component: SearchInput,
  args: {
    placeholder: "Search",
    onSelect: action("select"),
    onSubmit: action("submit"),
    onInputChange: (input) => {
      action("input change")()
      if (input === "") return
      return suggestions.filter((d) =>
        d.text.toLowerCase().includes(input.toLowerCase()),
      )
    },
    onClear: action("clear"),
  },
}

export default meta

export const Default = {}

export const ShowSuggestions = {
  args: {
    placeholder: "Search",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText("Search"), "Suggest")
    expect(canvas.getByLabelText("Suggestion 1")).toBeInTheDocument()
  },
}

export const SelectSuggestion = {
  args: {
    placeholder: "Search",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText("Search"), "Suggest")
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}")
  },
}

export const ClearSearchInput = {
  args: {
    placeholder: "Search",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText("Search"), "Suggest")
    await userEvent.clear(canvas.getByPlaceholderText("Search"))
    expect(
      canvas.queryByLabelText("Search suggestions"),
    ).not.toBeInTheDocument()
  },
}

export const SelectInputOnFocus = {
  args: {
    placeholder: "Search",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText("Search"), "Suggest")

    const searchInput = canvas.getByLabelText("Search input")
    searchInput.blur()
    searchInput.focus()

    expect(searchInput.selectionEnd).toEqual("Suggest".length)
  },
}
