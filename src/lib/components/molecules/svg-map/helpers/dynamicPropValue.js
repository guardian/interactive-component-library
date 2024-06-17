export function dynamicPropValue(prop, d, index) {
  if (typeof prop === "function") {
    return prop(d, index)
  }
  return prop
}
