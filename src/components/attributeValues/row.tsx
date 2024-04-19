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

import { Form, FormField } from "@/components/ui/form";

import FormFieldInput from "../FormField";
import { Input } from "../ui/input";

import { useQueryAttributeValues } from "@/hooks/useQueryAttributeValues";
import { useEffect } from "react";
import Loader from "../Loader";
import { useUpdateAttributeValues } from "@/hooks/useUpdateAttributeValues";
import { useParams } from "react-router-dom";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  price: z.coerce.number().gte(10000, {
    message: "Price must be at least 10000 VND.",
  }),

  quantity: z.coerce.number().gte(1, {
    message: "Quantity must be at least 1",
  }),

  color: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),
});

interface DataTableRowAcionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: Row<TData>) => void;
  onDelete: (value: Row<TData>) => void;
}

export const DataTableRowAcions = <TData,>({
  row,
  onDelete,
}: DataTableRowAcionsProps<TData>) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { id } = useParams();
  // console.log(id);

  const { attributeValues, isLoading } = useQueryAttributeValues(
    row.original._id,
    id
  );
  const { updateAttributeValues } = useUpdateAttributeValues(
    row.original._id,
    id
  );

  useEffect(() => {
    if (!isLoading && attributeValues) {
      // const
      const { name, price, quantity, color } = attributeValues;
      form.reset({
        name,
        price,
        quantity,
        color,
      });
    }
  }, [isLoading, attributeValues, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    updateAttributeValues(data);
  }

  if (isLoading) return <Loader />;

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
            <DialogTrigger>Update Values</DialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onDelete(row.original)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* DIALOG */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Attribute Value</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormFieldInput label="Name">
                  <Input placeholder="Name product" {...field} />
                </FormFieldInput>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormFieldInput label="Price">
                  <Input placeholder="Price product" {...field} />
                </FormFieldInput>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormFieldInput label="Quantity">
                  <Input placeholder="Quantity product" {...field} />
                </FormFieldInput>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormFieldInput label="Color">
                  <Input
                    className="w-1/3"
                    type="color"
                    placeholder="Quantity product"
                    {...field}
                  />
                </FormFieldInput>
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
