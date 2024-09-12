import { Gradient } from "../gradient"
import { ArrowButton } from "$particles"
import styles from "../style.module.scss"

const TickerControlsDesktop = ({
  hideButtons,
  controlsRef,
  setPageIndex,
  pageIndex,
  numberOfPages,
}) => {
  return (
    <div
      ref={controlsRef}
      className={styles.controls}
      style={hideButtons && { display: "none" }}
    >
      <div className={styles.gradient}>
        <Gradient />
      </div>
      <div className={styles.buttons}>
        <ArrowButton
          onClick={() => setPageIndex((d) => d + 1)}
          disabled={pageIndex >= numberOfPages - 1}
        />
        <ArrowButton
          direction="left"
          onClick={() => setPageIndex((d) => d - 1)}
          disabled={pageIndex <= 0}
        />
      </div>
    </div>
  )
}

export { TickerControlsDesktop }
