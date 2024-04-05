import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowAcions } from "./row";

interface ProductColumnsProps {
  onDelete: (product) => void;
}

export const getCategoryColumns = (
  onDelete: ProductColumnsProps
): ColumnDef[Item] => [
  {
    accessorKey: "stt",
    header: "STT",

    cell: ({ row }) => {
      return +row.id + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "attributes",
    header: "Values",

    cell: ({ row }) => {
      console.log(row.original);
      return <span className="ml-7">{row.original.values.length}</span>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowAcions row={row} onDelete={onDelete} />,
  },
];
