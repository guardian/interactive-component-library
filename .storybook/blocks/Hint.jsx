import { compiler } from "markdown-to-jsx"
import styles from "./hint.module.css"

export const Hint = ({ icon = "💡", text }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>{icon}</span>
      <p className={styles.paragraph}>{compiler(text)}</p>
    </div>
  )
}
