import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { formAddCategorySchema } from "@/configs/formSchema";

import { toast } from "@/components/ui/use-toast";

import { useCreateCategory } from "@/hooks/useCreateCategory";
import Loader from "@/components/Loader";

export default function AddCategoryPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formAddCategorySchema>>({
    resolver: zodResolver(formAddCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { createCategory, isCreating } = useCreateCategory();

  type Values = {
    name: string;
  };

  // 2. Define a submit handler.
  async function onSubmit(values: Values) {
    try {
      createCategory(values);
    } catch (error) {
      return toast({
        className: "bg-red-400 text-white",
        title: "Add product Fail.",
        duration: 2000,
      });
    }
  }

  if (isCreating) return <Loader />;

  return (
    <>
      <h2 className="mb-5 text-2xl font-medium text-center">Add Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
