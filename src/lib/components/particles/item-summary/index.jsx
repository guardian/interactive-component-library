export const ItemSummary = ({ itemDeets }) => {
  console.log(itemDeets)
  return (
    <div className="">
      <p className="">{itemDeets.name}</p>
      <p className="">{itemDeets.description}</p>
    </div>
  )
}
