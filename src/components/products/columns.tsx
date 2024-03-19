import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatCurrency } from "@/utils/helpers";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { ProductContext } from "@/context/ProductProvider";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "../ui/use-toast";

export type Payment = {
  _id: string;
  stt: number;
  name: string;
  image: string;
  type: string;
  price: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "stt",
    header: "STT",
    // header: () => <div className="text-left">Amount</div>,
    // cell: ({ row }) => (
    //   <div className="text-left font-medium">{row.getValue("stt")}</div>
    // ),
    cell: ({ row }) => {
      // console.log(row);
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
    cell: ({ row }) => {
      const { deleteProduct } = useContext(ProductContext);
      const { toast } = useToast();

      async function handleDelete(id: string) {
        const confirm = window.confirm("Ban chac chan muon xoa khong ?");

        if (confirm) {
          await axios.delete(`http://localhost:8080/api/products/${id}`);
          deleteProduct(id);
          toast({
            // variant: "destructive",
            className: "bg-green-400 text-white",
            title: "Delete Success.",
            duration: 2000,
            // description: "There was a problem with your request.",
          });
        }
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(row.original._id)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`edit/${row.original._id}`}>Edit</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Toaster />
        </>
      );
    },
  },
];
