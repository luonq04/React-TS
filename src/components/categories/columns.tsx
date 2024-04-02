// import { ColumnDef } from "@tanstack/react-table";

import { formatCurrency } from "@/utils/helpers";
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
    id: "actions",
    cell: ({ row }) => <DataTableRowAcions row={row} onDelete={onDelete} />,
  },
];
