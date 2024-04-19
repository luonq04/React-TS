import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowAcions } from "./row";
import { formatCurrency } from "@/utils/helpers";
import { Badge } from "../ui/badge";

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

    cell: ({ row }) => {
      return <p>{row.original.customerInfo.name}</p>;
    },
  },
  {
    accessorKey: "city",
    header: "City",

    cell: ({ row }) => {
      // console.log(row.original);
      return <span>{row.original.customerInfo.city}</span>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",

    cell: ({ row }) => {
      // console.log(row.original);
      return <span>{formatCurrency(row.original.totalPrice)} đ</span>;
    },
  },

  {
    accessorKey: "payment",
    header: "Payment",

    cell: ({ row }) => {
      // console.log(row.original);
      return <span className="ml-3">{row.original.customerInfo.payment}</span>;
    },
  },

  {
    accessorKey: "status",
    header: "Status Order",

    cell: ({ row }) => {
      const typeStatus = ["Pending", "Confirmed", "Shipped", "Delivered"];
      const variant = ["pending", "confirm", "ship", "deliver"];

      const index = typeStatus.indexOf(row.original.status);
      // console.log(index, variant[index]);

      return <Badge variant={variant[index]}>{row.original.status}</Badge>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowAcions row={row} onDelete={onDelete} />,
  },
];
