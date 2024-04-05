import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface DataTableRowAcionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: Row<TData>) => void;
  onDelete: (value: Row<TData>) => void;
}

export const DataTableRowAcions = <TData,>({
  row,
  onDelete,
}: DataTableRowAcionsProps<TData>) => {
  // console.log(row.original);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to={`/dashboard/attributes/edit/${row.original._id}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(row.original)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
