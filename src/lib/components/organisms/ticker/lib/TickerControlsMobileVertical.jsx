import { Gradient } from "../gradient"
import { Button } from "$particles"
import styles from "../style.module.scss"

const TickerControlsMobileVertical = ({
  hideButtons,
  controlsRef,
  toggleExpandedState,
  buttonText,
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
      <div className={styles.button}>
        <Button
          type="regular"
          styles={{ buttonInner: styles.buttonInner }}
          onClick={toggleExpandedState}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export { TickerControlsMobileVertical }
