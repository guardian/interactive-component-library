const getOffsetDistance = (
  pageIndex,
  numberOfPages,
  scrollElWidth,
  pageWidthModifier,
) => {
  // distance that each push of the button should take the user
  const onlyOnePush = numberOfPages > 1 && numberOfPages <= 2

  const defaultPushDistance = onlyOnePush
    ? (scrollElWidth / numberOfPages) * pageWidthModifier
    : scrollElWidth / Math.floor(numberOfPages)

  const finalPushDistance = defaultPushDistance * (numberOfPages % 1)

  if (pageIndex === 0) {
    // is first page
    return 0
  } else if (pageIndex === 1 && onlyOnePush) {
    // is second page and second page isn't full
    return -finalPushDistance
  } else if (pageIndex === Math.floor(numberOfPages) - 1) {
    // is final page and final page isn't full
    return -pageIndex * defaultPushDistance + finalPushDistance
  } else if (pageIndex < Math.floor(numberOfPages)) {
    // the default - move the width of a full page
    return -pageIndex * defaultPushDistance
  }
}

export { getOffsetDistance }
