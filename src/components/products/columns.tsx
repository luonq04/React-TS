// import { ColumnDef } from "@tanstack/react-table";

import { formatCurrency } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowAcions } from "./row";

interface ProductColumnsProps {
  onDelete: (product) => void;
}

export const getProductColumns = (
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
    accessorKey: "image",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => (
      <img className="w-15 h-12 object-cover" src={row.getValue("image")} />
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>{formatCurrency(row.getValue("price"))} đ</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowAcions row={row} onDelete={onDelete} />,
  },
];
