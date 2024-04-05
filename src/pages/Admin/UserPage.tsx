import FormFieldInput from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateAttriVal } from "@/hooks/useCreateAttriVal";
import { zodResolver } from "@hookform/resolvers/zod";

// Form
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
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

const Userpage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      color: "",
    },
  });

  const { id } = useParams();
  const { createAttriVal } = useCreateAttriVal(id!);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesAttribute = {
      ...values,
      attributeId: id,
    };
    createAttriVal(valuesAttribute);
    form.reset();
  }

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Values Attribute</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add Values Attribute</DialogTitle>
            </DialogHeader>
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
                <FormFieldInput label="Quantity">
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
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default Userpage;
