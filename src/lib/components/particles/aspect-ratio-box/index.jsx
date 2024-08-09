import style from "./style.module.css"

export function AspectRatioBox({ heightAsProportionOfWidth, children }) {
  return (
    <div
      className={style["aspect-ratio-box"]}
      style={{ "--aspect-ratio": heightAsProportionOfWidth }}
    >
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  )
}
