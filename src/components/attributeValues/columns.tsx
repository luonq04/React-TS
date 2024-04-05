import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowAcions } from "./row";
import { formatCurrency } from "@/utils/helpers";

interface ProductColumnsProps {
  onDelete: (valuesId: string) => void;
}

export const getValueColumns = (
  onDelete: ProductColumnsProps
): ColumnDef[Item] => [
  {
    accessorKey: "stt",
    header: "STT",

    cell: ({ row }) => {
      // console.log(row.original);
      return +row.id + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Name",

    cell: ({ row }) => {
      return <span>{row.original.name}</span>;
    },
  },
  {
    accessorKey: "values",
    header: "Quantity",

    cell: ({ row }) => {
      return <span className="ml-7">{row.original.quantity}</span>;
    },
  },

  {
    accessorKey: "price",
    header: "Price",

    cell: ({ row }) => {
      // console.log(row.original);
      return <span>{formatCurrency(row.original.price)} đ</span>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowAcions row={row} onDelete={onDelete} />,
  },
];
