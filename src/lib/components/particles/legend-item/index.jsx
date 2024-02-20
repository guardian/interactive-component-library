import defaultStyles from './legenditem.module.css'

export const LegendItem = ({ text, styles }) => {
  const merged = Object.keys(defaultStyles).reduce((result, key) => {
    let className = defaultStyles[key]
    if (styles && key in styles) {
      className = className.concat(' ', styles[key])
    }
    result[key] = className
    return result
  }, {})

  return (
    <div className={merged.container}>
      <span className={merged.circle} />
      <p className={merged.text}>{text}</p>
    </div>
  )
}
