export function saveSVG(elementId) {
  const svg = document.getElementById(elementId).outerHTML
  const blob = new Blob([svg.toString()])
  const element = document.createElement('a')
  element.download = `${elementId}.svg`
  element.href = window.URL.createObjectURL(blob)
  element.click()
  element.remove()
}
