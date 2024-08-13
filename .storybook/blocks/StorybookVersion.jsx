export const StorybookVersion = () => {
  const versionText = import.meta.env.STORYBOOK_VERSION ?? "Development build"

  const prUrl = import.meta.env.STORYBOOK_PR_URL
  let prNumber

  if (prUrl) {
    prNumber = prUrl.split("/").pop()
  }

  if (prUrl && prNumber) {
    return (
      <pre style="font-size: 1.125rem">
        {versionText}
        <a href={prUrl}>(#{prNumber})</a>
      </pre>
    )
  } else {
    return <pre>{versionText}</pre>
  }
}
