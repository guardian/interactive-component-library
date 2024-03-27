import styles from './hint.module.css'

/**
 * A block that displays the story name or title from the of prop
 * - if a story reference is passed, it renders the story name
 * - if a meta reference is passed, it renders the stories' title
 * - if nothing is passed, it defaults to the primary story
 */
export const Hint = ({ icon = '💡', text }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>{icon}</span>
      <p className={styles.paragraph}>{text}</p>
    </div>
  )
}
