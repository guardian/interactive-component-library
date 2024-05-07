import { useState } from "preact/hooks"
import { Chevron } from "$particles"
import styles from "./style.module.css"

export function Dropdown({ icon, title}) {
  const [expanded, setExpanded] = useState(false)
  return (
    <button className={styles.button} onClick={() => setExpanded(current => !current)}>
      <img src={icon} className={styles.icon} />
      <span className={styles.title}>{title}</span>
      <Chevron active={true} size="large" direction={expanded ? 'up' : 'down'} />
    </button>
  )
}