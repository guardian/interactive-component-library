export function scaleLinear(domain, range) {
  const [domainMin, domainMax] = domain
  const [rangeMin, rangeMax] = range

  const slope = (rangeMax - rangeMin) / (domainMax - domainMin)
  const intercept = rangeMin - slope * domainMin

  return function (x) {
    return slope * x + intercept
  }
}
