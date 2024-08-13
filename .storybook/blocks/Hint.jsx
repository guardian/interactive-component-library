import styles from "./hint.module.css"

export const Hint = ({ icon = "💡", text }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>{icon}</span>
      <p className={styles.paragraph}>{text}</p>
    </div>
  )
}
