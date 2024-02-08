export const objectValuesToControls = (obj, control = 'select') => ({
  control,
  options: Object.keys(obj),
})
