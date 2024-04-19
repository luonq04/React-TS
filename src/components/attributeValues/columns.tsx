import { ColumnDef } from "@tanstack/react-table";
import { TaskAttrVal } from "@/configs/rowSchema";
import { DataTableRowAcions } from "./row";
import { formatCurrency } from "@/utils/helpers";

interface ProductColumnsProps {
  onDelete: (valuesId: string) => void;
}

export const getValueColumns = (
  onDelete: ProductColumnsProps
): ColumnDef<TaskAttrVal>[] => [
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
      return <span>{row.original.name}</span>;
    },
  },
  {
    accessorKey: "quatity",
    header: "Quantity",

    cell: ({ row }) => {
      return <span className="ml-3">{row.original.quantity}</span>;
    },
  },

  {
    accessorKey: "color",
    header: "Color",

    cell: ({ row }) => {
      return (
        <span
          className="px-4 py-2 rounded-full"
          style={{
            backgroundColor: row.original.color,
          }}
        ></span>
      );
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
    cell: ({ row }) => <DataTableRowAcions onDelete={onDelete} row={row} />,
  },
];
