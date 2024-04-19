import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/components/ui/use-toast";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";
import { Link } from "react-router-dom";

const FormSchema = z.object({
  status: z.string({
    required_error: "Please select a status to display.",
  }),
});

interface DataTableRowAcionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: Row<TData>) => void;
  onDelete: (value: Row<TData>) => void;
}

const TypeStatus = ["Pending", "Confirmed", "Shipped", "Delivered"];

export const DataTableRowAcions = <TData,>({
  row,
  onDelete,
}: DataTableRowAcionsProps<TData>) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { updateOrderStatus } = useUpdateOrder();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateOrderStatus({ id: row.original._id, status: data.status });

    toast({
      title: "Update status order success",
      className: "bg-green-500 text-white",
    });
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>More Task</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <DialogTrigger>Delete Order</DialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <DialogTrigger>Update Status</DialogTrigger>
          </DropdownMenuItem>

          <Link to={`/dashboard/orders/detail/${row.original._id}`}>
            <DropdownMenuItem>Detail Order</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* DIALOG */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status Order</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified status to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {TypeStatus.map(
                          (status, index: number, array: string[]) => (
                            <SelectItem
                              value={status}
                              key={status}
                              disabled={
                                array.indexOf(status) <
                                array.indexOf(row.original.status)
                                  ? true
                                  : false
                              }
                            >
                              {status}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
