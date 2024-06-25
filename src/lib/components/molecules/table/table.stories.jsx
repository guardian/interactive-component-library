import { Table } from "."
import { LegendItem } from "$particles/legend-item"
import Markdown from "markdown-to-jsx"
import styles from "./table.stories.module.css"

const meta = {
  title: "Molecules/Table",
  component: Table,
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
}

export default meta

export const Default = {
  args: {
    columns: [
      {
        header: "First name",
        accessor: "firstName",
      },
      {
        header: "Last name",
        accessor: "lastName",
      },
    ],
    data: [
      {
        firstName: "Margaret",
        lastName: "Jones",
      },
      {
        firstName: "Jake",
        lastName: "Smith",
      },
    ],
    hideHeader: false,
  },
}

export const Sortable = {
  args: {
    columns: [
      {
        header: "First name",
        accessor: "firstName",
        sortable: true,
        sort: {
          ascending: false,
        },
      },
      {
        header: "Last name",
        accessor: "lastName",
        sortable: true,
      },
      {
        header: "Age",
        accessor: "age",
        sortable: true,
        cell: (d) => (d["age"] === null ? "-" : d["age"].toFixed(0)),
      },
    ],
    data: [
      {
        firstName: "Margaret",
        lastName: "Jones",
        age: 22,
      },
      {
        firstName: "Freda",
        lastName: "Bloggs",
        age: null,
      },
      {
        firstName: "Jake",
        lastName: "Smith",
        age: 18,
      },
      {
        firstName: "Fred",
        lastName: "Bloggs",
        age: null,
      },
      {
        firstName: "Baby",
        lastName: "Yoda",
        age: 0,
      },
      {
        firstName: "Han",
        lastName: "Solo",
        age: -0,
      },
    ],
  },
}

export const PartyResults = {
  args: {
    columns: [
      {
        header: "Party",
        accessor: "partyName",
        cell: (d) => <LegendItem text={d.partyName} styles={{ dot: `bg-color--${d.abbreviation}` }} />,
        styles: {
          headerCell: styles["w-2/5"],
        },
      },
      {
        header: "Seats",
        accessor: "totalSeats",
        styles: {
          headerCell: [styles["w-1/5"], styles.rightAlign].join(" "),
          bodyCell: styles.rightAlign,
        },
        sort: {
          ascending: false,
        },
      },
      {
        header: "Gains",
        accessor: "gains",
        styles: {
          headerCell: [styles["w-1/5"], styles.rightAlign].join(" "),
          bodyCell: styles.rightAlign,
        },
      },
      {
        header: "Losses",
        accessor: "losses",
        styles: {
          headerCell: [styles["w-1/5"], styles.rightAlign].join(" "),
          bodyCell: styles.rightAlign,
        },
      },
    ],
    data: [
      {
        partyName: "Conservatives",
        abbreviation: "con",
        totalSeats: 38,
        gains: 0,
        losses: 47,
      },
      {
        partyName: "Labour",
        abbreviation: "lab",
        totalSeats: 41,
        gains: 20,
        losses: 2,
      },
      {
        partyName: "Liberal Democrats",
        abbreviation: "libdem",
        totalSeats: 19,
        gains: 12,
        losses: 4,
      },
      {
        partyName: "Green",
        abbreviation: "green",
        totalSeats: 6,
        gains: 2,
        losses: 1,
      },
    ],
  },
}

export const ColumnDefinitions = {
  args: {
    columns: [
      {
        header: "Property",
        accessor: "property",
        cell: (d) => <SourceCodeCell source={d.property} />,
        styles: {
          headerCell: styles["w-1/5"],
        },
      },
      {
        header: "Description",
        accessor: "description",
        cell: (d) => <Markdown>{d.description}</Markdown>,
        styles: {
          headerCell: styles["w-3/5"],
        },
      },
      {
        header: "Default value",
        accessor: "default",
        cell: (d) => <Markdown>{d.default}</Markdown>,
        styles: {
          headerCell: styles["w-1/5"],
        },
      },
    ],
    data: [
      {
        property: "id",
        description: "Unique identifier for this column",
        default: "Defaults to value of `header` prop",
      },
      {
        property: "header",
        description: "The column header name. It will not show if `hideHeader` prop on Table equals `true`",
        default: "-",
      },
      {
        property: "accessor",
        description: "The key for accessing the value of each object in the `data` array",
        default: "-",
      },
      {
        property: "cell",
        description: "Optional function that receives a datum and returns a table cell for the current row",
        default: "-",
      },
      {
        property: "sort",
        description:
          "If property exists then the table will be sortable by the values in this column <br/><br/>Valid values:<br/><ul><li>`{ ascending: true }`</li><li>`{ ascending: false }`</li></ul>",
        default: "-",
      },
    ],
  },
}

function SourceCodeCell({ source }) {
  return (
    <pre>
      <code>{source}</code>
    </pre>
  )
}
